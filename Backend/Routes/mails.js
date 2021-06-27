const Mail = require("../Models/mailModel");
const router = require("express").Router();
const auth = require("../middleware/auth");
const nodemailer = require("nodemailer");
const cron = require("node-cron");

router.get("/", (req, res) => {
  Mail.find()
    .then((mails) => res.json(mails))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.post("/add", auth, (req, res) => {
  const { to, cc, subject, body, scheduledFor } = req.body;

  if (!req.userId) {
    return res.json({ message: "Unauthenticated" });
  }

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "nodemailer.flipr@gmail.com",
      pass: "mailer@flipr",
    },
    // sendMail: true,
  });

  var mailOptions = {
    // from: "nodemailer.flipr@gmail.com",
    to: to,
    subject: subject,
    text: body,
    cc: cc,
  };

  console.log("Sending Mail...");
  console.log(mailOptions);

  if (scheduledFor === "Every minute") {
    cron.schedule("* * * * *", () => {
      // Send e-mail
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
          const newMail = new Mail({
            to,
            cc,
            subject,
            body,
            scheduledFor,
            creator: req.userId,
            scheduledAt: new Date(),
          });

          newMail.save();
        }
      });
    });
    console.log("cron exited");
  }

  // transporter.sendMail(mailOptions, function (error, info) {
  //   if (error) {
  //     console.log(error);
  //   } else {
  //   }
  // });

  // transporter.sendMail(mailOptions, function (error, info) {
  //   if (error) {
  //     console.log(error);
  //   } else {
  //     console.log("Email sent: " + info.response);
  //     const newMail = new Mail({
  //       to,
  //       cc,
  //       subject,
  //       body,
  //       scheduledFor,
  //       creator: req.userId,
  //       scheduledAt: new Date(),
  //     });

  //     newMail
  //       .save()
  //       .then(() => res.json(newMail))
  //       .catch((err) => res.status(400).json("Error: " + err));
  //   }
  // });
});

module.exports = router;
