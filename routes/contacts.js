
const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const Contact = require("../schema/contact");

// app.set('view engine', 'ejs');
// app.use(express.static("public"));

router.get("/", async (req, res) => {
  try {
    // const contacts = await Contact.findOne();
    res.render("index");
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
  
});

router.post("/", async (req, res) => {
  const { note, name, email, gender, phone, description } = req.body;
  try {
    const contact = await Contact.create({
      note,
      name,
      email,
      gender,
      phone,
      description,
    });

    res.redirect("/")

    var transporter = nodemailer.createTransport({
      host: process.env.TRANS_EMAIL,
      port: process.env.TRANS_PORT,
      secure: process.env.BOOL,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.KEY,
      },
    });
    if (description) {
      var mailOptions = {
        from: process.env.EMAIL,
        to: "esportsindia.2oct.2k22@gmail.com",
        subject: `${name} contacted you`,
        html: `<p><strong>Note</strong>: ${note}</p><p><strong>E-mail</strong>: ${email}</p><p><strong>Gender</strong>: ${gender}</p><p><strong>Phone</strong>: ${phone}</p><p><strong>Description</strong>: ${description}</p>`,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          // console.log('Email sent: ' + info.res);
          res.send(info.res);
        }
      });
    } else {
      var mailOptions = {
        from: process.env.EMAIL,
        to: "esportsindia.2oct.2k22@gmail.com",
        subject: `${name} contacted you`,
        html: `<p><strong>Note</strong>: ${note}</p><p><strong>E-mail</strong>: ${email}</p><p><strong>Gender</strong>: ${gender}</p><p><strong>Phone</strong>: ${phone}</p>`,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          res.send(info.res);
        }
      });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
  
});

module.exports = router;