import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';

// États du quiz
export const QuizState = {
  IDLE: 'idle',
  LOADING: 'loading',
  READY: 'ready',
  IN_PROGRESS: 'in_progress',
  PAUSED: 'paused',
  COMPLETED: 'completed',
  REVIEW: 'review'
};

// Types d'actions
export const QuizActionTypes = {
  // Chargement des données
  SET_LOADING: 'SET_LOADING',
  SET_QUIZZES: 'SET_QUIZZES',
  SET_CURRENT_QUIZ: 'SET_CURRENT_QUIZ',
  SET_QUESTIONS: 'SET_QUESTIONS',
  
  // Gestion du quiz en cours
  START_QUIZ: 'START_QUIZ',
  ANSWER_QUESTION: 'ANSWER_QUESTION',
  NEXT_QUESTION: 'NEXT_QUESTION',
  PREVIOUS_QUESTION: 'PREVIOUS_QUESTION',
  PAUSE_QUIZ: 'PAUSE_QUIZ',
  RESUME_QUIZ: 'RESUME_QUIZ',
  COMPLETE_QUIZ: 'COMPLETE_QUIZ',
  RESET_QUIZ: 'RESET_QUIZ',
  
  // Timer et progression
  UPDATE_TIMER: 'UPDATE_TIMER',
  SET_TIME_SPENT: 'SET_TIME_SPENT',
  
  // Résultats et statistiques
  SET_RESULTS: 'SET_RESULTS',
  SAVE_ATTEMPT: 'SAVE_ATTEMPT',
  UPDATE_LEADERBOARD: 'UPDATE_LEADERBOARD',
  
  // Filtres et recherche
  SET_FILTERS: 'SET_FILTERS',
  SET_SEARCH_QUERY: 'SET_SEARCH_QUERY',
  
  // Gestion des erreurs
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR'
};

// Universités marocaines
const UNIVERSITIES = [
  { id: 1, name: 'Université Hassan II', acronym: 'UH2', city: 'Casablanca' },
  { id: 2, name: 'Université Mohammed V', acronym: 'UM5', city: 'Rabat' },
  { id: 3, name: 'Université Cadi Ayyad', acronym: 'UCA', city: 'Marrakech' },
  { id: 4, name: 'Université Ibn Tofail', acronym: 'UIT', city: 'Kénitra' },
  { id: 5, name: 'Université Abdelmalek Essaâdi', acronym: 'UAE', city: 'Tétouan' },
  { id: 6, name: 'Université Sidi Mohamed Ben Abdellah', acronym: 'USMBA', city: 'Fès' },
  { id: 7, name: 'Université Mohammed Premier', acronym: 'UMP', city: 'Oujda' },
  { id: 8, name: 'Université Ibn Zohr', acronym: 'UIZ', city: 'Agadir' },
  { id: 9, name: 'Université Sultan Moulay Slimane', acronym: 'USMS', city: 'Beni Mellal' },
  { id: 10, name: 'Université Al Akhawayn', acronym: 'AUI', city: 'Ifrane' }
];

// Facultés par université
const FACULTIES = [
  { id: 1, name: 'Faculté des Sciences (FS)', universityId: 1 },
  { id: 2, name: 'Faculté des Sciences et Techniques (FST)', universityId: 1 },
  { id: 3, name: 'Faculté des Sciences Économiques (FSE)', universityId: 1 },
  { id: 4, name: 'Faculté de Droit (FD)', universityId: 1 },
  { id: 5, name: 'Faculté des Lettres et Sciences Humaines (FLSH)', universityId: 1 },
  { id: 6, name: 'Faculté des Sciences (FS)', universityId: 2 },
  { id: 7, name: 'École Nationale Supérieure d\'Informatique et d\'Analyse des Systèmes (ENSIAS)', universityId: 2 },
  { id: 8, name: 'École Nationale Supérieure des Mines de Rabat (ENSMR)', universityId: 2 },
  { id: 9, name: 'Faculté des Sciences Semlalia (FSSM)', universityId: 3 },
  { id: 10, name: 'École Nationale des Sciences Appliquées (ENSA)', universityId: 3 },
  { id: 11, name: 'Faculté des Sciences et Techniques (FST)', universityId: 3 },
  { id: 12, name: 'Faculté des Sciences (FS)', universityId: 4 },
  { id: 13, name: 'Faculté des Sciences Dhar El Mahraz (FSDM)', universityId: 6 },
  { id: 14, name: 'École Nationale des Sciences Appliquées (ENSA)', universityId: 6 },
  { id: 15, name: 'Faculté des Sciences (FS)', universityId: 8 },
  { id: 16, name: 'École Nationale des Sciences Appliquées (ENSA)', universityId: 8 },
  { id: 17, name: 'Faculté des Sciences et Techniques (FST)', universityId: 8 },
  { id: 18, name: 'École Nationale de Commerce et de Gestion (ENCG)', universityId: 5 },
  { id: 19, name: 'Faculté des Sciences Tétouan (FST)', universityId: 5 },
  { id: 20, name: 'École Nationale d\'Agriculture de Meknès (ENAM)', universityId: 6 }
];

