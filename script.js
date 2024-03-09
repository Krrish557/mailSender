import express from "express";
import nodemailer from "nodemailer";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config();
const userMail = process.env.USERMAIL;
const appKey = process.env.APP_KEY;
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: userMail,
    pass: appKey,
  },
});

app.post("/send-email", (req, res) => {
  const { to, subject, message } = req.body;
  console.log(req.body);
  const mailOptions = {
    from: userMail,
    to,
    subject,
    text: message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error occurred:", error.message);
      res.status(500).send("Error occurred, unable to send email.");
    } else {
      console.log("Email sent successfully!");
      console.log("Message ID:", info.messageId);
      res.status(200).send("Email sent successfully!");
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
