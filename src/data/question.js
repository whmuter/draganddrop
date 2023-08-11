const question = {
    title: "Group The Elements",
    prompt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras purus metus, lobortis ut justo eget, cursus pretium risus. Sed gravida, nisl vitae tincidunt iaculis, justo enim tempus augue, ut tincidunt lorem leo eget nunc. Aliquam nunc ipsum, tincidunt dictum elit at, rutrum mattis mi.",
    categoriesTitle: "State of Matter",
    categories: [
      { id: 0, name: "Gas" },
      { id: 1, name: "Liquid" },
      { id: 2, name: "Solid" },
    ],
    optionsTitle: "Elements",
    options: [
      {
        id: 0,
        parent: 0,
        name: "Nitrogen",
        description:
          "Nitrogen (N) is the most plentiful element in Earth's atmosphere and is a constituent of all living matter.",
      },
      {
        id: 1,
        parent: 0,
        name: "Oxygen",
        description:
          "Oxygen (O), after hydrogen and helium, it is the third-most abundant element in the universe.",
      },
      {
        id: 2,
        parent: 0,
        name: "Helium",
        description:
          "Helium (He) is the chemical element of atomic number 2, it is the lightest member of the noble series.",
      },
      {
        id: 3,
        parent: 0,
        name: "Hydrogen",
        description:
          "Hydrogen (H) is the chemical element with the atomic number 1, it is the lightest element.",
      },
      {
        id: 4,
        parent: 1,
        name: "Mercury",
        description:
          "Mercury (Hg) is a chemical element with an atomic number 80, it is also known as quicksilver.",
      },
      {
        id: 5,
        parent: 1,
        name: "Bromine",
        description:
          "Bromine (Br) is a chemical element of atomic number 35. Known for its dark red color and toxicity.",
      },
      {
        id: 6,
        parent: 2,
        name: "Iron",
        description:
          "Iron (Fe) is strong, magnetic silvery-grey metal, the chemical element of atomic number 26.",
      },
      {
        id: 7,
        parent: 2,
        name: "Carbon",
        description:
          "Carbon (C) is a chemical element of atomic number 6, a non-metal which has two main forms.",
      },
      {
        id: 8,
        parent: 2,
        name: "Sulfur",
        description:
          "Sulfur (S) is a chemical element of atomic number 16, a yellow combustible non-metal.",
      },
      {
        id: 9,
        parent: 2,
        name: "Copper",
        description:
          "Copper (Cu) is a highly conductive red-brown metal, the chemical element of atomic number 29.",
      },
    ],
  };

  export default question;