import express from 'express';
import cors from 'cors';
import { Resend } from 'resend';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize Resend with your API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

// --- NEW: CORS Configuration ---
// We define a list of allowed origins.
// This tells our backend server that it's okay to accept requests
// from our local development server and our future live GitHub Pages site.
const allowedOrigins = [
  'http://localhost:5173/', // Your local development URL
  'https://claytoncrispim.github.io' // Your future live portfolio URL
];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

// Middleware
app.use(cors(corsOptions)); // Use the new CORS options
app.use(express.json()); // Parse JSON bodies

// --- API Route for Contact Form ---
// The '?' makes the trailing slash optional, handling Vercel's redirect.
app.post('/api/contact/?', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Send the email using Resend
    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>', // This is a required sender address by Resend
      // Email recipient address
      to: ['claytonrpcrispim@outlook.com'], 
      subject: `New Message from ${name} via Portfolio`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    // Handle potential errors from Resend
    if (error) {
      console.error({ error });
      return res.status(400).json({ message: 'Error sending email.', error });
    }

    // Send a success response
    res.status(200).json({ message: 'Your message has been sent successfully!', data });
  } catch (error) {
    // Handle server-side errors
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Export the app for Vercel
export default app;