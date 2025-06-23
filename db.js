const { faker } = require("@faker-js/faker");

faker.locale = "fr";

// Generate schools with fixed realistic names
const generateSchools = () => {
  const schoolNames = [
    "INP - HB",
    "ESATIC",
    "SCS DE LA MER",
    "IST POLYTECHNIQUE",
    "EAMAU",
    "INFAS & INJS",
    "Fonction publique",
    "Fonction ENA",
  ];
  return schoolNames.map((name, index) => ({
    id: `school-${index + 1}`,
    name: name,
    slug: faker.helpers.slugify(name).toLowerCase(),
  }));
};

// Generate concours for each school
const generateConcours = (schools) => {
  const concours = [];
  schools.forEach((school) => {
    for (let i = 0; i < 2; i++) {
      concours.push({
        id: `concours-${concours.length + 1}`,
        name: `${school.name} (${i === 0 ? "Baccalauréat" : "Licence"})`,
        slug: `${school.slug}-${i === 0 ? "baccalaureat" : "licence"}`,
        schoolId: school.id,
      });
    }
  });
  return concours;
};

// Generate formation titles in French
const generateFormationTitle = () => {
  const courses = [
    "Mathématiques",
    "Physique",
    "Chimie",
    "Littérature",
    "Économie",
    "Histoire",
    "Philosophie",
    "Informatique",
  ];
  return faker.helpers.arrayElement(courses);
};

// Generate a module with details like number, title, duration, shortdescription, longdescription
const generateModule = () => {
  return {
    number: faker.number.int({ min: 1, max: 20 }),
    title: faker.lorem.words(7),
    duration: faker.number.int({ min: 30, max: 120 }), // in minutes
    shortDescription: faker.lorem.sentence(),
    longDescription: faker.lorem.text(),
    // Generate the associated videos, documents, and exercises for the module
    videos: generateVideos(),
    documents: generateDocuments(),
    exercises: generateExercises(),
  };
};

// Generate videos for a module
const generateVideos = () => {
  const videos = [];
  const numberOfVideos = faker.number.int({ min: 3, max: 10 });

  for (let i = 0; i < numberOfVideos; i++) {
    videos.push({
      number: i + 1,
      title: faker.lorem.words(4),
      duration: faker.number.int({ min: 10, max: 60 }), // in minutes
    });
  }

  return videos;
};

// Generate documents for a module
const generateDocuments = () => {
  const documents = [];
  const numberOfDocuments = faker.number.int({ min: 3, max: 8 });

  for (let i = 0; i < numberOfDocuments; i++) {
    documents.push({
      number: i + 1,
      title: faker.lorem.words(4),
      duration: faker.number.int({ min: 10, max: 60 }), // in minutes
    });
  }

  return documents;
};

// Generate exercises for a module
const generateExercises = () => {
  const exercises = [];
  const numberOfExercises = faker.number.int({ min: 5, max: 15 });

  for (let i = 0; i < numberOfExercises; i++) {
    exercises.push({
      title: faker.lorem.words(3),
      number: i + 1,
      description: faker.lorem.paragraph(),
      duration: faker.number.int({ min: 10, max: 30 }), // in minutes
    });
  }

  return exercises;
};

// Generate formations for each concours
const generateFormations = (concours) => {
  const formations = [];
  concours.forEach((concour) => {
    for (let i = 0; i < 8; i++) {
      formations.push({
        id: `formation-${formations.length + 1}`,
        title: generateFormationTitle(),
        slug: faker.helpers.slugify(generateFormationTitle()).toLowerCase(),
        moduleNumber: faker.number.int({ min: 5, max: 15 }),
        notationAverage: faker.number.float({
          min: 1,
          max: 5,
          multipleOf: 0.25,
        }),
        notationNumber: faker.number.int({ min: 1, max: 2000 }),
        participantNumber: faker.number.int({ min: 1, max: 10000 }),
        lastUpdate: faker.date.past(),
        chapterNumber: faker.number.int({ min: 10, max: 25 }),
        exerciseNumber: faker.number.int({ min: 30, max: 50 }),
        description: faker.lorem.paragraph(),
        image: faker.image.url(),
        price: faker.number.int({ min: 50000, max: 150000 }),
        concoursId: concour.id,
        // Generate modules for the formation
        modules: Array.from({ length: 5 }, generateModule), // Generate 5 modules per formation
      });
    }
  });
  return formations;
};

// Generate books for each formation
const generateBooks = (formations) => {
  const books = [];
  formations.forEach((formation) => {
    for (let i = 0; i < 4; i++) {
      books.push({
        id: `book-${books.length + 1}`,
        title: faker.lorem.words(3),
        slug: faker.helpers.slugify(faker.lorem.words(3)).toLowerCase(),
        image: faker.image.url(),
        price: faker.number.int({ min: 10000, max: 50000 }),
        numberOfStar: faker.number.int({ min: 1, max: 5 }),
        formationId: formation.id,
      });
    }
  });
  return books;
};

// Generate full structure
const generateData = () => {
  const schools = generateSchools();
  const concours = generateConcours(schools);
  const formations = generateFormations(concours);
  const books = generateBooks(formations);

  return { schools, concours, formations, books };
};

// Example usage
const data = generateData();

module.exports = () => {
  return data;
};
