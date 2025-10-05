import express from 'express';
import cors from 'cors';
import { Resend } from 'resend';

const app = express();
// Initialize Resend with your API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

// --- The Definitive CORS Configuration ---
// We define our allowed origins
const allowedOrigins = [
  'http://localhost:5173',
  'https://claytoncrispim.github.io',
  'https://www.claytoncrispim.com' // Adding your future custom domain
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
};

// --- The Final Fix: Handle Preflight Requests ---
// The browser sends an OPTIONS request first to check if it's safe to send the real request.
// This line explicitly handles that check and tells the browser "yes, it's safe".
app.options('/api/contact/', cors(corsOptions));

// Middleware
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
