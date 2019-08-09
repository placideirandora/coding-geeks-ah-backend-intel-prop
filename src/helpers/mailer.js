import { config } from 'dotenv';
import mailer from '@sendgrid/mail';
import template from './templates/mail';

config();

const sendEmail = async (action, to, token) => {
  const {
    SENDGRID_API_KEY, EMAIL_SENDER, APP_URL, NODE_ENV
  } = process.env;
  mailer.setApiKey(SENDGRID_API_KEY);
  const subjectVerify = 'Welcome to Authors Haven';
  const contentVerify = '<h2>Congratulations on your new Authors Haven account!</h2><p style="font-size: 1rem;">Please confirm your email address by visiting the following link:</p>';
  const linkVerify = `${APP_URL}/${token}`;

  if (action === 'verify-email') {
    const message = {
      to,
      from: EMAIL_SENDER,
      subject: subjectVerify,
      html: template(contentVerify, linkVerify)
    };
    if (NODE_ENV === 'test') return true;
    mailer.send(message);
  }
};
export default sendEmail;
