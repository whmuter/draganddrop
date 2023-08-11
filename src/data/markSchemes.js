const marksSchemes = [
  {
    scoringModel: 0,
    id: "1",
    answers: [
      {
        id: 0,
        parent: 0,
      },
      {
        id: 1,
        parent: 1,
      },
      {
        id: 2,
        parent: 1,
      },
    ],
    feedbackMatrix: [
      {
        itemId: 0,
        categoryId: 1,
        feedback: "Message 1",
        misconceptionId: "AAAAA-AAAAA-AAAAA-AAAAA",
      },
      {
        itemId: 1,
        categoryId: 0,
        feedback: "Message 2",
        misconceptionId: "AAAAA-AAAAA-AAAAA-AAAAA",
      },
      {
        itemId: 2,
        categoryId: 0,
        feedback: "Message 3",
        misconceptionId: "AAAAA-AAAAA-AAAAA-AAAAA",
      },
    ],
  },
  {
    scoringModel: 0,
    id: "2",
    answers: [
      {
        id: 0,
        parent: 3,
      },
      {
        id: 1,
        parent: 2,
      },
      {
        id: 2,
        parent: 3,
      },
      {
        id: 3,
        parent: 0,
      },
      {
        id: 4,
        parent: 1,
      },
      {
        id: 5,
        parent: 0,
      },
      {
        id: 6,
        parent: 0,
      },
      {
        id: 7,
        parent: 1,
      },
      {
        id: 8,
        parent: 0,
      },
      {
        id: 9,
        parent: 2,
      },
    ],
    feedbackMatrix: [
      {
        itemId: 0,
        categoryId: 2,
        feedback:
          "The student may have noted that Eagles lay eggs and believed them to be reptiles.",
        misconceptionId: "AAAAA-AAAAA-AAAAA-AAAAA",
      },
      {
        itemId: 3,
        categoryId: 1,
        feedback:
          "The student may have noted that whales are marine-based and therefore mistaken them for being fish.",
        misconceptionId: "AAAAA-AAAAA-AAAAA-AAAAA",
      },
      {
        itemId: 2,
        categoryId: 0,
        feedback:
          "The student may believe penguins to be mammals due to their flightlessness and sleak feathers.",
        misconceptionId: "AAAAA-AAAAA-AAAAA-AAAAA",
      },
    ],
  },
];

export default marksSchemes;