// Matières par faculté
const SUBJECTS = [
  // Mathématiques
  { id: 1, name: 'Algèbre Linéaire', facultyIds: [1, 6, 9, 12, 15], level: 'S1-S2' },
  { id: 2, name: 'Analyse Mathématique', facultyIds: [1, 6, 9, 12, 15], level: 'S1-S2' },
  { id: 3, name: 'Probabilités et Statistiques', facultyIds: [1, 6, 9, 12, 15], level: 'S3-S4' },
  { id: 4, name: 'Équations Différentielles', facultyIds: [1, 6, 9, 12, 15], level: 'S3-S4' },
  { id: 5, name: 'Topologie', facultyIds: [1, 6, 9, 12, 15], level: 'S5-S6' },
  
  // Physique
  { id: 6, name: 'Mécanique du Point', facultyIds: [1, 6, 9, 12, 15], level: 'S1-S2' },
  { id: 7, name: 'Électromagnétisme', facultyIds: [1, 6, 9, 12, 15], level: 'S2-S3' },
  { id: 8, name: 'Thermodynamique', facultyIds: [1, 6, 9, 12, 15], level: 'S3-S4' },
  { id: 9, name: 'Mécanique Quantique', facultyIds: [1, 6, 9, 12, 15], level: 'S5-S6' },
  { id: 10, name: 'Physique Nucléaire', facultyIds: [1, 6, 9, 12, 15], level: 'S5-S6' },
  
  // Chimie
  { id: 11, name: 'Chimie Générale', facultyIds: [1, 6, 9, 12, 15], level: 'S1' },
  { id: 12, name: 'Chimie Organique', facultyIds: [1, 6, 9, 12, 15], level: 'S2-S3' },
  { id: 13, name: 'Chimie Analytique', facultyIds: [1, 6, 9, 12, 15], level: 'S3-S4' },
  { id: 14, name: 'Chimie Minérale', facultyIds: [1, 6, 9, 12, 15], level: 'S4-S5' },
  { id: 15, name: 'Chimie Physique', facultyIds: [1, 6, 9, 12, 15], level: 'S5-S6' },
  
  // Informatique
  { id: 16, name: 'Algorithmique et Programmation', facultyIds: [1, 6, 7, 10, 14, 16], level: 'S1-S2' },
  { id: 17, name: 'Structures de Données', facultyIds: [1, 6, 7, 10, 14, 16], level: 'S2-S3' },
  { id: 18, name: 'Bases de Données', facultyIds: [1, 6, 7, 10, 14, 16], level: 'S3-S4' },
  { id: 19, name: 'Réseaux Informatiques', facultyIds: [1, 6, 7, 10, 14, 16], level: 'S4-S5' },
  { id: 20, name: 'Intelligence Artificielle', facultyIds: [1, 6, 7, 10, 14, 16], level: 'S5-S6' },
  { id: 21, name: 'Sécurité Informatique', facultyIds: [7, 10, 14, 16], level: 'S5-S6' },
  { id: 22, name: 'Développement Web', facultyIds: [7, 10, 14, 16], level: 'S4-S5' },
  { id: 23, name: 'Systèmes d\'Exploitation', facultyIds: [1, 6, 7, 10, 14, 16], level: 'S3-S4' },
  
  // Biologie
  { id: 24, name: 'Biologie Cellulaire', facultyIds: [1, 6, 9, 12, 15], level: 'S1-S2' },
  { id: 25, name: 'Génétique', facultyIds: [1, 6, 9, 12, 15], level: 'S2-S3' },
  { id: 26, name: 'Biochimie', facultyIds: [1, 6, 9, 12, 15], level: 'S3-S4' },
  { id: 27, name: 'Microbiologie', facultyIds: [1, 6, 9, 12, 15], level: 'S4-S5' },
  { id: 28, name: 'Biologie Moléculaire', facultyIds: [1, 6, 9, 12, 15], level: 'S5-S6' },
  
  // Économie et Gestion
  { id: 29, name: 'Microéconomie', facultyIds: [3, 18], level: 'S1-S2' },
  { id: 30, name: 'Macroéconomie', facultyIds: [3, 18], level: 'S2-S3' },
  { id: 31, name: 'Comptabilité Générale', facultyIds: [3, 18], level: 'S1-S2' },
  { id: 32, name: 'Finance d\'Entreprise', facultyIds: [3, 18], level: 'S4-S5' },
  { id: 33, name: 'Marketing', facultyIds: [3, 18], level: 'S3-S4' },
  { id: 34, name: 'Gestion des Ressources Humaines', facultyIds: [3, 18], level: 'S5-S6' },
  
  // Droit
  { id: 35, name: 'Droit Constitutionnel', facultyIds: [4], level: 'S1-S2' },
  { id: 36, name: 'Droit Civil', facultyIds: [4], level: 'S2-S3' },
  { id: 37, name: 'Droit Commercial', facultyIds: [4], level: 'S3-S4' },
  { id: 38, name: 'Droit Pénal', facultyIds: [4], level: 'S4-S5' },
  { id: 39, name: 'Droit International', facultyIds: [4], level: 'S5-S6' },
  
  // Littérature et Philosophie
  { id: 40, name: 'Philosophie Générale', facultyIds: [5], level: 'S1-S2' },
  { id: 41, name: 'Littérature Française', facultyIds: [5], level: 'S2-S3' },
  { id: 42, name: 'Littérature Arabe', facultyIds: [5], level: 'S3-S4' },
  { id: 43, name: 'Linguistique', facultyIds: [5], level: 'S4-S5' },
  { id: 44, name: 'Histoire de la Pensée', facultyIds: [5], level: 'S5-S6' },
  
  // Génie Civil
  { id: 45, name: 'Résistance des Matériaux', facultyIds: [2, 10, 14, 16, 17], level: 'S2-S3' },
  { id: 46, name: 'Mécanique des Sols', facultyIds: [2, 10, 14, 16, 17], level: 'S3-S4' },
  { id: 47, name: 'Béton Armé', facultyIds: [2, 10, 14, 16, 17], level: 'S4-S5' },
  { id: 48, name: 'Génie Parasismique', facultyIds: [2, 10, 14, 16, 17], level: 'S5-S6' },
  
  // Génie Électrique
  { id: 49, name: 'Électricité Générale', facultyIds: [2, 10, 14, 16, 17], level: 'S1-S2' },
  { id: 50, name: 'Électronique Analogique', facultyIds: [2, 10, 14, 16, 17], level: 'S3-S4' },
  { id: 51, name: 'Électronique Numérique', facultyIds: [2, 10, 14, 16, 17], level: 'S4-S5' },
  { id: 52, name: 'Automatique', facultyIds: [2, 10, 14, 16, 17], level: 'S5-S6' },
  
  // Génie Mécanique
  { id: 53, name: 'Mécanique des Fluides', facultyIds: [2, 10, 14, 16, 17], level: 'S3-S4' },
  { id: 54, name: 'Thermique', facultyIds: [2, 10, 14, 16, 17], level: 'S4-S5' },
  { id: 55, name: 'Conception Mécanique', facultyIds: [2, 10, 14, 16, 17], level: 'S5-S6' },
  
  // Agriculture
  { id: 56, name: 'Agronomie Générale', facultyIds: [20], level: 'S1-S2' },
  { id: 57, name: 'Protection des Végétaux', facultyIds: [20], level: 'S3-S4' },
  { id: 58, name: 'Génétique Végétale', facultyIds: [20], level: 'S4-S5' },
  { id: 59, name: 'Économie Agricole', facultyIds: [20], level: 'S5-S6' },
  
  // Mines et Géologie
  { id: 60, name: 'Géologie Générale', facultyIds: [8, 11, 17], level: 'S1-S2' },
  { id: 61, name: 'Minéralogie', facultyIds: [8, 11, 17], level: 'S2-S3' },
  { id: 62, name: 'Géologie Structurale', facultyIds: [8, 11, 17], level: 'S3-S4' },
  { id: 63, name: 'Exploitation Minière', facultyIds: [8, 11, 17], level: 'S5-S6' },
  
  // Culture Générale
  { id: 64, name: 'Histoire du Maroc', facultyIds: [], level: 'Tous niveaux' },
  { id: 65, name: 'Géographie du Maroc', facultyIds: [], level: 'Tous niveaux' },
  { id: 66, name: 'Culture Arabo-Musulmane', facultyIds: [], level: 'Tous niveaux' },
  { id: 67, name: 'Actualité Internationale', facultyIds: [], level: 'Tous niveaux' },
  { id: 68, name: 'Sciences et Technologies', facultyIds: [], level: 'Tous niveaux' }
];

// Génération des questions pour chaque matière
const generateQuestionsForSubject = (subjectId, count = 10) => {
  const subject = SUBJECTS.find(s => s.id === subjectId);
  if (!subject) return [];
  
  const questions = [];
  const questionTemplates = {
    // Modèles de questions selon le type de matière
    math: [
      "Quelle est la solution de l'équation {equation} ?",
      "Calculez la dérivée de la fonction {function}",
      "Quelle est la valeur de {expression} ?",
      "Résolvez le système d'équations : {system}",
      "Quelle est la probabilité de {event} ?"
    ],
    physics: [
      "Quelle est la formule pour calculer {concept} ?",
      "Calculez {quantity} dans les conditions suivantes : {conditions}",
      "Quel principe explique le phénomène suivant : {phenomenon} ?",
      "Quelle est l'unité SI de {quantity} ?",
      "Quelle loi physique s'applique dans cette situation : {situation} ?"
    ],
    chemistry: [
      "Quelle est la formule chimique de {compound} ?",
      "Équilibrez l'équation chimique suivante : {equation}",
      "Quel est le produit de la réaction entre {reactant1} et {reactant2} ?",
      "Quelle est la configuration électronique de {element} ?",
      "Quel type de liaison chimique est présent dans {compound} ?"
    ],
    computer: [
      "Quel est le résultat de l'algorithme suivant : {algorithm} ?",
      "Quelle est la complexité de l'algorithme {algorithm} ?",
      "Quelle structure de données est appropriée pour {scenario} ?",
      "Corrigez l'erreur dans le code suivant : {code}",
      "Quel est le résultat de l'expression {expression} ?"
    ],
    biology: [
      "Quel est le rôle de {organelle} dans la cellule ?",
      "Quelle est la différence entre {concept1} et {concept2} ?",
      "Quel processus biologique est décrit par : {description} ?",
      "Quelle est la fonction de {molecule} ?",
      "Quelle structure est responsable de {function} ?"
    ],
    economics: [
      "Quel est l'effet de {policy} sur {indicator} ?",
      "Calculez {metric} à partir des données suivantes : {data}",
      "Quelle théorie économique explique {phenomenon} ?",
      "Quel est le principe de {concept} ?",
      "Quelle décision prendre dans le cas suivant : {scenario} ?"
    ],
    law: [
      "Quel article du code {code} s'applique dans cette situation : {situation} ?",
      "Quelle est la différence entre {concept1} et {concept2} ?",
      "Quelle juridiction est compétente pour {case} ?",
      "Quel principe juridique s'applique à {situation} ?",
      "Quelle est la peine prévue pour {infraction} ?"
    ],
    general: [
      "Quelle est la capitale de {country} ?",
      "Qui a découvert {discovery} ?",
      "En quelle année a eu lieu {event} ?",
      "Quel est le nom scientifique de {species} ?",
      "Quelle est la formule pour calculer {formula} ?"
    ]
  };
  
  // Déterminer le type de matière
  let questionType = 'general';
  if (subjectId <= 5) questionType = 'math';
  else if (subjectId <= 10) questionType = 'physics';
  else if (subjectId <= 15) questionType = 'chemistry';
  else if (subjectId <= 23) questionType = 'computer';
  else if (subjectId <= 28) questionType = 'biology';
  else if (subjectId <= 34) questionType = 'economics';
  else if (subjectId <= 39) questionType = 'law';
  
  const templates = questionTemplates[questionType] || questionTemplates.general;
  
  for (let i = 0; i < count; i++) {
    const template = templates[i % templates.length];
    const questionText = template
      .replace('{equation}', `x² + ${Math.floor(Math.random() * 10) + 1}x + ${Math.floor(Math.random() * 10)} = 0`)
      .replace('{function}', `f(x) = x^${Math.floor(Math.random() * 3) + 2}`)
      .replace('{expression}', `√${Math.floor(Math.random() * 100) + 1}`)
      .replace('{system}', `x + y = ${Math.floor(Math.random() * 10) + 1}, x - y = ${Math.floor(Math.random() * 10) + 1}`)
      .replace('{event}', `obtenir ${Math.floor(Math.random() * 6) + 1} avec un dé`)
      .replace('{concept}', ['la vitesse', 'l\'accélération', 'la force', 'l\'énergie'][i % 4])
      .replace('{conditions}', ['à 25°C', 'sous 1 atm', 'dans le vide', 'avec frottement'][i % 4])
      .replace('{phenomenon}', ['la réfraction', 'l\'induction', 'la photosynthèse', 'la conduction'][i % 4])
      .replace('{quantity}', ['la pression', 'la température', 'la masse', 'le volume'][i % 4])
      .replace('{situation}', ['une chute libre', 'un circuit électrique', 'un gaz parfait', 'un mouvement circulaire'][i % 4])
      .replace('{compound}', ['l\'eau', 'le dioxyde de carbone', 'le sel', 'le sucre'][i % 4])
      .replace('{reactant1}', ['Na', 'HCl', 'H₂O', 'O₂'][i % 4])
      .replace('{reactant2}', ['Cl', 'NaOH', 'CO₂', 'H₂'][i % 4])
      .replace('{element}', ['l\'hydrogène', 'l\'oxygène', 'le carbone', 'l\'azote'][i % 4])
      .replace('{algorithm}', ['le tri bulle', 'la recherche binaire', 'le parcours en profondeur', 'Dijkstra'][i % 4])
      .replace('{scenario}', ['stocker des données hiérarchiques', 'rechercher rapidement', 'maintenir l\'ordre', 'gérer des priorités'][i % 4])
      .replace('{code}', ['for(i=0;i<10;i++)', 'if(x==y)', 'while(true)', 'int x = "5"'][i % 4])
      .replace('{organelle}', ['le noyau', 'les mitochondries', 'le réticulum endoplasmique', 'l\'appareil de Golgi'][i % 4])
      .replace('{concept1}', ['la mitose', 'la transcription', 'l\'osmose', 'la respiration'][i % 4])
      .replace('{concept2}', ['la méiose', 'la traduction', 'la diffusion', 'la photosynthèse'][i % 4])
      .replace('{description}', ['la division cellulaire', 'la synthèse des protéines', 'le transport passif', 'la production d\'ATP'][i % 4])
      .replace('{molecule}', ['l\'ADN', 'l\'ARN', 'les protéines', 'les enzymes'][i % 4])
      .replace('{policy}', ['une hausse des taux d\'intérêt', 'une baisse des impôts', 'une augmentation des dépenses publiques', 'une dévaluation'][i % 4])
      .replace('{indicator}', ['l\'inflation', 'le chômage', 'la croissance', 'le déficit'][i % 4])
      .replace('{metric}', ['le PIB', 'l\'inflation', 'le taux de chômage', 'le déficit budgétaire'][i % 4])
      .replace('{data}', ['consommation = 500, investissement = 200', 'exportations = 300, importations = 400'][i % 2])
      .replace('{code}', ['civil', 'pénal', 'commercial', 'du travail'][i % 4])
      .replace('{situation}', ['un contrat de vente', 'un accident de la route', 'un litige commercial', 'un licenciement'][i % 4])
      .replace('{case}', ['un divorce', 'un vol', 'une faillite', 'un conflit de travail'][i % 4])
      .replace('{infraction}', ['le vol simple', 'l\'escroquerie', 'les coups et blessures', 'la corruption'][i % 4])
      .replace('{country}', ['la France', 'l\'Espagne', 'l\'Algérie', 'les États-Unis'][i % 4])
      .replace('{discovery}', ['la pénicilline', 'la gravité', 'l\'électricité', 'la relativité'][i % 4])
      .replace('{event}', ['l\'indépendance du Maroc', 'la Révolution française', 'la Première Guerre mondiale', 'la chute du mur de Berlin'][i % 4])
      .replace('{species}', ['l\'être humain', 'le lion', 'le chêne', 'la rose'][i % 4])
      .replace('{formula}', ['l\'aire d\'un cercle', 'le volume d\'une sphère', 'la vitesse moyenne', 'l\'énergie cinétique'][i % 4]);
    
    // Générer des options
    const options = [];
    const correctAnswerIndex = Math.floor(Math.random() * 4);
    
    for (let j = 0; j < 4; j++) {
      if (j === correctAnswerIndex) {
        // Réponse correcte (simplifiée pour l'exemple)
        options.push(getCorrectAnswerForQuestion(questionText, subjectId));
      } else {
        // Réponses incorrectes
        options.push(getIncorrectAnswerForQuestion(questionText, subjectId, j));
      }
    }
    
    questions.push({
      id: `${subjectId}_${i + 1}`,
      subjectId,
      question: `${subject.name} - ${questionText}`,
      options,
      correctAnswer: correctAnswerIndex,
      explanation: getExplanationForQuestion(questionText, subjectId),
      difficulty: ['easy', 'medium', 'hard'][Math.floor(Math.random() * 3)],
      points: Math.floor(Math.random() * 3) + 1,
      timeEstimate: Math.floor(Math.random() * 120) + 30, // 30-150 secondes
      tags: [subject.name, subject.level, ...getTagsForSubject(subjectId)],
      imageUrl: Math.random() > 0.7 ? getImageForSubject(subjectId) : null,
      formula: Math.random() > 0.5 ? getFormulaForSubject(subjectId) : null
    });
  }
  
  return questions;
};

