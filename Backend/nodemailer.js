import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

export const sendMail = async (email, trackerId) => {
  const trackingUrl = `${process.env.BASE_URL}/api/track-mail${trackerId}`;
  const mailOptions = {
    from: `Dead Pixel Check ${process.env.GMAIL_USER}`,
    to: email,
    subject: "Test Email",
    html: `<!DOCTYPE html>
      <html>
      <head>
          <title>Email with Tracking Pixel</title>
      </head>
      <body>
          <p>Hello,</p>
          <p>This email includes a tracking pixel ${trackerId}.</p>
          <!-- Tracking Pixel -->
          <img src=${trackingUrl} alt="" style="display:none;" width="1" height="1" />
      </body>
      </html>
      `,
  };
  try {
    const result = await transporter.sendMail(mailOptions);
    console.log("Email sent:", result.response);
    return result;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};
