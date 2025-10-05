import express from 'express';
// NOTE: We have removed the 'cors' package as it's now handled by vercel.json
// import cors from 'cors';
import { Resend } from 'resend';
// NOTE: We have removed 'dotenv/config' as Vercel handles environment variables natively.
//import 'dotenv/config';


const app = express();

// --- DIAGNOSTIC LOGGING ---
// This is the most important line. It will show us in the Vercel logs
// what value the RESEND_API_KEY environment variable actually holds.
// console.log('Server starting... RESEND_API_KEY:', process.env.RESEND_API_KEY ? `is set (ends with ...${process.env.RESEND_API_KEY.slice(-4)})` : 'is UNDEFINED');

// Initialize Resend with your API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

// Middleware
// We only need the json middleware now
app.use(express.json());

// --- API Route for Contact Form ---
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

    // IMPORTANT: Set the origin header in the response to match the request
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.status(200).json({ message: 'Your message has been sent successfully!', data });

  } catch (error) {
    console.error(error);
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
