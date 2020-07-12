const cors = require("cors");
const http = require('http');
const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

const details = require("./details.json");
const countries = require("./country.json")

const app = express();
app.use(cors({ origin: "*" })); 
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send(
      "<h1 style='text-align: center'>test nodemailer</h1>"
    );
});

const port = process.env.PORT || 3000;
app.listen(port);

app.get("/CountryList", (req, res) => {
    console.log("in country")
    res.send(
        countries
        );
});
  
app.post("/emailRequest", (req, res) => {
    console.log("in mail request")
    console.log(req);
    let user = req.body;
    sendMail(user, info => {
      res.send(info);
    });
})
  
app.post("/sendmail", (req, res) => {
    console.log("in send mail")
    let user = req.body;
    sendMail(user, info => {
      console.log(`The mail has been sent and the id is ${info.messageId}`);
      res.send(info);
    });
});

app.post("/test", (req, res) => {
    console.log("test success")
});

app.get("/testmail", (req, res) => {
    console.log("in test mail with get");
    let user = { "test":"xd",
                "requestorName":"test001",
                "requestorMail":"haha@gmail.com",
                "requestorContact":"012-3243",
                "requestorAddress":"no 1 test street",
                "requestorCountry":"Singapore",
                "requestorCarModel":"Toyota",
                "requestorFrame":"xc123",
                "requestorRemarks":"hi i am testing"            
            }
    sendMail(user, info => {
        res.send(info);
    });
});
  
async function sendMail(user, callback) {
    console.log(user);
    let currentDate =  new Date();
    let mailSubject = '';
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      secure: false,
      port: 25,
      auth: {
        user: details.email,
        pass: details.password
      },
      tls: {
        rejectUnauthorized: false
      }
    });
  
    let mailOptions = {
        from: '"Haomc" <haomcapptest@gmail.com',
        //from: user.requestorMail,
        to: 'haomcapptest@gmail.com',
        subject:  mailSubject.concat('Enquiry from ', user.requestorName, ' on ', currentDate),
        text:   'You have received an Enquiry from ' + user.requestorName + ', please refer to the details below' + '\n' + '\n' +
                'Name: ' + user.requestorName + '\n' +
                'Email: ' + user.requestorMail + '\n' +
                'Contact number: ' + user.requestorContact + '\n' +
                'Address: ' + user.requestorAddress + '\n' +
                'Country: ' + user.requestorCountry + '\n' +
                'Car Model: ' + user.requestorCarModel + '\n' +
                'Frame: ' + user.requestorFrame + '\n' +
                'Remarks: ' + user.requestorRemarks + '\n' + '\n' +

                'This email is sent via contact form on STC Auto Parts https://stcauto.azurewebsites.net'
    };
  
    // send mail with defined transport object
    let info = await transporter.sendMail(mailOptions);
  
    callback(info);
}
