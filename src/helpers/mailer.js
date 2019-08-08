import dotenv from 'dotenv';
import mailer from '@sendgrid/mail';

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
      html: `<div style="background:#ECF0F1;width:100%;padding:20px 0;">
            <div style="max-width:760px;margin:0 auto;background:#ffffff" font-size:1.2em>
            <div style="background:#266cef;padding:10px;color:#ffffff;text-align:center;font-size:34px">
            Authors Haven
            </div>
            <div style="padding:20px;text-align:left;color:black" font-family: verdana>
            ${contentReset}
            <br>
            <p style="font-size: 1rem; color:#266cef"><strong> ${linkReset} </strong></p>
            <br>
            <p style="font-size: 1rem;">All the best,</p>
            <p style="font-size: 1rem;">Your friends at <strong>Authors Haven</strong></p>
            </div>
            </div>
            <div style="padding:30px 10px;text-align:center;">
            Copyright &copy; 2019
            </div>
            </div>`
    };
    if (NODE_ENV === 'test') return true;
    mailer.send(message);
  }
};
// eslint-disable-next-line import/prefer-default-export
export { sendEmail };