// Fonctions utilitaires pour générer des réponses et explications
const getCorrectAnswerForQuestion = (question, subjectId) => {
  // Logique simplifiée pour générer des réponses correctes
  if (question.includes('équation')) return 'x = 2';
  if (question.includes('dérivée')) return '2x';
  if (question.includes('probabilité')) return '1/6';
  if (question.includes('formule')) return 'F = ma';
  if (question.includes('unité SI')) return 'Newton';
  if (question.includes('formule chimique')) return 'H₂O';
  if (question.includes('algorithme')) return 'O(n log n)';
  if (question.includes('structure de données')) return 'Arbre binaire';
  if (question.includes('rôle')) return 'Contrôle cellulaire';
  if (question.includes('effet')) return 'Augmentation';
  if (question.includes('article')) return 'Article 1101';
  if (question.includes('capitale')) return 'Rabat';
  if (question.includes('découvert')) return 'Alexander Fleming';
  return 'Réponse correcte';
};

const getIncorrectAnswerForQuestion = (question, subjectId, index) => {
  const incorrectAnswers = [
    'x = -2',
    'x²',
    '1/3',
    'F = mv',
    'Joule',
    'CO₂',
    'O(n²)',
    'Liste chaînée',
    'Stockage d\'énergie',
    'Diminution',
    'Article 1201',
    'Casablanca',
    'Louis Pasteur'
  ];
  return incorrectAnswers[(subjectId + index) % incorrectAnswers.length];
};

const getExplanationForQuestion = (question, subjectId) => {
  const explanations = [
    'La solution est obtenue en appliquant la formule quadratique.',
    'La dérivée se calcule en utilisant les règles de dérivation standard.',
    'La probabilité est calculée en divisant le nombre de cas favorables par le nombre total de cas.',
    'Cette formule est une conséquence directe de la deuxième loi de Newton.',
    'Le Newton est l\'unité SI de la force dans le système international.',
    'La molécule d\'eau est composée de deux atomes d\'hydrogène et d\'un atome d\'oxygène.',
    'La complexité est déterminée par le nombre d\'opérations élémentaires.',
    'Cette structure permet un accès rapide aux données grâce à sa propriété d\'ordre.',
    'Cet organite contient l\'ADN et contrôle les activités cellulaires.',
    'Cette politique a un effet expansionniste sur l\'économie selon la théorie keynésienne.',
    'Cet article définit les conditions de validité d\'un contrat en droit marocain.',
    'Rabat est la capitale administrative du Maroc depuis 1912.',
    'Cette découverte a révolutionné la médecine moderne.'
  ];
  return explanations[subjectId % explanations.length];
};

const getTagsForSubject = (subjectId) => {
  const tagGroups = {
    math: ['calcul', 'équations', 'algèbre'],
    physics: ['sciences', 'expérimental', 'théorie'],
    chemistry: ['laboratoire', 'réactions', 'molécules'],
    computer: ['programmation', 'technologie', 'logiciel'],
    biology: ['vivant', 'cellules', 'évolution'],
    economics: ['argent', 'marché', 'entreprise'],
    law: ['justice', 'loi', 'contrat'],
    general: ['culture', 'savoir', 'connaissance']
  };
  
  if (subjectId <= 5) return tagGroups.math;
  if (subjectId <= 10) return tagGroups.physics;
  if (subjectId <= 15) return tagGroups.chemistry;
  if (subjectId <= 23) return tagGroups.computer;
  if (subjectId <= 28) return tagGroups.biology;
  if (subjectId <= 34) return tagGroups.economics;
  if (subjectId <= 39) return tagGroups.law;
  return tagGroups.general;
};

const getImageForSubject = (subjectId) => {
  const images = {
    math: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%234f46e5'/%3E%3Cstop offset='100%25' style='stop-color:%239333ea'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='400' height='300' fill='url(%23g)'/%3E%3C/svg%3E",
    physics: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%2306b6d4'/%3E%3Cstop offset='100%25' style='stop-color:%233b82f6'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='400' height='300' fill='url(%23g)'/%3E%3C/svg%3E",
    chemistry: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%2310b981'/%3E%3Cstop offset='100%25' style='stop-color:%2306b6d4'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='400' height='300' fill='url(%23g)'/%3E%3C/svg%3E",
    computer: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%231e40af'/%3E%3Cstop offset='100%25' style='stop-color:%237c3aed'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='400' height='300' fill='url(%23g)'/%3E%3C/svg%3E",
    biology: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23059669'/%3E%3Cstop offset='100%25' style='stop-color:%231e40af'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='400' height='300' fill='url(%23g)'/%3E%3C/svg%3E"
  };
  
  if (subjectId <= 5) return images.math;
  if (subjectId <= 10) return images.physics;
  if (subjectId <= 15) return images.chemistry;
  if (subjectId <= 23) return images.computer;
  if (subjectId <= 28) return images.biology;
  return null;
};

