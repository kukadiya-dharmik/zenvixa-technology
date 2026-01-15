# EmailJS Setup Guide

This guide will help you set up EmailJS to enable real-time contact form functionality on your website.

## Step 1: Create an EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address

## Step 2: Add Email Service

1. Log in to your EmailJS dashboard
2. Go to **Email Services** in the sidebar
3. Click **Add New Service**
4. Choose your email provider (Gmail, Outlook, etc.)
5. Follow the setup instructions for your provider
6. **Copy your Service ID** (you'll need this later)

## Step 3: Create Email Template

1. Go to **Email Templates** in the sidebar
2. Click **Create New Template**
3. Use this template structure:

**Subject:**
```
New Contact Form Submission from {{from_name}}
```

**Content:**
```
Hello,

You have received a new message from your website contact form.

Name: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}
Message: {{message}}

---
This email was sent from your website contact form.
Reply to: {{reply_to}}
```

4. Click **Save**
5. **Copy your Template ID** (you'll need this later)

## Step 4: Get Your Public Key

1. Go to **Account** → **General** in the sidebar
2. Find your **Public Key**
3. **Copy your Public Key**

## Step 5: Update Your Website Code

Open `script.js` and replace the following placeholders:

1. **Line ~75**: Replace `YOUR_PUBLIC_KEY` with your EmailJS Public Key
   ```javascript
   emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your EmailJS Public Key
   ```

2. **Line ~120**: Replace `YOUR_SERVICE_ID` with your EmailJS Service ID
   ```javascript
   emailjs.send(
       'YOUR_SERVICE_ID',    // Replace with your EmailJS Service ID
   ```

3. **Line ~121**: Replace `YOUR_TEMPLATE_ID` with your EmailJS Template ID
   ```javascript
       'YOUR_TEMPLATE_ID',   // Replace with your EmailJS Template ID
   ```

4. **Line ~108**: Update the recipient email address (optional)
   ```javascript
       to_email: 'info@zenvinixtech.com', // Your business email
   ```

## Step 6: Test Your Form

1. Open your website in a browser
2. Fill out the contact form
3. Submit the form
4. Check your email inbox for the message

## Free Tier Limits

EmailJS free tier includes:
- 200 emails per month
- Basic email templates
- Standard support

For higher limits, consider upgrading to a paid plan.

## Troubleshooting

### Form not sending emails?
- Check browser console for errors
- Verify all IDs are correctly replaced
- Ensure EmailJS service is connected
- Check email service connection status

### Emails going to spam?
- Add EmailJS to your email whitelist
- Verify your email service connection
- Check spam folder

### Need help?
- Visit [EmailJS Documentation](https://www.emailjs.com/docs/)
- Check [EmailJS Support](https://www.emailjs.com/support/)

## Security Note

The Public Key is safe to expose in client-side code. However, for production:
- Consider rate limiting
- Add CAPTCHA for spam protection
- Monitor form submissions

## Alternative: Using Your Own Backend

If you prefer to use your own backend instead of EmailJS:

1. Create an API endpoint (e.g., `/api/contact`)
2. Update the form submission in `script.js` to use `fetch()` to your endpoint
3. Handle email sending on your server using Node.js, PHP, Python, etc.

Example:
```javascript
fetch('/api/contact', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, phone, message })
})
.then(response => response.json())
.then(data => {
    showAlert('Thank you for your message!', 'success');
    contactForm.reset();
})
.catch(error => {
    showAlert('Error sending message. Please try again.', 'error');
});
```

