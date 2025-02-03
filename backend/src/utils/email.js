const { Resend } = require("resend");
const { RESEND_API_KEY, CLIENT_URL, NODE_ENV, TEST_EMAIL } = process.env;
const { getPasswordResetTemplate } = require("./emailTemplates");

// Initialize Resend client
const resend = new Resend(RESEND_API_KEY);

const getFromEmail = () =>
  NODE_ENV === "development"
    ? "onboarding@resend.dev"
    : process.env.EMAIL_SENDER;

const getToEmail = (to) => (NODE_ENV === "development" ? TEST_EMAIL : to); // Use TEST_EMAIL in development

// Send Email Function
const sendEmail = async (to, template) => {
  try {
    const data = await resend.emails.send({
      from: getFromEmail(),
      to: getToEmail(to),
      ...template,
    });
    console.log("Email sent successfully:", data);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
};

module.exports = { sendEmail };
