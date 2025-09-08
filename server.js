import express from 'express';
import cors from 'cors';

// Create an instance of the Express application
const app = express();
// Define the port the server will listen on
const port = 3001; // We use 3001 because our React app (Vite) is likely using 5173

app.use(cors());
app.use(express.json());

// This tells our server how to handle a GET request to the root URL ('/')
app.get('/', (req, res) => {
    res.send('Hello from the backend server!');
});

// --- NEW: Create a POST route for the contact form ---
// A POST route is used when the frontend is SENDING data to the backend.
app.post('/api/contact', (req, res) => {
    // The parsed form data is available in `req.body` thanks to our middleware.
    const { name, email, message } = req.body;

    // For now, we'll just log the data to the server's console to prove it worked.
console.log('Received form submission: ');
console.log({ name, email, message });

// --- Important ---
// Here is where you would normally add code to send an actual email.
// We will tackle that in a later step.

// Send a success response back to the frontend
res.status(200).json({ status: 'success', message: 'Your message has been received!' });

});

// This starts the server and makes it listen for incoming requests on the specified port
app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running successfully on http://localhost:${port}`)
});