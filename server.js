const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.get('/showform', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/send-email', (req, res) => {
    const { name, email, message } = req.body;

    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'gopik2230@gmail.com',
            pass: 'kjevymoaytekekce',
        },
    });

    // send mail with defined transport object
    transporter.sendMail(
        {
            from: `"${name}" <${email}>`,
            to: 'gopik2230@gmail.com',
            subject: 'New Message from Contact Form',
            text: message,
            html: `<pre>
            Name is : ${name}
            Email is : ${email}
            Message is: ${message}
            </pre>`
        },
        (error, info) => {
            if (error) {
                console.error(error);
                res.status(500).send('Error sending email');
            } else {
                console.log(`Email sent: ${info.response}`);
                res.status(200).send('Email sent successfully');
            }
        }
    );
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
