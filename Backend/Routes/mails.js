const Mail = require("../Models/mailModel");
const router = require("express").Router();

router.get("/", (req, res) => {
  Mail.find()
    .then((mails) => res.json(mails))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.post("/add", (req, res) => {
  const { to, cc, subject, body, scheduledFor } = req.body;
  const newMail = new Mail({
    to,
    cc,
    subject,
    body,
    scheduledFor,
    // creator: req.userId,
    scheduledAt: new Date().toISOString(),
  });

  newMail
    .save()
    .then(() => res.json(newMail))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
