// import { config } from 'dotenv';
// config();

// import express from 'express';
// import cors from 'cors';
// import nodemailer from 'nodemailer'; // --- NEW: Import Nodemailer

// const app = express();
// const port = 3001;

// app.use(cors());
// app.use(express.json());

// // --- NEW: Create a Nodemailer "transporter" ---
// // This is the object that will actually send the email.
// // We configure it with our Ethereal credentials.
// const transporter = nodemailer.createTransport({
//     host: 'smtp.ethereal.email',
//     port: 587,
//     secure: false, // true for 465, false for other ports
//     auth: {
//         user: process.env.ETHEREAL_USER, // Get username from .env
//         pass: process.env.ETHEREAL_PASS, // Get password from .env
//     },
// });


// // Our test route is still here
// app.get('/', (req, res) => {
//   res.send('Hello from the backend server!');
// });


// // --- UPDATED: The contact form route is now async ---
// app.post('/api/contact', async (req, res) => {
//   try {
//     const { name, email, message } = req.body;

//     console.log('Received form submission:');
//     console.log({ name, email, message });

//     // --- NEW: Send the email using our transporter ---
//     const info = await transporter.sendMail({
//         from: `"${name}" <${email}>`, // sender address
//         to: "your.real.email@example.com", // A placeholder, Ethereal will intercept this
//         subject: "New Contact Form Submission from Portfolio",
//         text: message, // plain text body
//         html: `<b>New message from:</b> ${name} (${email})<br><br><p>${message}</p>`, // html body
//     });

//     console.log("Message sent: %s", info.messageId);
//     // --- NEW: Get the preview URL from Ethereal ---
//     console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

//     res.status(200).json({ status: 'success', message: 'Your message has been sent successfully!' });

//   } catch (error) {
//     console.error("Error sending email:", error);
//     res.status(500).json({ status: 'error', message: 'Failed to send message.' });
//   }
// });


// app.listen(port, '0.0.0.0', () => {
//   console.log(`Server is running successfully on http://localhost:${port}`);
// });



/** ****** Send email via RESEND instead NODEMAILER ****** */



import { config } from 'dotenv';
config();

import express from 'express';
import cors from 'cors';
import { Resend } from 'resend'; // --- NEW: Import Resend

const app = express();
const port = 3001;

// --- NEW: Create an instance of Resend using our API key ---
const resend = new Resend(process.env.RESEND_API_KEY);

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from the backend server!');
});

app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    console.log('Received form submission:');
    console.log({ name, email, message });

    // --- UPDATED: Send the email using Resend instead of Nodemailer ---
    const { data, error } = await resend.emails.send({
        from: 'Contact Form <onboarding@resend.dev>', // A default, verified address by Resend
        to: ['claytonrpcrispim@gmail.com'],      // <-- IMPORTANT: Put your real email address here!
        subject: `New Message from ${name} via Portfolio`,
        reply_to: email, // Set the reply-to so you can directly reply to the user
        html: `
          <p>You have a new contact form submission from:</p>
          <ul>
            <li><strong>Name:</strong> ${name}</li>
            <li><strong>Email:</strong> ${email}</li>
          </ul>
          <hr>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `,
    });

    if (error) {
        console.error({ error });
        // Use the error message from Resend if available
        return res.status(400).json({ status: 'error', message: error.message });
    }

    console.log("Email sent successfully!", data);
    res.status(200).json({ status: 'success', message: 'Your message has been sent successfully!' });

  } catch (error) {
    console.error("Server error sending email:", error);
    res.status(500).json({ status: 'error', message: 'Failed to send message.' });
  }
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running successfully on http://localhost:${port}`);
});