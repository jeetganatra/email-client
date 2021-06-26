const Mail = require("../Models/mailModel");
const router = require("express").Router();
const auth = require("../middleware/auth");

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
    .then(() => res.json(newMail))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
