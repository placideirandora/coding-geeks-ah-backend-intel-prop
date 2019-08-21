import { config } from 'dotenv';
import mailer from '@sendgrid/mail';
import template from './templates/mail';

config();

const sendEmail = async (action, to, token) => {
  const {
    SENDGRID_API_KEY, EMAIL_SENDER, APP_URL, NODE_ENV
  } = process.env;
  mailer.setApiKey(SENDGRID_API_KEY);
  const verifySubject = 'Welcome to Authors Haven';
  const verifyContent = '<h2>Congratulations on your new Authors Haven account!</h2><p style="font-size: 1rem;">Please confirm your email address by visiting the following link:</p>';
  const verifyLink = `${APP_URL}/verify-email/${token}`;
  const resetSubject = 'Reset your password - Authors Haven';
  const resetContent = '<h2>Reset Password</h2><p style="font-size: 1rem;">Please Reset your password by visiting the following link:</p>';
  const resetLink = `${APP_URL}/reset-password/${token}`;
  const notifySubject = 'Notification - New Article';
  const notifyContent = '<h2>New published article</h2><p style="font-size: 1rem;">Please Click on a link below to read the article:</p>';
  const notifyLink = `${token.url}`;

  if (action === 'verify-email') {
    const message = {
      to,
      from: EMAIL_SENDER,
      subject: verifySubject,
      html: template(verifyContent, verifyLink)
    };
    if (NODE_ENV === 'test') return true;
    mailer.send(message);
  } else if (action === 'reset-password') {
    const message = {
      to,
      from: EMAIL_SENDER,
      subject: resetSubject,
      text: 'Authors Haven',
      html: template(resetContent, resetLink)
    };
    if (NODE_ENV === 'test') return true;
    mailer.send(message);
  } else if (action === 'notification') {
    const message = {
      to,
      from: EMAIL_SENDER,
      subject: notifySubject,
      text: 'Authors Haven',
      html: template(notifyContent, notifyLink)
    };
    if (NODE_ENV === 'test') return true;
    mailer.send(message);
  }
};

export default sendEmail;
