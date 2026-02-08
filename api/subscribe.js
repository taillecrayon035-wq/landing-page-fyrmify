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
      subject: 'Congrats, you just retired your accountant',
      text: `Hey!

Congrats, you just took the first step to save yourself from dozens of sleepless nights and a serious Aspirin addiction during DeFi tax season.

We're building this to make your life actually easier. Got specific struggles or features you'd want to see? Just hit reply and tell us. We read EVERYTHING: your Reddit rants, your Twitter meltdowns, your Discord questions. It all helps us build a better tool.

Talk soon!
Edouard`
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
