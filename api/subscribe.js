import { Resend } from 'resend';

const resend = new Resend('re_F6WTH3fZ_FiQPwTThaxN9E9FFmdPxcXVX');

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  try {
    // Envoyer l'email de bienvenue
    const data = await resend.emails.send({
      from: 'Edouard @ Fyrmify <edouard@fyrmify.com>',
      to: email,
      subject: 'Welcome to Fyrmify! 🎉',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
              line-height: 1.6;
              color: #2D2D2D;
              max-width: 600px;
              margin: 0 auto;
              padding: 40px 20px;
            }
            .header {
              text-align: center;
              margin-bottom: 40px;
            }
            .logo {
              font-size: 32px;
              font-weight: 700;
              color: #2D2D2D;
              margin-bottom: 10px;
            }
            .content {
              background: #F5F1E8;
              padding: 40px;
              border-radius: 12px;
            }
            h1 {
              color: #2D2D2D;
              font-size: 24px;
              margin-top: 0;
            }
            p {
              color: #8B7355;
              margin: 16px 0;
            }
            .footer {
              text-align: center;
              margin-top: 40px;
              color: #8B7355;
              font-size: 14px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="logo">Fyrmify</div>
          </div>
          
          <div class="content">
            <h1>Thanks for joining our early access! 🚀</h1>
            
            <p>We're building the easiest way to handle DeFi tax reports.</p>
            
            <p>You'll be the first to know when we launch. In the meantime, we're working hard to make tax season stress-free for crypto traders.</p>
            
            <p>Stay tuned!</p>
            
            <p style="margin-top: 30px;">
              <strong>— The Fyrmify Team</strong>
            </p>
          </div>
          
          <div class="footer">
            <p>© 2026 Fyrmify. All rights reserved.</p>
          </div>
        </body>
        </html>
      `
    });

    console.log('New subscriber:', email, 'Email ID:', data.id);

    return res.status(200).json({ 
      success: true, 
      message: 'Email sent successfully!',
      id: data.id 
    });

  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ 
      error: 'Failed to send email',
      details: error.message 
    });
  }
}
