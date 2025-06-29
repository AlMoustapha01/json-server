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

// Generate a module with details
const generateModule = () => {
  return {
    number: faker.number.int({ min: 1, max: 20 }),
    title: faker.lorem.words(7),
    duration: faker.number.int({ min: 30, max: 120 }),
    shortDescription: faker.lorem.sentence(),
    longDescription: faker.lorem.text(),
    videos: generateVideos(),
    documents: generateDocuments(),
    exercises: generateExercises(),
  };
};

// Generate videos
const generateVideos = () => {
  const videos = [];
  const numberOfVideos = faker.number.int({ min: 3, max: 10 });

  for (let i = 0; i < numberOfVideos; i++) {
    videos.push({
      number: i + 1,
      title: faker.lorem.words(4),
      duration: faker.number.int({ min: 10, max: 60 }),
    });
  }

  return videos;
};

// Generate documents
const generateDocuments = () => {
  const documents = [];
  const numberOfDocuments = faker.number.int({ min: 3, max: 8 });

  for (let i = 0; i < numberOfDocuments; i++) {
    documents.push({
      number: i + 1,
      title: faker.lorem.words(4),
      duration: faker.number.int({ min: 10, max: 60 }),
    });
  }

  return documents;
};

// Generate exercises
const generateExercises = () => {
  const exercises = [];
  const numberOfExercises = faker.number.int({ min: 5, max: 15 });

  for (let i = 0; i < numberOfExercises; i++) {
    exercises.push({
      title: faker.lorem.words(3),
      number: i + 1,
      description: faker.lorem.paragraph(),
      duration: faker.number.int({ min: 10, max: 30 }),
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
        modules: Array.from({ length: 5 }, generateModule),
        comments: Array.from({ length: 5 }, () => ({
          authorImage: faker.image.avatar(),
          authorName: faker.person.fullName(),
          joinDate: faker.date.past(),
          comment: faker.lorem.sentences(2),
          rating: faker.number.int({ min: 1, max: 5 }),
        })),
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

// Generate general reviews (avis)
const generateNotices = () => {
  const notices = [];
  const numberOfNotices = 20;

  for (let i = 0; i < numberOfNotices; i++) {
    notices.push({
      id: `notice-${i + 1}`,
      authorImage: faker.image.avatar(),
      authorName: faker.person.fullName(),
      joinDate: faker.date.past(),
      comment: faker.lorem.sentences(2),
      rating: faker.number.int({ min: 1, max: 5 }),
    });
  }
  return notices;
};

// Generate mentors
const generateMentors = () => {
  const mentors = [];
  const numberOfMentors = 10;
  const sex = ["male", "female"];

  // Fonction pour générer les commentaires des mentorés
  const generateMentorComments = () => {
    const numberOfComments = faker.number.int({ min: 2, max: 5 });
    const comments = [];
    const planTypes = ["Plan Standard", "Plan Lite", "Plan Premium"];
    const firstNames = [
      "Maggie",
      "Jacqueline",
      "Charlie",
      "David",
      "Sophie",
      "Thomas",
      "Olivia",
      "Mélodie",
      "Alexandre",
    ];

    for (let i = 0; i < numberOfComments; i++) {
      const commentDate = faker.date.past();
      const monthsSubscribed = faker.number.int({ min: 1, max: 6 });

      comments.push({
        id: `comment-${i + 1}`,
        authorName: faker.helpers.arrayElement(firstNames),
        authorAvatar: faker.image.avatarGitHub(),
        date: commentDate.toISOString(),
        displayDate: `${faker.date.month()} ${faker.number.int({
          min: 1,
          max: 30,
        })}, ${faker.number.int({ min: 2023, max: 2025 })}`,
        planType: faker.helpers.arrayElement(planTypes),
        duration: `${monthsSubscribed} mois`,
        content: faker.lorem.paragraph(1),
        rating: faker.number.int({ min: 4, max: 5 }),
        hasAdditionalComment: faker.datatype.boolean(0.2),
      });
    }

    // Ajout des commentaires spécifiques demandés par l'utilisateur
    if (comments.length > 0) {
      comments[0] = {
        id: "comment-specific-1",
        authorName: "Maggie",
        authorAvatar: faker.image.avatarGitHub(),
        date: "2024-12-20T10:30:00Z",
        displayDate: "décembre 20, 2024",
        planType: "Plan Standard",
        duration: "1 mois",
        content:
          "Je suis designer ! J'ai récemment réalisé un projet de recherche au travail et j'avais besoin de conseils d'un chercheur expérimenté. J'ai contacté Julien pour obtenir de l'aide et j'ai reçu de nombreux conseils utiles et des retours pendant le projet !",
        rating: 5,
        hasAdditionalComment: false,
      };

      if (comments.length > 1) {
        comments[1] = {
          id: "comment-specific-2",
          authorName: "Jacqueline",
          authorAvatar: faker.image.avatarGitHub(),
          date: "2024-10-07T15:45:00Z",
          displayDate: "7 octobre 2024",
          planType: "Plan standard",
          duration: "2 mois",
          content:
            "Julien m'a aidé à renforcer ma confiance en moi et m'a donné des méthodes pratiques pour améliorer ma carrière de recherche utilisateur. Il est à l'écoute, profondément empathique, et ses conseils sont directement applicables en milieu professionnel. Je suis tellement reconnaissant d'avoir trouvé Julien. Merci Julien !!",
          rating: 5,
          hasAdditionalComment: false,
        };
      }

      if (comments.length > 2) {
        comments[2] = {
          id: "comment-specific-3",
          authorName: "Charlie",
          authorAvatar: faker.image.avatarGitHub(),
          date: "2023-05-24T09:20:00Z",
          displayDate: "24 mai 2023",
          planType: "Plan Lite",
          duration: "4 mois",
          content:
            "Je suis un chercheur utilisateur de niveau moyen-supérieur, et travailler avec Julien m'a vraiment aidé à grandir. En tant que travailleur indépendant/contractuel, nous n'avons pas toujours accès à des conseils de carrière normaux ou à un mentorat, donc mes conversations régulières avec Julien sont parfaites pour combler ce vide : qu'il s'agisse de questions stratégiques ou de bas niveau, il a toujours la réponse. Hautement recommandé !",
          rating: 5,
          hasAdditionalComment: true,
        };
      }
    }

    return comments;
  };

  for (let i = 0; i < numberOfMentors; i++) {
    const gender = faker.helpers.arrayElement(sex);
    const fullName = faker.person.fullName({ sex: gender });
    mentors.push({
      id: `mentor-${i + 1}`,
      name: fullName,
      slug: faker.helpers.slugify(fullName).toLowerCase(),
      image: faker.image.personPortrait(gender),
      role: faker.helpers.arrayElement([
        "Web Developer",
        "UX/UI Designer",
        "Data Scientist",
        "Marketing Strategist",
        "Business Consultant",
        "Leadership Coach",
        "Content Creator",
        "Project Manager",
      ]),
      formation: faker.helpers.arrayElement([
        "Université de Cocody",
        "HEC Paris",
        "IST Polytechnique",
        "École d'Ingénieurs Maroc",
        "École de Design",
        "Université de Dakar",
        "EPFL",
      ]),
      description: faker.lorem.paragraph(3),
      skills: faker.helpers.arrayElements(
        [
          "Web Development",
          "React",
          "Node.js",
          "AWS",
          "TypeScript",
          "Data Science",
          "Python",
          "Machine Learning",
          "UX/UI Design",
          "Figma",
          "Digital Marketing",
          "Communication",
          "Leadership",
          "Project Management",
          "Personal Branding",
        ],
        5
      ),
      price: faker.number
        .int({ min: 3000, max: 10000, multipleOf: 500 })
        .toString(),
      profileLink: `/coach-me/${faker.helpers.slugify(fullName).toLowerCase()}`,
      rating: faker.number.int({ min: 3, max: 5 }),
      reviewNumber: faker.number.int({ min: 5, max: 25 }),
      nextAvailableDate: faker.date.soon().toISOString().split("T")[0],
      nextAvailableTimeStart: `${faker.number.int({ min: 8, max: 15 })}h00`,
      nextAvailableTimeEnd: `${faker.number.int({ min: 16, max: 20 })}h00`,
      country: faker.helpers.arrayElement(["CI", "FR", "SN", "MA", "CA"]),
      yearsExperience: faker.number.int({ min: 1, max: 10 }),
      enterprise: faker.helpers.arrayElement([
        "Microsoft",
        "Amazon",
        "Google",
        "Meta",
        "Indépendant/e",
        "Réservation.com",
        "Creative Skills",
        "Tech Academy",
        "Design Masters",
        "Growth Hackers",
        "Code Wizards",
      ]),
      comments: generateMentorComments(),
    });
  }
  return mentors;
};

// Generate full structure
const generateData = () => {
  const schools = generateSchools();
  const concours = generateConcours(schools);
  const formations = generateFormations(concours);
  const books = generateBooks(formations);
  const notices = generateNotices();
  const mentors = generateMentors();

  return { schools, concours, formations, books, notices, mentors };
};

// Example usage
const data = generateData();

module.exports = () => {
  return data;
};
