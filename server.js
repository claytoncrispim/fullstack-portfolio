import express from 'express';
import { Resend } from 'resend';

const app = express();
// Initialize Resend with your API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

// --- The Definitive Manual CORS Middleware ---
// This function will run on EVERY request that comes into our server.
app.use((req, res, next) => {
  // Define the list of websites that are allowed to talk to our server.
  const allowedOrigins = [
    'http://localhost:5173',
    'https://claytoncrispim.github.io',
    'https://www.claytoncrispim.com'
  ];
  
  const origin = req.headers.origin;

  // If the incoming request is from an allowed website, set the permission header.
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  // Set the other necessary headers for CORS.
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // This is the crucial part for the "preflight" check.
  // If the browser sends an OPTIONS request, we handle it here and send back a success status.
  if (req.method === 'OPTIONS') {
    return res.status(204).send('');
  }

  // If it's not a preflight check, continue to our main API route.
  next();
});

// We only need the json middleware now
app.use(express.json());

// The main API route for handling the form submission
app.post('/api/contact/', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: ['claytonrpcrispim@outlook.com'], // Make sure this is your correct Outlook email
      subject: `New Message from ${name} via Portfolio`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    if (error) {
      console.error({ error });
      // Send the actual error from Resend back for better debugging  
      return res.status(400).json({ message: 'Error from Resend', error });
    }

    res.status(200).json({ message: 'Your message has been sent successfully!', data });

  } catch (error) {
    console.error('Server catch block error:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// NOTE: We have removed the app.listen() block.
// Vercel handles the server listening process automatically for serverless functions.
// // Start the server (for local testing, not used by Vercel)
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// Export the app for Vercel
export default app;
