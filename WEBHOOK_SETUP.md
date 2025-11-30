# 📡 Configuración de Automatización de Redes Sociales

Este documento explica cómo conectar tus redes sociales (Facebook, Instagram, Twitter, etc.) para que automáticamente agreguen posts al ticker de noticias.

## 🎯 ¿Qué hace esto?

Cuando publicas en tus redes sociales, el texto de tu post aparece **automáticamente** en el ticker de noticias del sitio web, sin necesidad de agregarlo manualmente desde el admin.

## 🔧 Opción 1: Zapier (Recomendado - Más Fácil)

### Paso 1: URL del Webhook

Tu URL de webhook es:
```
https://vdmhirxnhxdxukdkbixw.supabase.co/functions/v1/social-post-webhook
```

### Paso 2: Crear el Zap

1. Ve a [zapier.com](https://zapier.com) y crea una cuenta gratuita
2. Haz clic en "Create Zap"
3. **Trigger (Disparador)**:
   - Busca la red social que uses (ej: "Facebook Pages", "Instagram Business", "Twitter")
   - Selecciona el evento: "New Post" o "New Status Update"
   - Conecta tu cuenta y sigue las instrucciones
   - Prueba que funcione

4. **Action (Acción)**:
   - Busca "Webhooks by Zapier"
   - Selecciona "POST"
   - Configura así:
     - **URL**: `https://vdmhirxnhxdxukdkbixw.supabase.co/functions/v1/social-post-webhook`
     - **Payload Type**: JSON
     - **Data**: Agrega estos campos:
       ```json
       {
         "message": "[Mapea el texto del post aquí]",
         "platform": "facebook"  // o "instagram", "twitter", etc.
       }
       ```
   - En "message", usa el campo dinámico que contiene el texto de tu post
   - Prueba el webhook

5. **Activa el Zap** y ¡listo! 🎉

### Ejemplos de Configuración por Plataforma

#### Facebook Pages
- **Trigger**: Facebook Pages → New Post to Page
- **Mapeo**: Usa el campo "Message" para el contenido del post

#### Instagram Business
- **Trigger**: Instagram Business → New Media Posted
- **Mapeo**: Usa el campo "Caption" para el contenido del post

#### Twitter
- **Trigger**: Twitter → New Tweet
- **Mapeo**: Usa el campo "Tweet Text"

---

## 🔧 Opción 2: n8n (Más Flexible)

### Paso 1: Instalar n8n

```bash
npm install -g n8n
n8n start
```

O usa [n8n.cloud](https://n8n.cloud) (versión cloud)

### Paso 2: Crear el Workflow

1. Crea un nuevo workflow
2. Agrega un nodo de trigger según tu red social:
   - "Facebook Trigger" para Facebook
   - "Instagram Trigger" para Instagram
   - "Twitter Trigger" para Twitter

3. Conecta un nodo "HTTP Request":
   - **Method**: POST
   - **URL**: `https://vdmhirxnhxdxukdkbixw.supabase.co/functions/v1/social-post-webhook`
   - **Body Content Type**: JSON
   - **Body Parameters**:
     ```json
     {
       "message": "={{ $json.message }}",
       "platform": "facebook"
     }
     ```

4. Activa el workflow

---

## 🔒 Seguridad Adicional (Opcional)

Si quieres agregar una capa extra de seguridad:

1. **En Lovable**, agrega un secret llamado `WEBHOOK_SECRET`:
   - Ve al backend → Settings → Secrets
   - Agrega: `WEBHOOK_SECRET` = un texto secreto (ej: "mi-clave-super-secreta-123")

2. **En Zapier/n8n**, modifica el payload para incluir:
   ```json
   {
     "message": "tu mensaje",
     "platform": "facebook",
     "secret": "mi-clave-super-secreta-123"
   }
   ```

Esto evitará que terceros puedan enviar mensajes falsos a tu ticker.

---

## 📝 Formato del Mensaje

El webhook acepta este formato JSON:

```json
{
  "message": "¡Nuevo episodio disponible! 🔥 No te lo pierdas",
  "platform": "instagram",  // Opcional: agrega emoji automático
  "post_url": "https://instagram.com/p/...",  // Opcional: por si quieres guardar la URL
  "secret": "tu-secreto"  // Opcional: para seguridad
}
```

**Plataformas soportadas** (con emojis automáticos):
- `facebook` → 📘
- `instagram` → 📸
- `twitter` → 🐦
- `linkedin` → 💼
- `tiktok` → 🎵

---

## 🧪 Probar el Webhook

Puedes probar manualmente con curl:

```bash
curl -X POST https://vdmhirxnhxdxukdkbixw.supabase.co/functions/v1/social-post-webhook \
  -H "Content-Type: application/json" \
  -d '{
    "message": "🔥 Mensaje de prueba desde las redes",
    "platform": "instagram"
  }'
```

Deberías recibir:
```json
{
  "success": true,
  "message": "Ticker message created"
}
```

Y el mensaje aparecerá automáticamente en el ticker del sitio web.

---

## 🎯 Gestión Automática

El sistema automáticamente:
- ✅ Limita mensajes a 280 caracteres (trunca si es más largo)
- ✅ Agrega emojis según la plataforma
- ✅ Mantiene solo los últimos 20 mensajes activos
- ✅ Desactiva mensajes antiguos automáticamente

---

## 🐛 Troubleshooting

**Problema**: El mensaje no aparece en el ticker
- Verifica que el Zap/workflow esté activo
- Revisa los logs del webhook en el backend de Lovable
- Confirma que el mensaje no esté vacío

**Problema**: Error 401 Unauthorized
- Si configuraste `WEBHOOK_SECRET`, verifica que el secret coincida
- Si no lo configuraste, puedes ignorar este campo en el payload

**Problema**: Mensajes duplicados
- Zapier puede reenviar webhooks. Los duplicados se detectarán por timestamp

---

## 📞 Soporte

Si tienes problemas, revisa:
1. Los logs del edge function en el backend
2. El historial de ejecución en Zapier/n8n
3. La tabla `ticker_messages` en la base de datos

---

¡Listo! Ahora tus posts de redes sociales aparecerán automáticamente en tu sitio web 🚀
