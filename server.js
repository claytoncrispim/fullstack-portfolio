// import express from 'express';
// import { Resend } from 'resend';

// const app = express();

// // --- The Definitive Manual CORS Middleware ---
// // This function will run on EVERY request that comes into our server.
// app.use((req, res, next) => {
//   // Define the list of websites that are allowed to talk to our server.
//   const allowedOrigins = [
//     'http://localhost:5173',
//     'https://claytoncrispim.github.io',
//     'https://www.claytoncrispim.com'
//   ];
  
//   const origin = req.headers.origin;

//   // If the incoming request is from an allowed website, set the permission header.
//   if (allowedOrigins.includes(origin)) {
//     res.setHeader('Access-Control-Allow-Origin', origin);
//   }

//   // Set the other necessary headers for CORS.
//   res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

//   // This is the crucial part for the "preflight" check.
//   // If the browser sends an OPTIONS request, we handle it here and send back a success status.
//   if (req.method === 'OPTIONS') {
//     return res.status(204).send('');
//   }

//   // If it's not a preflight check, continue to our main API route.
//   next();
// });

// // Middleware to parse JSON data from the form
// app.use(express.json());

// // The main API route for handling the form submission
// app.post('/api/contact/', async (req, res) => {
//   try {
//     // Initialize Resend *inside* the handler to ensure it always gets the correct API key.
//     const resend = new Resend(process.env.RESEND_API_KEY);
//     const { name, email, message } = req.body;
//     const { data, error } = await resend.emails.send({
//       // --- THIS IS THE FINAL FIX ---
//       // We are now sending from a professional address on your verified domain.
//       // This is what Resend expects for production applications.
//       from: 'contact@claytoncrispim.com',
//       to: ['claytonrpcrispim@outlook.com'], // Make sure this is your correct Outlook email
//       subject: `New Message from ${name} via Portfolio`,
//       html: `
//         <h2>New Contact Form Submission</h2>
//         <p><strong>Name:</strong> ${name}</p>
//         <p><strong>Email:</strong> ${email}</p>
//         <p><strong>Message:</strong></p>
//         <p>${message}</p>
//       `,
//     });

//     if (error) {
//       console.error({ error });
//       // Send the actual error from Resend back for better debugging  
//       return res.status(400).json({ message: 'Error from Resend', error });
//     }

//     res.status(200).json({ message: 'Your message has been sent successfully!', data });

//   } catch (error) {
//     console.error('Server catch block error:', error);
//     res.status(500).json({ message: 'Internal server error.' });
//   }
// });

// // Export the app for Vercel
// export default app;


import express from 'express';
import { Resend } from 'resend';

const app = express();

// --- The Definitive Manual CORS Middleware ---
app.use((req, res, next) => {
  const allowedOrigins = [
    'http://localhost:5173',
    'https://claytoncrispim.github.io',
    'https://www.claytoncrispim.com'
  ];
  
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(204).send('');
  }

  next();
});

app.use(express.json());

app.post('/api/contact/', async (req, res) => {
  try {
    // --- THE FINAL TEST: HARDCODED API KEY ---
    // We are bypassing process.env completely for this one test.
    // Replace the placeholder with your actual, full Resend API key.
    const hardcodedApiKey = "re_BA91KBR6_BYThfXb3aoBneSb9hjZfTPyD";
    const resend = new Resend(hardcodedApiKey);

    console.log(`DIAGNOSTIC: Using hardcoded key ending in ...${hardcodedApiKey.slice(-4)}`);

    const { name, email, message } = req.body;
    const { data, error } = await resend.emails.send({
      from: 'contact@claytoncrispim.com',
      to: ['your-new-professional-email@outlook.com'], // Ensure this is your correct Outlook email
      subject: `New Message from ${name} via Portfolio`,
      reply_to: email,
      html: `<p>Name: ${name}</p><p>Email: ${email}</p><p>Message: ${message}</p>`,
    });

    if (error) {
      console.error('Error from Resend:', error);
      return res.status(400).json({ message: 'Error from Resend', error });
    }
    
    res.status(200).json({ message: 'Success!', data });

  } catch (error) {
    console.error('Server catch block error:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

export default app;
