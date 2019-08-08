import dotenv from 'dotenv';
import mailer from '@sendgrid/mail';
import { genResetToken as generateToken } from './auth';

dotenv.config();

const sendEmail = async (to, subject, linkWord, content, data) => {
  const {
    SENDGRID_API_KEY, EMAIL_SENDER, APP_URL, NODE_ENV
  } = process.env;

  mailer.setApiKey(SENDGRID_API_KEY);

  const token = generateToken({ email: data.email });
  const appUrl = APP_URL;
  const link = `${appUrl}/${linkWord}/${token}`;
  const message = {
    to,
    from: EMAIL_SENDER,
    subject,
    text: 'Authors Haven',
    html: `<div style="background:#ECF0F1;width:100%;padding:20px 0;">
          <div style="max-width:760px;margin:0 auto;background:#ffffff">
          <div style="background:#266cef;padding:10px;color:#ffffff;text-align:center;font-size:34px">
          Authors Haven
          </div>
          <div style="padding:20px;text-align:left;color:#222">
          <p style="font-family: Verdana, Geneva, Tahoma, sans-serif;">
          Hello ${data.names} <br><br>
          ${content} <br>
          ${link}
          </p>
          </div>
          <br>
          <div style="padding:20px;text-align:left;color:black">
          <b>Andela @coding-geeks</b>
          </div>
          </div>
          <div style="padding:35px 10px;text-align:center;">
          Copyright, 2019
          </div>
          </div>`
  };
  mailer.send(message);
};
export { sendEmail };
