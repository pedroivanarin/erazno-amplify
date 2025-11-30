-- Create ticker_messages table for the news ticker
CREATE TABLE public.ticker_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  message TEXT NOT NULL,
  active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.ticker_messages ENABLE ROW LEVEL SECURITY;

-- Public can read active messages
CREATE POLICY "Anyone can view active ticker messages"
ON public.ticker_messages FOR SELECT
USING (active = true);

-- Admins can manage ticker messages
CREATE POLICY "Admins can manage ticker messages"
ON public.ticker_messages FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_ticker_messages_updated_at
BEFORE UPDATE ON public.ticker_messages
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();