const getFormulaForSubject = (subjectId) => {
  if (subjectId <= 5) return 'x = [-b ± √(b² - 4ac)] / 2a';
  if (subjectId <= 10) return 'F = ma';
  if (subjectId <= 15) return 'PV = nRT';
  if (subjectId <= 23) return 'T(n) = O(n log n)';
  if (subjectId <= 28) return 'ADN → ARN → Protéine';
  return null;
};

// Génération des quizzes
const generateQuizzes = () => {
  const quizzes = [];
  let quizId = 1;
  
  // Parcourir toutes les matières
  SUBJECTS.forEach(subject => {
    // Créer 3-4 quizzes par matière avec différents niveaux de difficulté
    for (let i = 0; i < Math.floor(Math.random() * 3) + 3; i++) {
      const facultyId = subject.facultyIds.length > 0 
        ? subject.facultyIds[Math.floor(Math.random() * subject.facultyIds.length)]
        : null;
      
      const faculty = FACULTIES.find(f => f.id === facultyId);
      const university = faculty ? UNIVERSITIES.find(u => u.id === faculty.universityId) : null;
      
      const questionsCount = Math.floor(Math.random() * 15) + 10; // 10-25 questions
      const duration = Math.floor(questionsCount * 1.5); // 1.5 minutes par question
      const participants = Math.floor(Math.random() * 5000) + 100;
      const rating = (Math.random() * 1.5 + 3.5).toFixed(1); // 3.5-5.0
      
      const isPaid = Math.random() > 0.6; // 40% gratuits, 60% payants
      
      quizzes.push({
        id: quizId++,
        title: `${subject.name} - ${['Test Diagnostique', 'Examen Blanc', 'Quiz de Révision', 'Contrôle Continu'][i % 4]} ${subject.level}`,
        description: `Quiz complet sur ${subject.name} pour le niveau ${subject.level}. Idéal pour la préparation aux examens.`,
        subject: subject.name,
        subjectId: subject.id,
        university: university ? university.name : 'Université Marocaine',
        universityId: university ? university.id : null,
        faculty: faculty ? faculty.name : null,
        facultyId: facultyId,
        level: subject.level,
        questionsCount,
        duration,
        participants,
        difficulty: ['easy', 'medium', 'hard', 'expert'][Math.floor(Math.random() * 4)],
        rating: parseFloat(rating),
        isPro: Math.random() > 0.7,
        isPaid: isPaid,
        price: isPaid ? 99 : 0,
        isCompleted: Math.random() > 0.5,
        bestScore: Math.random() > 0.3 ? Math.floor(Math.random() * 30) + 70 : null, // 70-100%
        currentScore: Math.random() > 0.4 ? Math.floor(Math.random() * 30) + 60 : null, // 60-90%
        completionRate: Math.floor(Math.random() * 30) + 70, // 70-100%
        averageScore: Math.floor(Math.random() * 30) + 60, // 60-90%
        tags: [...getTagsForSubject(subject.id), subject.level, 'révision', 'examen', isPaid ? 'premium' : 'gratuit'],
        createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
        author: ['Dr. Ahmed Benali', 'Prof. Fatima Zahra', 'Dr. Youssef Alami', 'Prof. Leila Idrissi'][Math.floor(Math.random() * 4)],
        popularity: ['trending', 'hot', 'new', 'popular'][Math.floor(Math.random() * 4)],
        streakRequired: Math.random() > 0.8 ? Math.floor(Math.random() * 5) + 3 : null,
        timeRecord: Math.random() > 0.7 ? Math.floor(Math.random() * duration * 60) : null,
        isBookmarked: Math.random() > 0.7,
        isLiked: Math.random() > 0.6,
        likes: Math.floor(Math.random() * 100),
        shares: Math.floor(Math.random() * 50),
        questions: generateQuestionsForSubject(subject.id, questionsCount)
      });
    }
  });
  
  // Ajouter des quizzes transversaux
  for (let i = 0; i < 20; i++) {
    quizzes.push({
      id: quizId++,
      title: ['Culture Générale Marocaine', 'Histoire du Maroc', 'Géographie Nationale', 'Actualité Internationale'][i % 4],
      description: 'Testez vos connaissances générales sur le Maroc et le monde.',
      subject: 'Culture Générale',
      subjectId: 64 + (i % 5),
      university: null,
      universityId: null,
      faculty: null,
      facultyId: null,
      level: 'Tous niveaux',
      questionsCount: 20,
      duration: 30,
      participants: Math.floor(Math.random() * 10000) + 1000,
      difficulty: ['easy', 'medium'][Math.floor(Math.random() * 2)],
      rating: (Math.random() * 1.2 + 3.8).toFixed(1),
      isPro: false,
      isCompleted: Math.random() > 0.3,
      bestScore: Math.random() > 0.2 ? Math.floor(Math.random() * 30) + 70 : null,
      currentScore: Math.random() > 0.3 ? Math.floor(Math.random() * 30) + 60 : null,
      completionRate: Math.floor(Math.random() * 40) + 60,
      averageScore: Math.floor(Math.random() * 35) + 55,
      tags: ['culture', 'général', 'maroc', 'monde', 'savoir'],
      createdAt: new Date(Date.now() - Math.random() * 180 * 24 * 60 * 60 * 1000).toISOString(),
      author: ['Institut National', 'Ministère de la Culture', 'Organisation UNESCO'][Math.floor(Math.random() * 3)],
      popularity: ['trending', 'popular'][Math.floor(Math.random() * 2)],
      streakRequired: null,
      timeRecord: null,
      isBookmarked: Math.random() > 0.8,
      isLiked: Math.random() > 0.7,
      likes: Math.floor(Math.random() * 200) + 50,
      shares: Math.floor(Math.random() * 100) + 20,
      questions: generateQuestionsForSubject(64 + (i % 5), 20)
    });
  }
  
  // Ajouter des quizzes spécifiques pour Université Chouaib Doukkali (ENSA El Jadida)
  const ensaElJadidaSubjects = [
    { name: 'Aquaculture Durable', subject: 'Aquaculture', difficulty: 'medium' },
    { name: 'Sciences Marines Appliquées', subject: 'Biologie Marine', difficulty: 'hard' },
    { name: 'Écologie Côtière', subject: 'Écologie', difficulty: 'medium' },
    { name: 'Gestion des Ressources Halieutiques', subject: 'Biologie Marine', difficulty: 'hard' },
    { name: 'Biotechnologie Marine', subject: 'Biotechnologie', difficulty: 'hard' },
    { name: 'Protection de l\'Environnement Marin', subject: 'Environnement', difficulty: 'medium' },
    { name: 'Systèmes d\'Aquaculture Intégrée', subject: 'Aquaculture', difficulty: 'medium' },
    { name: 'Chimie de l\'Eau de Mer', subject: 'Chimie', difficulty: 'hard' },
    { name: 'Biologie Cellulaire Marine', subject: 'Biologie Marine', difficulty: 'medium' },
    { name: 'Technologie de Transformation des Produits Marins', subject: 'Technologie', difficulty: 'medium' },
    { name: 'Microbiologie Marine', subject: 'Microbiologie', difficulty: 'hard' },
    { name: 'Sécurité Alimentaire et Qualité', subject: 'Qualité', difficulty: 'medium' }
  ];
  
  ensaElJadidaSubjects.forEach((item, idx) => {
    const questionsCount = Math.floor(Math.random() * 10) + 15;
    const duration = Math.floor(questionsCount * 1.5);
    const isPaid = Math.random() > 0.5;
    
    quizzes.push({
      id: quizId++,
      title: item.name,
      description: `Quiz spécialisé en ${item.subject} pour les étudiants de l'ENSA El Jadida. Préparation aux examens et concours.`,
      subject: item.subject,
      subjectId: 100 + idx,
      university: 'Université Chouaib Doukkali',
      universityId: 8,
      faculty: 'ENSA El Jadida',
      facultyId: 16,
      level: 'S5-S6',
      questionsCount,
      duration,
      participants: Math.floor(Math.random() * 3000) + 200,
      difficulty: item.difficulty,
      rating: (Math.random() * 1.2 + 3.8).toFixed(1),
      isPro: false,
      isPaid: isPaid,
      price: isPaid ? 99 : 0,
      isCompleted: Math.random() > 0.4,
      bestScore: Math.random() > 0.3 ? Math.floor(Math.random() * 30) + 70 : null,
      currentScore: Math.random() > 0.3 ? Math.floor(Math.random() * 30) + 65 : null,
      completionRate: Math.floor(Math.random() * 25) + 75,
      averageScore: Math.floor(Math.random() * 25) + 65,
      tags: [item.subject.toLowerCase(), 'marine', 'aquaculture', 'ensa', 'el-jadida', isPaid ? 'premium' : 'gratuit'],
      createdAt: new Date(Date.now() - Math.random() * 180 * 24 * 60 * 60 * 1000).toISOString(),
      author: ['Prof. Karim Benlyoussef', 'Dr. Nadia Lebkiri', 'Prof. Mohammed Elhadj'][Math.floor(Math.random() * 3)],
      popularity: 'trending',
      streakRequired: null,
      timeRecord: null,
      isBookmarked: Math.random() > 0.6,
      isLiked: Math.random() > 0.5,
      likes: Math.floor(Math.random() * 150) + 50,
      shares: Math.floor(Math.random() * 80) + 20,
      questions: generateQuestionsForSubject(100 + idx, questionsCount)
    });
  });
  
  // Ajouter des quizzes spécifiques pour Université Marrakech Cadi Ayyad
  const umcaSubjects = [
    { name: 'Droit International et Droits de l\'Homme', subject: 'Droit International', difficulty: 'hard' },
    { name: 'Droit Constitutionnel Marocain', subject: 'Droit Constitutionnel', difficulty: 'medium' },
    { name: 'Droit Civil et Obligations', subject: 'Droit Civil', difficulty: 'hard' },
    { name: 'Droit Pénal et Procédure Pénale', subject: 'Droit Pénal', difficulty: 'hard' },
    { name: 'Droit Administratif Marocain', subject: 'Droit Administratif', difficulty: 'medium' },
    { name: 'Droit Commercial et Droit des Affaires', subject: 'Droit Commercial', difficulty: 'medium' },
    { name: 'Théorie Générale du Droit', subject: 'Philosophie du Droit', difficulty: 'hard' },
    { name: 'Histoire Contemporaine du Maroc', subject: 'Histoire', difficulty: 'medium' },
    { name: 'Linguistique et Analyses de Texte', subject: 'Linguistique', difficulty: 'medium' },
    { name: 'Littérature Arabe Classique', subject: 'Littérature', difficulty: 'hard' },
    { name: 'Sociologie des Organisations', subject: 'Sociologie', difficulty: 'medium' },
    { name: 'Philosophie et Pensée Critique', subject: 'Philosophie', difficulty: 'hard' }
  ];
  
  umcaSubjects.forEach((item, idx) => {
    const questionsCount = Math.floor(Math.random() * 10) + 15;
    const duration = Math.floor(questionsCount * 1.5);
    const isPaid = Math.random() > 0.45;
    
    quizzes.push({
      id: quizId++,
      title: item.name,
      description: `Quiz spécialisé en ${item.subject} pour les étudiants de l'Université Marrakech Cadi Ayyad. Préparation aux examens.`,
      subject: item.subject,
      subjectId: 200 + idx,
      university: 'Université Marrakech Cadi Ayyad',
      universityId: 12,
      faculty: 'Faculté de Droit',
      facultyId: null,
      level: 'S5-S6',
      questionsCount,
      duration,
      participants: Math.floor(Math.random() * 2500) + 150,
      difficulty: item.difficulty,
      rating: (Math.random() * 1.2 + 3.7).toFixed(1),
      isPro: false,
      isPaid: isPaid,
      price: isPaid ? 99 : 0,
      isCompleted: Math.random() > 0.35,
      bestScore: Math.random() > 0.3 ? Math.floor(Math.random() * 30) + 70 : null,
      currentScore: Math.random() > 0.3 ? Math.floor(Math.random() * 30) + 65 : null,
      completionRate: Math.floor(Math.random() * 25) + 75,
      averageScore: Math.floor(Math.random() * 25) + 65,
      tags: [item.subject.toLowerCase(), 'droit', 'humain', 'marrakech', isPaid ? 'premium' : 'gratuit'],
      createdAt: new Date(Date.now() - Math.random() * 180 * 24 * 60 * 60 * 1000).toISOString(),
      author: ['Prof. Hassan Al-Andalusi', 'Dr. Fatima Lahlou', 'Prof. Ahmed Rissani'][Math.floor(Math.random() * 3)],
      popularity: 'popular',
      streakRequired: null,
      timeRecord: null,
      isBookmarked: Math.random() > 0.65,
      isLiked: Math.random() > 0.55,
      likes: Math.floor(Math.random() * 120) + 30,
      shares: Math.floor(Math.random() * 70) + 15,
      questions: generateQuestionsForSubject(200 + idx, questionsCount)
    });
  });
  
  // Ajouter des quizzes pour Université Al Akhawayn (Ifrane) - Université d'élite
  const auiSubjects = [
    { name: 'Advanced Data Structures', subject: 'Computer Science', difficulty: 'hard' },
    { name: 'Machine Learning Fundamentals', subject: 'Artificial Intelligence', difficulty: 'hard' },
    { name: 'Systems Architecture', subject: 'Computer Science', difficulty: 'hard' },
    { name: 'Network Security & Cryptography', subject: 'Cybersecurity', difficulty: 'hard' },
    { name: 'Business Strategy & Management', subject: 'Management', difficulty: 'medium' },
    { name: 'Financial Analysis & Accounting', subject: 'Finance', difficulty: 'medium' },
    { name: 'Corporate Governance', subject: 'Business Law', difficulty: 'medium' },
    { name: 'International Business Economics', subject: 'Economics', difficulty: 'hard' },
    { name: 'Entrepreneurship & Innovation', subject: 'Entrepreneurship', difficulty: 'medium' },
    { name: 'Leadership & Organizational Behavior', subject: 'Management', difficulty: 'medium' }
  ];
  
  auiSubjects.forEach((item, idx) => {
    const questionsCount = Math.floor(Math.random() * 10) + 18;
    const duration = Math.floor(questionsCount * 1.5);
    const isPaid = Math.random() > 0.35;
    
    quizzes.push({
      id: quizId++,
      title: item.name,
      description: `Elite quiz for Al Akhawayn University students. Advanced curriculum in ${item.subject}.`,
      subject: item.subject,
      subjectId: 300 + idx,
      university: 'Université Al Akhawayn',
      universityId: 11,
      faculty: item.subject.includes('Computer') || item.subject.includes('Cyber') ? 'School of Science and Engineering' : 'School of Business and Economics',
      facultyId: null,
      level: 'Advanced',
      questionsCount,
      duration,
      participants: Math.floor(Math.random() * 1500) + 300,
      difficulty: item.difficulty,
      rating: (Math.random() * 0.9 + 4.0).toFixed(1),
      isPro: false,
      isPaid: isPaid,
      price: isPaid ? 99 : 0,
      isCompleted: Math.random() > 0.3,
      bestScore: Math.random() > 0.25 ? Math.floor(Math.random() * 30) + 75 : null,
      currentScore: Math.random() > 0.25 ? Math.floor(Math.random() * 25) + 70 : null,
      completionRate: Math.floor(Math.random() * 20) + 80,
      averageScore: Math.floor(Math.random() * 20) + 75,
      tags: [item.subject.toLowerCase(), 'elite', 'advanced', 'ifrane', isPaid ? 'premium' : 'gratuit'],
      createdAt: new Date(Date.now() - Math.random() * 150 * 24 * 60 * 60 * 1000).toISOString(),
      author: ['Prof. Dr. Youssef Boutaleb', 'Dr. Sarah El Gammal', 'Prof. Rachid Saadaoui'][Math.floor(Math.random() * 3)],
      popularity: 'trending',
      streakRequired: null,
      timeRecord: null,
      isBookmarked: Math.random() > 0.5,
      isLiked: Math.random() > 0.4,
      likes: Math.floor(Math.random() * 180) + 80,
      shares: Math.floor(Math.random() * 100) + 40,
      questions: generateQuestionsForSubject(300 + idx, questionsCount)
    });
  });
  
  // Ajouter des quizzes pour Université Sultan Moulay Slimane (Beni Mellal)
  const usmslSubjects = [
    { name: 'Programmation en Python', subject: 'Informatique', difficulty: 'easy' },
    { name: 'Bases de Données Relationnelles', subject: 'Informatique', difficulty: 'medium' },
    { name: 'Développement Web Frontend', subject: 'Informatique', difficulty: 'medium' },
    { name: 'Systèmes d\'Exploitation', subject: 'Informatique', difficulty: 'hard' },
    { name: 'Algèbre Linéaire Appliquée', subject: 'Mathématiques', difficulty: 'medium' },
    { name: 'Analyse Mathématique II', subject: 'Mathématiques', difficulty: 'hard' },
    { name: 'Probabilités et Statistiques', subject: 'Mathématiques', difficulty: 'medium' },
    { name: 'Physique Générale', subject: 'Physique', difficulty: 'medium' },
    { name: 'Chimie Organique', subject: 'Chimie', difficulty: 'hard' },
    { name: 'Électricité et Électronique', subject: 'Électronique', difficulty: 'medium' }
  ];
  
  usmslSubjects.forEach((item, idx) => {
    const questionsCount = Math.floor(Math.random() * 10) + 15;
    const duration = Math.floor(questionsCount * 1.5);
    const isPaid = Math.random() > 0.55;
    
    quizzes.push({
      id: quizId++,
      title: item.name,
      description: `Quiz complet pour les étudiants de l'Université Sultan Moulay Slimane. Module: ${item.subject}`,
      subject: item.subject,
      subjectId: 400 + idx,
      university: 'Université Sultan Moulay Slimane',
      universityId: 10,
      faculty: 'Faculté des Sciences & Technologie',
      facultyId: null,
      level: 'S1-S4',
      questionsCount,
      duration,
      participants: Math.floor(Math.random() * 2000) + 200,
      difficulty: item.difficulty,
      rating: (Math.random() * 1.3 + 3.5).toFixed(1),
      isPro: false,
      isPaid: isPaid,
      price: isPaid ? 99 : 0,
      isCompleted: Math.random() > 0.45,
      bestScore: Math.random() > 0.35 ? Math.floor(Math.random() * 30) + 70 : null,
      currentScore: Math.random() > 0.35 ? Math.floor(Math.random() * 30) + 60 : null,
      completionRate: Math.floor(Math.random() * 30) + 70,
      averageScore: Math.floor(Math.random() * 30) + 60,
      tags: [item.subject.toLowerCase(), 'beni-mellal', 'sciences', isPaid ? 'premium' : 'gratuit'],
      createdAt: new Date(Date.now() - Math.random() * 200 * 24 * 60 * 60 * 1000).toISOString(),
      author: ['Prof. Bilal Chebli', 'Dr. Nora Zahra', 'Prof. Mohamed Bouslimi'][Math.floor(Math.random() * 3)],
      popularity: 'popular',
      streakRequired: null,
      timeRecord: null,
      isBookmarked: Math.random() > 0.7,
      isLiked: Math.random() > 0.6,
      likes: Math.floor(Math.random() * 100) + 20,
      shares: Math.floor(Math.random() * 60) + 10,
      questions: generateQuestionsForSubject(400 + idx, questionsCount)
    });
  });
  
  // Ajouter des quizzes pour Université Mohammed Premier (Oujda)
  const umpSubjects = [
    { name: 'Relations Internationales', subject: 'Sciences Politiques', difficulty: 'medium' },
    { name: 'Diplomatie et Coopération', subject: 'Relations Internationales', difficulty: 'hard' },
    { name: 'Droit International Public', subject: 'Droit', difficulty: 'hard' },
    { name: 'Géopolitique du Maghreb', subject: 'Géopolitique', difficulty: 'medium' },
    { name: 'Économie Internationale', subject: 'Économie', difficulty: 'medium' },
    { name: 'Histoire de la Pensée Politique', subject: 'Sciences Politiques', difficulty: 'hard' },
    { name: 'Organisation des Nations Unies', subject: 'Relations Internationales', difficulty: 'medium' },
    { name: 'Intégration Régionale Africaine', subject: 'Études Africaines', difficulty: 'medium' },
    { name: 'Sécurité et Stabilité Régionale', subject: 'Études Stratégiques', difficulty: 'hard' },
    { name: 'Commerce International et Douanes', subject: 'Économie', difficulty: 'medium' }
  ];
  
  umpSubjects.forEach((item, idx) => {
    const questionsCount = Math.floor(Math.random() * 10) + 15;
    const duration = Math.floor(questionsCount * 1.5);
    const isPaid = Math.random() > 0.5;
    
    quizzes.push({
      id: quizId++,
      title: item.name,
      description: `Quiz spécialisé pour l'Université Mohammed Premier. Domaine: ${item.subject}`,
      subject: item.subject,
      subjectId: 500 + idx,
      university: 'Université Mohammed Premier',
      universityId: 9,
      faculty: 'Faculté des Sciences Appliquées',
      facultyId: null,
      level: 'S5-S6',
      questionsCount,
      duration,
      participants: Math.floor(Math.random() * 1800) + 150,
      difficulty: item.difficulty,
      rating: (Math.random() * 1.2 + 3.7).toFixed(1),
      isPro: false,
      isPaid: isPaid,
      price: isPaid ? 99 : 0,
      isCompleted: Math.random() > 0.4,
      bestScore: Math.random() > 0.3 ? Math.floor(Math.random() * 30) + 70 : null,
      currentScore: Math.random() > 0.3 ? Math.floor(Math.random() * 30) + 65 : null,
      completionRate: Math.floor(Math.random() * 25) + 75,
      averageScore: Math.floor(Math.random() * 25) + 65,
      tags: [item.subject.toLowerCase(), 'international', 'oujda', isPaid ? 'premium' : 'gratuit'],
      createdAt: new Date(Date.now() - Math.random() * 180 * 24 * 60 * 60 * 1000).toISOString(),
      author: ['Prof. Jamal Ouardi', 'Dr. Karim El Otmani', 'Prof. Leila Brahimi'][Math.floor(Math.random() * 3)],
      popularity: 'trending',
      streakRequired: null,
      timeRecord: null,
      isBookmarked: Math.random() > 0.6,
      isLiked: Math.random() > 0.5,
      likes: Math.floor(Math.random() * 130) + 40,
      shares: Math.floor(Math.random() * 75) + 20,
      questions: generateQuestionsForSubject(500 + idx, questionsCount)
    });
  });
  
  // Ajouter des quizzes pour Université Ibn Tofail (Kénitra)
  const uitSubjects = [
    { name: 'Chimie Analytique Avancée', subject: 'Chimie', difficulty: 'hard' },
    { name: 'Chimie Inorganique', subject: 'Chimie', difficulty: 'medium' },
    { name: 'Thermodynamique Chimique', subject: 'Chimie', difficulty: 'hard' },
    { name: 'Biochimie Structurale', subject: 'Biochimie', difficulty: 'hard' },
    { name: 'Physiologie Humaine', subject: 'Biologie', difficulty: 'medium' },
    { name: 'Microbiologie Générale', subject: 'Microbiologie', difficulty: 'medium' },
    { name: 'Écologie et Environnement', subject: 'Écologie', difficulty: 'medium' },
    { name: 'Géologie Générale', subject: 'Géologie', difficulty: 'easy' },
    { name: 'Minéralogie et Cristallographie', subject: 'Géologie', difficulty: 'hard' },
    { name: 'Sciences de l\'Eau et Hydrogéologie', subject: 'Hydrogéologie', difficulty: 'medium' }
  ];
  
  uitSubjects.forEach((item, idx) => {
    const questionsCount = Math.floor(Math.random() * 10) + 15;
    const duration = Math.floor(questionsCount * 1.5);
    const isPaid = Math.random() > 0.5;
    
    quizzes.push({
      id: quizId++,
      title: item.name,
      description: `Quiz complet pour l'Université Ibn Tofail. Matière: ${item.subject}`,
      subject: item.subject,
      subjectId: 600 + idx,
      university: 'Université Ibn Tofail',
      universityId: 4,
      faculty: 'Faculté des Sciences',
      facultyId: null,
      level: 'S3-S6',
      questionsCount,
      duration,
      participants: Math.floor(Math.random() * 2200) + 180,
      difficulty: item.difficulty,
      rating: (Math.random() * 1.3 + 3.6).toFixed(1),
      isPro: false,
      isPaid: isPaid,
      price: isPaid ? 99 : 0,
      isCompleted: Math.random() > 0.4,
      bestScore: Math.random() > 0.3 ? Math.floor(Math.random() * 30) + 70 : null,
      currentScore: Math.random() > 0.3 ? Math.floor(Math.random() * 30) + 60 : null,
      completionRate: Math.floor(Math.random() * 30) + 70,
      averageScore: Math.floor(Math.random() * 30) + 60,
      tags: [item.subject.toLowerCase(), 'sciences', 'kenitra', isPaid ? 'premium' : 'gratuit'],
      createdAt: new Date(Date.now() - Math.random() * 200 * 24 * 60 * 60 * 1000).toISOString(),
      author: ['Prof. Samir Bennani', 'Dr. Khadija Saber', 'Prof. Abdellah Chakri'][Math.floor(Math.random() * 3)],
      popularity: 'popular',
      streakRequired: null,
      timeRecord: null,
      isBookmarked: Math.random() > 0.65,
      isLiked: Math.random() > 0.55,
      likes: Math.floor(Math.random() * 110) + 30,
      shares: Math.floor(Math.random() * 65) + 15,
      questions: generateQuestionsForSubject(600 + idx, questionsCount)
    });
  });
  
  return quizzes;
};

