const agents = [
  {
    id: 1,
    name: "John",
    skills: ["Electrical", "Plumbing"],
    capacity: 5,
    assignments: [
      {
        start: "09:00",
        end: "10:00"
      }
    ]
  },

  {
    id: 2,
    name: "Alex",
    skills: ["Electrical"],
    capacity: 4,
    assignments: [
      {
        start: "10:00",
        end: "11:00"
      }
    ]
  },

  {
    id: 3,
    name: "Mike",
    skills: ["Networking"],
    capacity: 5,
    assignments: []
  }
];

module.exports = agents;