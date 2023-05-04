const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const mailgun = require('mailgun-js');
const cors = require('cors');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS
app.use(cors());

const connection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
}).promise();

const mailgunClient = mailgun({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/api/greetings', cors({ origin: 'http://localhost:5000' }), async (req, res) => {
  try {
    const { sender_name, sender_email, recipient_name, recipient_email, message } = req.body;

    // Validate input
    if (!sender_name || !sender_email || !recipient_name || !recipient_email || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Save greeting to database
    await connection.execute(
      'INSERT INTO greetings (sender_name, sender_email, recipient_name, recipient_email, message) VALUES (?, ?, ?, ?, ?)',
      [sender_name, sender_email, recipient_name, recipient_email, message]
    );

    // Send email
    const subject = `Greeting from ${sender_name}`;
    const text = `${message}\n\nFrom,\n${sender_name}`;
    const data = {
      from: `${sender_name} <${sender_email}>`,
      to: `${recipient_name} <${recipient_email}>`,
      subject,
      text,
      template:'goodboystudios'
    };
    
    await mailgunClient.messages().send(data);
    
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
    
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
    