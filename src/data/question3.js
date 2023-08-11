const question = {
  title: "Group The Words by Meaning",
  prompt:
    "Sort all the words by dragging and dropping...",
  categoriesTitle: "Meanings",
  categories: [
    { id: 0, name: "People" },
    { id: 1, name: "Actions" },
  ],
  optionsTitle: "Words",
  options: [
    {
      id: 0,
      parent: 0,
      name: "Quīntus",
    },
    {
      id: 1,
      parent: 0,
      name: "Metella",
    },
    {
      id: 2,
      parent: 1,
      name: "dormit",
    },
    {
      id: 3,
      parent: 1,
      name: "scrībit",
    },
    {
      id: 4,
      parent: 0,
      name: "Caecilius",
    },
    {
      id: 5,
      parent: 1,
      name: "labōrat",
    },
    {
      id: 6,
      parent: 0,
      name: "Grumiō",
    },
  ]
};

export default question;
