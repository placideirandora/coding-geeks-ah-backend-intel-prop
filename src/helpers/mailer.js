<<<<<<< HEAD
import { config } from 'dotenv';
import mailer from '@sendgrid/mail';
import template from './templates/mail';

config();

=======
import dotenv from 'dotenv';
import mailer from '@sendgrid/mail';
import template from './templates/mail';

dotenv.config();
>>>>>>> 92d6003bc62251c09180c3ea5a5b6287ad589ed2
const sendEmail = async (action, to, token) => {
  const {
    SENDGRID_API_KEY, EMAIL_SENDER, APP_URL, NODE_ENV
  } = process.env;
<<<<<<< HEAD
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
=======

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
>>>>>>> 92d6003bc62251c09180c3ea5a5b6287ad589ed2
    };
    if (NODE_ENV === 'test') return true;
    mailer.send(message);
  }
};
<<<<<<< HEAD
=======

>>>>>>> 92d6003bc62251c09180c3ea5a5b6287ad589ed2
export default sendEmail;