// State initial
const initialState = {
  // État général
  status: QuizState.IDLE,
  loading: false,
  error: null,
  
  // Liste des quizzes
  quizzes: generateQuizzes(),
  filteredQuizzes: [],
  
  // Quiz en cours
  currentQuiz: null,
  currentQuestions: [],
  currentQuestionIndex: 0,
  userAnswers: [],
  quizStartTime: null,
  timeSpent: 0,
  quizTimer: null,
  
  // Tentative en cours
  currentAttempt: {
    id: null,
    score: 0,
    correctAnswers: 0,
    totalQuestions: 0,
    status: 'not_started',
    answers: []
  },
  
  // Résultats
  results: null,
  userAttempts: [],
  leaderboard: [],
  
  // Filtres et recherche
  filters: {
    university: null,
    faculty: null,
    subject: null,
    level: null,
    difficulty: null,
    isPro: null
  },
  searchQuery: '',
  
  // Statistiques
  statistics: {
    totalQuizzesTaken: 0,
    averageScore: 0,
    totalTimeSpent: 0,
    bestScore: 0,
    quizzesCompleted: 0
  },
  
  // Données de référence
  universities: UNIVERSITIES,
  faculties: FACULTIES,
  subjects: SUBJECTS,
  
  // Métadonnées
  metadata: {
    totalQuizzes: 0,
    totalQuestions: 0,
    totalSubjects: SUBJECTS.length,
    totalUniversities: UNIVERSITIES.length
  }
};

