const express = require("express");
const agents = require("../data/agents");

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
router.get("/agents", (req, res) => {
  res.json(agents);
});