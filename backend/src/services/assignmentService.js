const agents = require("../data/agents");

function convertToMinutes(time) {
  const [hour, minute] = time.split(":").map(Number);
  return hour * 60 + minute;
}

function hasTimeConflict(assignments, startTime, endTime) {
  const newStart = convertToMinutes(startTime);
  const newEnd = convertToMinutes(endTime);

  return assignments.some((assignment) => {
    const existingStart = convertToMinutes(assignment.start);
    const existingEnd = convertToMinutes(assignment.end);

    return (
      newStart < existingEnd &&
      newEnd > existingStart
    );
  });
}

function getPriorityBonus(priority) {
  switch (priority) {
    case "HIGH":
      return 30;

    case "MEDIUM":
      return 20;

    case "LOW":
      return 10;

    default:
      return 0;
  }
}

function simulateAssignment(request) {
  const {
    requiredSkill,
    priority,
    startTime,
    endTime
  } = request;

  let eligibleAgents = [];
  let rejectedAgents = [];

  agents.forEach((agent) => {

    if (!agent.skills.includes(requiredSkill)) {
      rejectedAgents.push({
        agent: agent.name,
        reason: "Skill mismatch"
      });
      return;
    }

    if (agent.assignments.length >= agent.capacity) {
      rejectedAgents.push({
        agent: agent.name,
        reason: "Capacity exhausted"
      });
      return;
    }

    if (
      hasTimeConflict(
        agent.assignments,
        startTime,
        endTime
      )
    ) {
      rejectedAgents.push({
        agent: agent.name,
        reason: "Time conflict"
      });
      return;
    }

    const remainingCapacity =
      agent.capacity - agent.assignments.length;

    const activeAssignments =
      agent.assignments.length;

    const score =
      remainingCapacity * 10 -
      activeAssignments * 5 +
      getPriorityBonus(priority);

    eligibleAgents.push({
      ...agent,
      score,
      remainingCapacity,
      activeAssignments
    });
  });

  if (eligibleAgents.length === 0) {
    return {
      message: "No available agent satisfies skill, schedule and capacity requirements.",

      rejectedAgents
    };
  }

  eligibleAgents.sort((a, b) => {

    if (b.score !== a.score) {
      return b.score - a.score;
    }

    if (
      a.activeAssignments !==
      b.activeAssignments
    ) {
      return (
        a.activeAssignments -
        b.activeAssignments
      );
    }

    if (
      b.remainingCapacity !==
      a.remainingCapacity
    ) {
      return (
        b.remainingCapacity -
        a.remainingCapacity
      );
    }

    return a.name.localeCompare(b.name);
  });

  const selectedAgent = eligibleAgents[0];
  // save assignment to agent
  const agentInData = agents.find((a) => a.name === selectedAgent.name);
  agentInData.assignments.push({ start: startTime, end: endTime });

  return {
    selectedAgent: selectedAgent.name,
    score: selectedAgent.score,
    reason:
      "Highest assignment score among eligible agents",
    rejectedAgents
  };
}

module.exports = {
  simulateAssignment
};