// Reducer
const quizReducer = (state, action) => {
  switch (action.type) {
    case QuizActionTypes.SET_LOADING:
      return { ...state, loading: action.payload };

    case QuizActionTypes.SET_QUIZZES:
      return { 
        ...state, 
        quizzes: action.payload,
        filteredQuizzes: action.payload,
        metadata: {
          ...state.metadata,
          totalQuizzes: action.payload.length,
          totalQuestions: action.payload.reduce((sum, quiz) => sum + quiz.questionsCount, 0)
        },
        loading: false 
      };

    case QuizActionTypes.SET_CURRENT_QUIZ:
      return { ...state, currentQuiz: action.payload, loading: false };

    case QuizActionTypes.SET_QUESTIONS:
      return { ...state, currentQuestions: action.payload, loading: false };

    case QuizActionTypes.START_QUIZ:
      const startTime = new Date().toISOString();
      return {
        ...state,
        status: QuizState.IN_PROGRESS,
        currentQuestionIndex: 0,
        userAnswers: [],
        quizStartTime: startTime,
        timeSpent: 0,
        currentAttempt: {
          id: `attempt_${Date.now()}`,
          quizId: action.payload.quizId,
          score: 0,
          correctAnswers: 0,
          totalQuestions: action.payload.questions.length,
          status: 'in_progress',
          answers: [],
          startTime: startTime,
          questions: action.payload.questions.map(q => ({ id: q.id, points: q.points }))
        }
      };

    case QuizActionTypes.ANSWER_QUESTION:
      const { questionId, selectedAnswer, isCorrect, timeSpent } = action.payload;
      const newUserAnswers = [...state.userAnswers];
      const newAttemptAnswers = [...state.currentAttempt.answers];
      
      const existingAnswerIndex = newUserAnswers.findIndex(
        answer => answer.questionId === questionId
      );
      
      const answerData = {
        questionId,
        selectedAnswer,
        isCorrect,
        timeSpent,
        answeredAt: new Date().toISOString(),
        questionIndex: state.currentQuestionIndex
      };
      
      if (existingAnswerIndex >= 0) {
        newUserAnswers[existingAnswerIndex] = answerData;
        newAttemptAnswers[existingAnswerIndex] = answerData;
      } else {
        newUserAnswers.push(answerData);
        newAttemptAnswers.push(answerData);
      }
      
      const correctAnswers = newUserAnswers.filter(answer => answer.isCorrect).length;
      const totalPossiblePoints = state.currentQuestions.reduce((sum, q) => sum + (q.points || 1), 0);
      const earnedPoints = newUserAnswers.reduce((sum, answer) => {
        const question = state.currentQuestions.find(q => q.id === answer.questionId);
        return sum + (answer.isCorrect ? (question?.points || 1) : 0);
      }, 0);
      
      const score = totalPossiblePoints > 0 
        ? Math.round((earnedPoints / totalPossiblePoints) * 100)
        : 0;
      
      return {
        ...state,
        userAnswers: newUserAnswers,
        currentAttempt: {
          ...state.currentAttempt,
          answers: newAttemptAnswers,
          correctAnswers,
          score,
          earnedPoints
        }
      };

    case QuizActionTypes.NEXT_QUESTION:
      return {
        ...state,
        currentQuestionIndex: Math.min(
          state.currentQuestionIndex + 1,
          state.currentQuestions.length - 1
        )
      };

    case QuizActionTypes.PREVIOUS_QUESTION:
      return {
        ...state,
        currentQuestionIndex: Math.max(state.currentQuestionIndex - 1, 0)
      };

    case QuizActionTypes.PAUSE_QUIZ:
      return {
        ...state,
        status: QuizState.PAUSED,
        quizTimer: null
      };

    case QuizActionTypes.RESUME_QUIZ:
      return {
        ...state,
        status: QuizState.IN_PROGRESS
      };

    case QuizActionTypes.COMPLETE_QUIZ:
      const completionTime = new Date().toISOString();
      const finalAttempt = {
        ...state.currentAttempt,
        status: 'completed',
        endTime: completionTime,
        timeSpent: state.timeSpent,
        totalTime: state.timeSpent,
        accuracy: state.currentAttempt.totalQuestions > 0 
          ? (state.currentAttempt.correctAnswers / state.currentAttempt.totalQuestions) * 100
          : 0
      };
      
      return {
        ...state,
        status: QuizState.COMPLETED,
        currentAttempt: finalAttempt,
        userAttempts: [...state.userAttempts, finalAttempt],
        statistics: {
          ...state.statistics,
          totalQuizzesTaken: state.statistics.totalQuizzesTaken + 1,
          quizzesCompleted: state.statistics.quizzesCompleted + 1,
          totalTimeSpent: state.statistics.totalTimeSpent + state.timeSpent,
          averageScore: state.statistics.totalQuizzesTaken > 0
            ? (state.statistics.averageScore * state.statistics.totalQuizzesTaken + finalAttempt.score) / 
              (state.statistics.totalQuizzesTaken + 1)
            : finalAttempt.score,
          bestScore: Math.max(state.statistics.bestScore, finalAttempt.score)
        }
      };

    case QuizActionTypes.RESET_QUIZ:
      return {
        ...state,
        status: QuizState.READY,
        currentQuestionIndex: 0,
        userAnswers: [],
        timeSpent: 0,
        currentAttempt: initialState.currentAttempt
      };

    case QuizActionTypes.UPDATE_TIMER:
      return { ...state, timeSpent: state.timeSpent + 1 };

    case QuizActionTypes.SET_TIME_SPENT:
      return { ...state, timeSpent: action.payload };

    case QuizActionTypes.SET_RESULTS:
      return { ...state, results: action.payload, status: QuizState.REVIEW };

    case QuizActionTypes.SAVE_ATTEMPT:
      return { ...state, userAttempts: [...state.userAttempts, action.payload] };

    case QuizActionTypes.UPDATE_LEADERBOARD:
      return { ...state, leaderboard: action.payload };

    case QuizActionTypes.SET_FILTERS:
      const newFilters = { ...state.filters, ...action.payload };
      return { ...state, filters: newFilters };

    case QuizActionTypes.SET_SEARCH_QUERY:
      return { ...state, searchQuery: action.payload };

    case QuizActionTypes.SET_ERROR:
      return { ...state, error: action.payload, loading: false };

    case QuizActionTypes.CLEAR_ERROR:
      return { ...state, error: null };

    default:
      return state;
  }
};

