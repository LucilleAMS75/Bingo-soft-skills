import { Competence } from './types';

export const BINGO_DATA: Competence[] = [
  {
    id: 'posture',
    title: 'POSTURE PROFESSIONNELLE',
    cases: [
      { id: 'p4', text: 'Je connais les normes implicites spécifiques à mon métier', points: 3, color: '#a1d6f5' },
      { id: 'p1', text: 'Je connais mes horaires de travail', points: 1, color: '#f7de9f' },
      { id: 'p3', text: 'Je sais où trouver les règles dans mon contexte professionnel', points: 2, color: '#cae9ab' },
      { id: 'p5', text: 'Je comprends la différence entre norme implicite et norme explicite', points: 3, color: '#a1d6f5' },
      { id: 'p2', text: 'Je connais la tenue attendue sur mon lieu de travail', points: 2, color: '#cae9ab' },
    ],
  },
  {
    id: 'communication',
    title: 'COMMUNICATION',
    cases: [
      { id: 'c2', text: 'Je comprends les risques d\'une mauvaise communication', points: 2, color: '#cae9ab' },
      { id: 'c4', text: 'Je connais les principes de l\'écoute active', points: 3, color: '#a1d6f5' },
      { id: 'c1', text: 'Je connais les 3 types de communication', points: 1, color: '#f7de9f' },
      { id: 'c5', text: 'Je sais comment refuser une sollicitation de manière professionnelle', points: 3, color: '#a1d6f5' },
      { id: 'c3', text: 'Je connais le lexique spécifique de mon métier', points: 2, color: '#cae9ab' },
    ],
  },
  {
    id: 'autonomie',
    title: 'AUTONOMIE',
    cases: [
      { id: 'a3', text: 'Je connais la différence entre tâche urgente et tâche importante', points: 2, color: '#cae9ab' },
      { id: 'a1', text: 'Je connais les consignes données par mon tuteur', points: 1, color: '#f7de9f' },
      { id: 'a5', text: 'Je connais des outils pour m\'aider à gérer mon temps de travail', points: 3, color: '#a1d6f5' },
      { id: 'a2', text: 'Lorsque je n\'ai pas compris je sais à qui poser des questions', points: 2, color: '#cae9ab' },
      { id: 'a4', text: 'Je sais identifier les priorités dans mon travail', points: 3, color: '#a1d6f5' },
    ],
  },
];
