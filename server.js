import express from 'express';
import cors from 'cors';
import { Resend } from 'resend';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize Resend with your API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

// --- UPDATED: Simpler & More Direct CORS Configuration ---
const allowedOrigins = [
  'http://localhost:5173',          // Your local development URL
  'https://claytoncrispim.github.io'  // Your future live portfolio URL
];

// We now pass the array of allowed origins directly to the cors options.
// This is a more direct and often more reliable configuration.
const corsOptions = {
  origin: allowedOrigins
};

// Middleware
app.use(cors(corsOptions)); // Use the updated CORS options
app.use(express.json()); // Parse JSON bodies

// --- API Route for Contact Form ---
app.post('/api/contact/?', async (req, res) => {
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
      return res.status(400).json({ message: 'Error sending email.', error });
    }

    res.status(200).json({ message: 'Your message has been sent successfully!', data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// Start the server (for local testing, not used by Vercel)
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Export the app for Vercel
export default app;
