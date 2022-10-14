require('dotenv').config();
const sendgrid = require('@sendgrid/mail');

const { SENDGRID_API_KEY } = process.env;

sendgrid.setApiKey(SENDGRID_API_KEY);

const sendMail = async data => {
  try {
    const email = { ...data, from: 'zharyy.dimka@gmail.com' };
    await sendgrid.send(email);
    return true;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = sendMail;
