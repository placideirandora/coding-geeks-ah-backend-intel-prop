import dotenv from 'dotenv';
import mailer from '@sendgrid/mail';
import template from './templates/mail';

dotenv.config();
const sendEmail = async (action, to, token) => {
  const {
    SENDGRID_API_KEY, EMAIL_SENDER, APP_URL, NODE_ENV
  } = process.env;

  mailer.setApiKey(SENDGRID_API_KEY);

  const subjectReset = 'Reset your password - Authors Haven';
  const contentReset = '<h2>Reset Password</h2><p style="font-size: 1rem;">Please Reset your password by visiting the following link:</p>';
  const linkReset = `${APP_URL}/reset-password/${token}`;

  if (action === 'reset-password') {
    const message = {
      to,
      from: EMAIL_SENDER,
      subject: subjectReset,
      text: 'Authors Haven',
      html: template(contentReset, linkReset)
    };
    if (NODE_ENV === 'test') return true;
    mailer.send(message);
  }
};

export default sendEmail;