// Création du contexte
const QuizContext = createContext();

// Hook personnalisé
export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};

// Provider component
export const QuizProvider = ({ children }) => {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  // Filtrage des quizzes
  const filterQuizzes = useCallback(() => {
    let filtered = state.quizzes;

    // Filtre par recherche
    if (state.searchQuery) {
      const query = state.searchQuery.toLowerCase();
      filtered = filtered.filter(quiz =>
        quiz.title.toLowerCase().includes(query) ||
        quiz.description.toLowerCase().includes(query) ||
        quiz.tags.some(tag => tag.toLowerCase().includes(query)) ||
        quiz.subject.toLowerCase().includes(query)
      );
    }

    // Filtres par critères
    if (state.filters.university) {
      filtered = filtered.filter(quiz => 
        quiz.universityId === state.filters.university
      );
    }

    if (state.filters.faculty) {
      filtered = filtered.filter(quiz => 
        quiz.facultyId === state.filters.faculty
      );
    }

    if (state.filters.subject) {
      filtered = filtered.filter(quiz => 
        quiz.subjectId === state.filters.subject
      );
    }

    if (state.filters.level) {
      filtered = filtered.filter(quiz => 
        quiz.level === state.filters.level
      );
    }

    if (state.filters.difficulty) {
      filtered = filtered.filter(quiz => 
        quiz.difficulty === state.filters.difficulty
      );
    }

    if (state.filters.isPaid !== null && state.filters.isPaid !== undefined) {
      filtered = filtered.filter(quiz => 
        quiz.isPaid === state.filters.isPaid
      );
    }

    return filtered;
  }, [state.quizzes, state.filters, state.searchQuery]);

  // Effet pour filtrer les quizzes
  useEffect(() => {
    const filtered = filterQuizzes();
    dispatch({ type: QuizActionTypes.SET_QUIZZES, payload: filtered });
  }, [filterQuizzes]);

  // Timer automatique
  useEffect(() => {
    let timer;
    
    if (state.status === QuizState.IN_PROGRESS) {
      timer = setInterval(() => {
        dispatch({ type: QuizActionTypes.UPDATE_TIMER });
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [state.status]);

  // Actions
  const actions = {
    setLoading: (loading) => 
      dispatch({ type: QuizActionTypes.SET_LOADING, payload: loading }),

    setCurrentQuiz: (quiz) => 
      dispatch({ type: QuizActionTypes.SET_CURRENT_QUIZ, payload: quiz }),

    setQuestions: (questions) => 
      dispatch({ type: QuizActionTypes.SET_QUESTIONS, payload: questions }),

    startQuiz: (quizData) => 
      dispatch({ 
        type: QuizActionTypes.START_QUIZ, 
        payload: { quizId: quizData.quizId, questions: quizData.questions } 
      }),

    answerQuestion: (answerData) => 
      dispatch({ type: QuizActionTypes.ANSWER_QUESTION, payload: answerData }),

    nextQuestion: () => 
      dispatch({ type: QuizActionTypes.NEXT_QUESTION }),

    previousQuestion: () => 
      dispatch({ type: QuizActionTypes.PREVIOUS_QUESTION }),

    pauseQuiz: () => 
      dispatch({ type: QuizActionTypes.PAUSE_QUIZ }),

    resumeQuiz: () => 
      dispatch({ type: QuizActionTypes.RESUME_QUIZ }),

    completeQuiz: () => 
      dispatch({ type: QuizActionTypes.COMPLETE_QUIZ }),

    resetQuiz: () => 
      dispatch({ type: QuizActionTypes.RESET_QUIZ }),

    setTimeSpent: (time) => 
      dispatch({ type: QuizActionTypes.SET_TIME_SPENT, payload: time }),

    setResults: (results) => 
      dispatch({ type: QuizActionTypes.SET_RESULTS, payload: results }),

    saveAttempt: (attempt) => 
      dispatch({ type: QuizActionTypes.SAVE_ATTEMPT, payload: attempt }),

    updateLeaderboard: (leaderboard) => 
      dispatch({ type: QuizActionTypes.UPDATE_LEADERBOARD, payload: leaderboard }),

    setFilters: (filters) => 
      dispatch({ type: QuizActionTypes.SET_FILTERS, payload: filters }),

    setSearchQuery: (query) => 
      dispatch({ type: QuizActionTypes.SET_SEARCH_QUERY, payload: query }),

    setError: (error) => 
      dispatch({ type: QuizActionTypes.SET_ERROR, payload: error }),

    clearError: () => 
      dispatch({ type: QuizActionTypes.CLEAR_ERROR }),

    goToQuestion: (index) => {
      if (index >= 0 && index < state.currentQuestions.length) {
        dispatch({ 
          type: 'SET_CURRENT_QUESTION', 
          payload: index 
        });
      }
    }
  };

  // Méthodes utilitaires
  const loadQuiz = async (quizId) => {
    try {
      actions.setLoading(true);
      
      const quiz = state.quizzes.find(q => q.id === quizId);
      if (!quiz) {
        throw new Error('Quiz non trouvé');
      }
      
      actions.setCurrentQuiz(quiz);
      actions.setQuestions(quiz.questions || []);
      actions.setError(null);
      
      return { success: true, quiz };
    } catch (error) {
      actions.setError(error.message);
      return { success: false, error: error.message };
    }
  };

  const submitQuiz = async () => {
    try {
      actions.setLoading(true);
      
      actions.completeQuiz();
      const results = state.currentAttempt;
      actions.setResults(results);
      
      return { success: true, results };
    } catch (error) {
      actions.setError(error.message);
      return { success: false, error: error.message };
    }
  };

  const getFormattedTime = () => {
    const minutes = Math.floor(state.timeSpent / 60);
    const seconds = state.timeSpent % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const getRemainingTime = (totalTime) => {
    return Math.max(0, (totalTime * 60) - state.timeSpent);
  };

  const isQuestionAnswered = (questionId) => {
    return state.userAnswers.some(answer => answer.questionId === questionId);
  };

  const getUserAnswer = (questionId) => {
    return state.userAnswers.find(answer => answer.questionId === questionId);
  };

  const getQuizRecommendations = (count = 6) => {
    const { currentQuiz } = state;
    if (!currentQuiz) return state.quizzes.slice(0, count);
    
    return state.quizzes
      .filter(quiz => 
        quiz.subjectId === currentQuiz.subjectId &&
        quiz.id !== currentQuiz.id
      )
      .slice(0, count);
  };

  const getSubjectStats = (subjectId) => {
    const subjectAttempts = state.userAttempts.filter(
      attempt => {
        const quiz = state.quizzes.find(q => q.id === attempt.quizId);
        return quiz && quiz.subjectId === subjectId;
      }
    );
    
    if (subjectAttempts.length === 0) return null;
    
    const totalScore = subjectAttempts.reduce((sum, attempt) => sum + attempt.score, 0);
    const totalTime = subjectAttempts.reduce((sum, attempt) => sum + (attempt.timeSpent || 0), 0);
    const bestScore = Math.max(...subjectAttempts.map(attempt => attempt.score));
    
    return {
      attempts: subjectAttempts.length,
      averageScore: totalScore / subjectAttempts.length,
      totalTime,
      bestScore,
      lastAttempt: subjectAttempts[subjectAttempts.length - 1]
    };
  };

  const getUniversityStats = (universityId) => {
    const universityQuizzes = state.quizzes.filter(q => q.universityId === universityId);
    const universityAttempts = state.userAttempts.filter(
      attempt => {
        const quiz = state.quizzes.find(q => q.id === attempt.quizId);
        return quiz && quiz.universityId === universityId;
      }
    );
    
    return {
      totalQuizzes: universityQuizzes.length,
      totalQuestions: universityQuizzes.reduce((sum, quiz) => sum + quiz.questionsCount, 0),
      yourAttempts: universityAttempts.length,
      averageScore: universityAttempts.length > 0
        ? universityAttempts.reduce((sum, attempt) => sum + attempt.score, 0) / universityAttempts.length
        : 0,
      completionRate: universityAttempts.length > 0
        ? (universityAttempts.filter(a => a.status === 'completed').length / universityAttempts.length) * 100
        : 0
    };
  };

  // Valeur du contexte
  const contextValue = {
    // State
    ...state,
    
    // Getters utiles
    currentQuestion: state.currentQuestions[state.currentQuestionIndex] || null,
    totalQuestions: state.currentQuestions.length,
    progress: state.currentQuestions.length > 0 
      ? ((state.currentQuestionIndex + 1) / state.currentQuestions.length) * 100 
      : 0,
    isLastQuestion: state.currentQuestionIndex === state.currentQuestions.length - 1,
    isFirstQuestion: state.currentQuestionIndex === 0,
    answeredQuestions: state.userAnswers.length,
    
    // Actions
    ...actions,

    // Méthodes utilitaires
    loadQuiz,
    submitQuiz,
    getFormattedTime,
    getRemainingTime,
    isQuestionAnswered,
    getUserAnswer,
    getQuizRecommendations,
    getSubjectStats,
    getUniversityStats,

    // Filtres avancés
    getQuizzesBySubject: (subjectId) => 
      state.quizzes.filter(quiz => quiz.subjectId === subjectId),
    
    getQuizzesByUniversity: (universityId) => 
      state.quizzes.filter(quiz => quiz.universityId === universityId),
    
    getQuizzesByFaculty: (facultyId) => 
      state.quizzes.filter(quiz => quiz.facultyId === facultyId),
    
    getQuizzesByLevel: (level) => 
      state.quizzes.filter(quiz => quiz.level === level),
    
    getQuizzesByDifficulty: (difficulty) => 
      state.quizzes.filter(quiz => quiz.difficulty === difficulty),

    // Recherche avancée
    searchQuizzes: (query, filters = {}) => {
      const searchQuery = query || state.searchQuery;
      const combinedFilters = { ...state.filters, ...filters };
      
      let results = state.quizzes;
      
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        results = results.filter(quiz =>
          quiz.title.toLowerCase().includes(q) ||
          quiz.description.toLowerCase().includes(q) ||
          quiz.subject.toLowerCase().includes(q) ||
          quiz.tags.some(tag => tag.toLowerCase().includes(q)) ||
          quiz.author.toLowerCase().includes(q)
        );
      }
      
      Object.entries(combinedFilters).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          results = results.filter(quiz => quiz[key] === value);
        }
      });
      
      return results;
    },

    // Statistiques avancées
    getOverallStats: () => ({
      totalSubjectsCovered: new Set(state.quizzes.map(q => q.subjectId)).size,
      totalUniversitiesCovered: new Set(state.quizzes.map(q => q.universityId).filter(id => id)).size,
      totalFacultiesCovered: new Set(state.quizzes.map(q => q.facultyId).filter(id => id)).size,
      quizzesByDifficulty: state.quizzes.reduce((acc, quiz) => {
        acc[quiz.difficulty] = (acc[quiz.difficulty] || 0) + 1;
        return acc;
      }, {}),
      quizzesByLevel: state.quizzes.reduce((acc, quiz) => {
        acc[quiz.level] = (acc[quiz.level] || 0) + 1;
        return acc;
      }, {}),
      averageQuizRating: state.quizzes.reduce((sum, quiz) => sum + quiz.rating, 0) / state.quizzes.length,
      totalParticipants: state.quizzes.reduce((sum, quiz) => sum + quiz.participants, 0)
    }),

    // Gestion des favoris
    toggleBookmark: (quizId) => {
      const updatedQuizzes = state.quizzes.map(quiz => 
        quiz.id === quizId 
          ? { ...quiz, isBookmarked: !quiz.isBookmarked }
          : quiz
      );
      
      dispatch({ type: QuizActionTypes.SET_QUIZZES, payload: updatedQuizzes });
    },

    toggleLike: (quizId) => {
      const updatedQuizzes = state.quizzes.map(quiz => {
        if (quiz.id === quizId) {
          const newLikes = quiz.isLiked ? quiz.likes - 1 : quiz.likes + 1;
          return { 
            ...quiz, 
            isLiked: !quiz.isLiked,
            likes: newLikes 
          };
        }
        return quiz;
      });
      
      dispatch({ type: QuizActionTypes.SET_QUIZZES, payload: updatedQuizzes });
    }
  };

  return (
    <QuizContext.Provider value={contextValue}>
      {children}
    </QuizContext.Provider>
  );
};

export default QuizContext;