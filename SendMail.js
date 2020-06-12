var nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  service: 'gmail',
  secure: false,
  port: 25,
  auth: {
    user: 'haomcapptest@gmail.com',
    pass: ''
  },
  tls: {
    rejectUnauthorized: false
  }
});

let HelperOptions = {
  from: '"Haomc" <haomcapptest@gmail.com',
  to: 'haomcapptest@gmail.com',
  subject: 'testing out service',
  text: 'wow it works!'
};



transporter.sendMail(HelperOptions, (error, info) => {
  if (error) {
    return console.log(error);
  }
  console.log("The message was sent!");
  console.log(info);
});
