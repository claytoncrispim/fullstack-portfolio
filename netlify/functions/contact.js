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


/**----------------------------------------------------------------- */


// Netlify Function version of the above Express code
// This function handles contact form submissions and sends an email using Resend.
// Serverless functions have a different structure than Express apps.
import { Resend } from 'resend';

// This is the standard Netlify Function handler.
export const handler = async (event, context) => {
  // We add this to handle the browser's preflight OPTIONS request.
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: {
        'Access-Control-Allow-Origin': '*', // Or your specific domain
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: '',
    };
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    // The form data is now in event.body, which is a JSON string.
    const { name, email, message } = JSON.parse(event.body);

    const { data, error } = await resend.emails.send({
      from: 'contact@claytoncrispim.com',
      to: ['claytonrpcrispim@outlook.com'],
      subject: `New Message from ${name} via Portfolio`,
      reply_to: email,
      html: `<p>Name: ${name}</p><p>Email: ${email}</p><p>Message: ${message}</p>`,
    });

    if (error) {
      console.error('Error from Resend:', error);
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Error from Resend', error }),
      };
    }

    // This is the successful response.
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*', // Or your specific domain
      },
      body: JSON.stringify({ message: 'Your message has been successfully sent!', data }),
    };

  } catch (error) {
    console.error('Server catch block error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal server error.' }),
    };
  }
};