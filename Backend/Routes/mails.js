const Mail = require('../Models/mailModel');
const router = require('express').Router();
const auth = require('../middleware/auth');
const nodemailer = require('nodemailer');
const cron = require('node-cron');
const Agenda = require('agenda');
const { v4: uuidv4 } = require('uuid');

const mongoConnectionString = process.env.AGENDA_URL;
const agenda = new Agenda({
  db: {
    address: mongoConnectionString,
    options: { useUnifiedTopology: true, useNewUrlParser: true },
  },
});
agenda.maxConcurrency(1);

router.get('/', (req, res) => {
  Mail.find()
    .then((mails) => res.json(mails))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.post('/add', auth, (req, res) => {
  const { to, cc, subject, body, scheduledFor } = req.body;

  if (!req.userId) {
    return res.json({ message: 'Unauthenticated' });
  }

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SENDER_EMAIL,
      pass: process.env.SENDER_PASSWORD,
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

  console.log('Sending Mail...');
  console.log(mailOptions);

  if (scheduledFor === '') {
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
        const newMail = new Mail({
          to,
          cc,
          subject,
          body,
          scheduledFor,
          creator: req.userId,
          scheduledAt: new Date(),
        });

        newMail
          .save()
          .then(() => res.send(newMail))
          .catch((err) => console.log(err));
      }
    });
  } else {
    console.log('here');

    const id = uuidv4();
    var count = 0;
    agenda.define(id, { concurrency: 1 }, function (job, done) {
      count++;
      console.log(count);
      if (count === 4) {
        return res.send('Post success');
      }
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
          done(error);
        } else {
          console.log('Email sent: ' + info.response);
          done();
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

    if (scheduledFor === 'Every week') {
      (async function () {
        await agenda.start();
        await agenda.every('1 week', id);
      })();
    }

    if (scheduledFor === 'Every month') {
      (async function () {
        await agenda.start();
        await agenda.every('1 month', id);
      })();
    }

    if (scheduledFor === 'Every year') {
      (async function () {
        await agenda.start();
        await agenda.every('1 year', id);
      })();
    }

    if (scheduledFor === 'Every minute') {
      (async function () {
        // IIFE to give access to async/await
        await agenda.start();

        // await agenda.every("3 minutes", "send mail");

        // Alternatively, you could also do:
        await agenda.every('1 minute', id);
      })();
    }
  }

  // agenda.processEvery("1 minute");
});

module.exports = router;
