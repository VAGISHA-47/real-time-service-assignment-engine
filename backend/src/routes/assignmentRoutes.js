const express = require("express");

const router = express.Router();

const {
  simulateAssignment
} = require("../services/assignmentService");

router.post(
  "/simulate-assignment",
  (req, res) => {

    const result =
      simulateAssignment(req.body);

    res.json(result);
  }
);

module.exports = router;