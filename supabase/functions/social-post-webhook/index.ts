import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface WebhookPayload {
  message: string;
  platform?: string; // 'facebook', 'instagram', 'twitter', etc.
  post_url?: string;
  secret?: string; // Optional security token
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Received webhook request');
    
    // Parse the incoming webhook data
    const payload: WebhookPayload = await req.json();
    console.log('Webhook payload:', payload);

    // Validate required fields
    if (!payload.message || payload.message.trim() === '') {
      console.error('Missing or empty message field');
      return new Response(
        JSON.stringify({ error: 'Message is required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Optional: Verify webhook secret for security
    const WEBHOOK_SECRET = Deno.env.get('WEBHOOK_SECRET');
    if (WEBHOOK_SECRET && payload.secret !== WEBHOOK_SECRET) {
      console.error('Invalid webhook secret');
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { 
          status: 401, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Initialize Supabase client with service role for admin access
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Format the message with platform emoji
    let formattedMessage = payload.message.trim();
    
    // Add platform emoji if provided
    if (payload.platform) {
      const platformEmojis: Record<string, string> = {
        'facebook': '📘',
        'instagram': '📸',
        'twitter': '🐦',
        'linkedin': '💼',
        'tiktok': '🎵',
      };
      const emoji = platformEmojis[payload.platform.toLowerCase()] || '📢';
      formattedMessage = `${emoji} ${formattedMessage}`;
    }

    // Truncate message if too long (max 280 characters for ticker)
    if (formattedMessage.length > 280) {
      formattedMessage = formattedMessage.substring(0, 277) + '...';
    }

    // Get the current max display_order
    const { data: maxOrderData } = await supabase
      .from('ticker_messages')
      .select('display_order')
      .order('display_order', { ascending: false })
      .limit(1)
      .single();

    const nextOrder = (maxOrderData?.display_order || 0) + 1;

    // Insert the new ticker message
    const { data, error } = await supabase
      .from('ticker_messages')
      .insert({
        message: formattedMessage,
        active: true,
        display_order: nextOrder,
      })
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      throw error;
    }

    console.log('Successfully created ticker message:', data);

    // Optional: Auto-deactivate old messages (keep only last 20)
    const { data: allMessages } = await supabase
      .from('ticker_messages')
      .select('id')
      .eq('active', true)
      .order('created_at', { ascending: false });

    if (allMessages && allMessages.length > 20) {
      const messagesToDeactivate = allMessages.slice(20).map(m => m.id);
      await supabase
        .from('ticker_messages')
        .update({ active: false })
        .in('id', messagesToDeactivate);
      
      console.log(`Deactivated ${messagesToDeactivate.length} old messages`);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Ticker message created',
        data: data
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Error processing webhook:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        details: errorMessage
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});

