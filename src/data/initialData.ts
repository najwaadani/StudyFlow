import { Task, Category, UserProfile } from '../types';

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'cat-1',
    name: 'Database Systems',
    code: 'CS-301',
    color: '#2563EB', // Primary blue
    description: 'Relational algebra, SQL optimization, ACID transactions, and NoSQL fundamentals.',
    instructor: 'Dr. Robert Evans',
    credits: 4,
  },
  {
    id: 'cat-2',
    name: 'Web Programming',
    code: 'CS-240',
    color: '#0284C7', // Sky blue
    description: 'Full-stack client/server architecture, React modern ecosystem, and RESTful APIs.',
    instructor: 'Prof. Sarah Jenkins',
    credits: 3,
  },
  {
    id: 'cat-3',
    name: 'Software Engineering',
    code: 'SE-410',
    color: '#7C3AED', // Purple
    description: 'Agile development, test-driven methodologies, CI/CD pipelines, and design patterns.',
    instructor: 'Dr. Michael Chen',
    credits: 4,
  },
  {
    id: 'cat-4',
    name: 'UI/UX Design',
    code: 'UX-105',
    color: '#059669', // Emerald
    description: 'User research, interaction architectures, wireframing, and Figma prototyping.',
    instructor: 'Elena Rostova',
    credits: 3,
  },
  {
    id: 'cat-5',
    name: 'Data Structures',
    code: 'DS-210',
    color: '#D97706', // Amber
    description: 'Trees, balanced search structures, hashing, graphs, and asymptotic algorithm analysis.',
    instructor: 'Dr. Amanda Vance',
    credits: 4,
  },
];

export const INITIAL_USER_PROFILE: UserProfile = {
  name: 'Alex Morgan',
  role: 'University Student',
  email: 'alex.morgan@university.edu',
  avatarUrl: '/src/assets/images/avatar_alex_morgan_1794323042050.jpg',
  major: 'Computer Science & Human-Computer Interaction',
  university: 'Metropolitan Institute of Technology',
  semester: 'Semester 5 (Junior Year)',
  dailyStudyGoalHours: 4,
};

// Current reference date is 2026-11-10
// We have:
// - 16 Completed
// - 5 In Progress
// - 3 Overdue
// Total = 24 tasks
export const INITIAL_TASKS: Task[] = [
  // --- 3 OVERDUE TASKS (Due before 2026-11-10, status Pending) ---
  {
    id: 'task-1',
    title: 'Submit Database Systems ER Diagram Draft',
    description: 'Upload normalized entity-relationship diagram for campus bookstore database schema.',
    category: 'Database Systems',
    dueDate: '2026-11-06',
    dueTime: '23:59',
    priority: 'High',
    status: 'Pending',
    createdAt: '2026-10-31',
    estimatedMinutes: 90,
  },
  {
    id: 'task-2',
    title: 'Data Structures Heapify Homework',
    description: 'Implement min-max heap array conversion and benchmark runtime against standard sort.',
    category: 'Data Structures',
    dueDate: '2026-11-08',
    dueTime: '17:00',
    priority: 'Medium',
    status: 'Pending',
    createdAt: '2026-11-02',
    estimatedMinutes: 60,
  },
  {
    id: 'task-3',
    title: 'Software Engineering Sprint Retro Notes',
    description: 'Document retrospective action items and sprint velocity breakdown in team Notion.',
    category: 'Software Engineering',
    dueDate: '2026-11-09',
    dueTime: '18:00',
    priority: 'Low',
    status: 'Pending',
    createdAt: '2026-11-04',
    estimatedMinutes: 45,
  },

  // --- 5 IN PROGRESS TASKS ---
  {
    id: 'task-4',
    title: 'Complete Database Systems Assignment',
    description: 'Formulate complex multi-table SQL joins and verify indexed query execution plans.',
    category: 'Database Systems',
    dueDate: '2026-11-10',
    dueTime: '23:59',
    priority: 'High',
    status: 'In Progress',
    createdAt: '2026-11-05',
    estimatedMinutes: 120,
  },
  {
    id: 'task-5',
    title: 'Prepare UI/UX Presentation',
    description: 'Finalize Figma design tokens and record 5-minute interactive user flow walkthrough.',
    category: 'UI/UX Design',
    dueDate: '2026-11-11',
    dueTime: '14:00',
    priority: 'High',
    status: 'In Progress',
    createdAt: '2026-11-06',
    estimatedMinutes: 180,
  },
  {
    id: 'task-6',
    title: 'Study for Software Engineering Quiz',
    description: 'Review structural design patterns: Adapter, Decorator, Facade, and Observer patterns.',
    category: 'Software Engineering',
    dueDate: '2026-11-12',
    dueTime: '10:30',
    priority: 'Medium',
    status: 'In Progress',
    createdAt: '2026-11-07',
    estimatedMinutes: 90,
  },
  {
    id: 'task-7',
    title: 'Review Web Programming Materials',
    description: 'Read chapter on React 19 server actions, hook state lifecycle, and hydration debugging.',
    category: 'Web Programming',
    dueDate: '2026-11-10',
    dueTime: '20:00',
    priority: 'Medium',
    status: 'In Progress',
    createdAt: '2026-11-08',
    estimatedMinutes: 60,
  },
  {
    id: 'task-8',
    title: 'Implement Dijkstra Shortest Path in Java',
    description: 'Write adjacency list graph representation with priority queue edge relaxation.',
    category: 'Data Structures',
    dueDate: '2026-11-14',
    dueTime: '23:59',
    priority: 'High',
    status: 'In Progress',
    createdAt: '2026-11-08',
    estimatedMinutes: 150,
  },

  // --- 16 COMPLETED TASKS ---
  {
    id: 'task-9',
    title: 'Install PostgreSQL and PgAdmin on Dev Machine',
    description: 'Configure local server instance and create sample academic schema with foreign keys.',
    category: 'Database Systems',
    dueDate: '2026-10-20',
    dueTime: '17:00',
    priority: 'Low',
    status: 'Completed',
    createdAt: '2026-10-18',
    completedAt: '2026-10-20T16:30:00',
  },
  {
    id: 'task-10',
    title: 'SQL DDL and Constraints Problem Set',
    description: 'Complete practice problem sets on primary keys, cascades, and check constraints.',
    category: 'Database Systems',
    dueDate: '2026-10-25',
    dueTime: '23:59',
    priority: 'Medium',
    status: 'Completed',
    createdAt: '2026-10-22',
    completedAt: '2026-10-25T21:15:00',
  },
  {
    id: 'task-11',
    title: 'Setup Vite and Tailwind CSS Workspace',
    description: 'Initialize clean frontend environment with TypeScript configurations and aliases.',
    category: 'Web Programming',
    dueDate: '2026-10-22',
    dueTime: '12:00',
    priority: 'Medium',
    status: 'Completed',
    createdAt: '2026-10-19',
    completedAt: '2026-10-21T18:00:00',
  },
  {
    id: 'task-12',
    title: 'Build Responsive Flexbox & Grid Portfolio',
    description: 'Code mobile-first navigation bar with collapsible menu and card grid layout.',
    category: 'Web Programming',
    dueDate: '2026-10-28',
    dueTime: '23:59',
    priority: 'High',
    status: 'Completed',
    createdAt: '2026-10-24',
    completedAt: '2026-10-28T22:10:00',
  },
  {
    id: 'task-13',
    title: 'REST API Fetch and Error Boundary Lab',
    description: 'Connect client to mock universities API with loading states and retry handler.',
    category: 'Web Programming',
    dueDate: '2026-11-03',
    dueTime: '18:00',
    priority: 'Medium',
    status: 'Completed',
    createdAt: '2026-11-01',
    completedAt: '2026-11-03T16:45:00',
  },
  {
    id: 'task-14',
    title: 'Git Branching & Merge Conflicts Simulation',
    description: 'Participate in classroom team git conflict resolution exercise and pull request reviews.',
    category: 'Software Engineering',
    dueDate: '2026-10-24',
    dueTime: '16:00',
    priority: 'Low',
    status: 'Completed',
    createdAt: '2026-10-20',
    completedAt: '2026-10-24T15:20:00',
  },
  {
    id: 'task-15',
    title: 'Write Unit Tests for Student Registration Module',
    description: 'Achieve 85% branch coverage using Jest mocking and assertions for course enrollment.',
    category: 'Software Engineering',
    dueDate: '2026-10-30',
    dueTime: '23:59',
    priority: 'High',
    status: 'Completed',
    createdAt: '2026-10-26',
    completedAt: '2026-10-30T20:40:00',
  },
  {
    id: 'task-16',
    title: 'Agile User Persona and User Journey Mapping',
    description: 'Define primary student and professor personas with empathy maps and pain points.',
    category: 'UI/UX Design',
    dueDate: '2026-10-21',
    dueTime: '15:00',
    priority: 'Medium',
    status: 'Completed',
    createdAt: '2026-10-17',
    completedAt: '2026-10-21T14:10:00',
  },
  {
    id: 'task-17',
    title: 'Low-Fidelity Wireframes for Mobile LMS App',
    description: 'Sketch 12 key viewports focusing on course dashboard, syllabus, and assignment inbox.',
    category: 'UI/UX Design',
    dueDate: '2026-10-27',
    dueTime: '23:59',
    priority: 'High',
    status: 'Completed',
    createdAt: '2026-10-23',
    completedAt: '2026-10-27T19:30:00',
  },
  {
    id: 'task-18',
    title: 'Heuristic Usability Evaluation Report',
    description: 'Evaluate university registration portal against Nielsen 10 Usability Heuristics.',
    category: 'UI/UX Design',
    dueDate: '2026-11-04',
    dueTime: '23:59',
    priority: 'Medium',
    status: 'Completed',
    createdAt: '2026-10-31',
    completedAt: '2026-11-04T22:00:00',
  },
  {
    id: 'task-19',
    title: 'Array and Linked List Memory Benchmarking',
    description: 'Profile sequential vs pointer-based traversal cache miss rates in C++.',
    category: 'Data Structures',
    dueDate: '2026-10-18',
    dueTime: '18:00',
    priority: 'Medium',
    status: 'Completed',
    createdAt: '2026-10-15',
    completedAt: '2026-10-18T17:15:00',
  },
  {
    id: 'task-20',
    title: 'Stack & Queue Expression Evaluator',
    description: 'Construct infix to postfix converter and postfix arithmetic calculation stack.',
    category: 'Data Structures',
    dueDate: '2026-10-26',
    dueTime: '23:59',
    priority: 'High',
    status: 'Completed',
    createdAt: '2026-10-22',
    completedAt: '2026-10-26T21:40:00',
  },
  {
    id: 'task-21',
    title: 'Binary Search Tree Recursive Deletion Lab',
    description: 'Handle leaf node, single child, and in-order successor two-child deletion cases.',
    category: 'Data Structures',
    dueDate: '2026-11-02',
    dueTime: '23:59',
    priority: 'High',
    status: 'Completed',
    createdAt: '2026-10-29',
    completedAt: '2026-11-02T23:10:00',
  },
  {
    id: 'task-22',
    title: 'Midterm Exam Review & Formula Summary Sheet',
    description: 'Condense asymptotic bounds for sorting algorithms (QuickSort, MergeSort, HeapSort).',
    category: 'Data Structures',
    dueDate: '2026-11-05',
    dueTime: '11:00',
    priority: 'High',
    status: 'Completed',
    createdAt: '2026-11-01',
    completedAt: '2026-11-05T09:30:00',
  },
  {
    id: 'task-23',
    title: 'Relational Normalization 1NF to BCNF Exercises',
    description: 'Decompose schemas using functional dependency closures and lossless join tests.',
    category: 'Database Systems',
    dueDate: '2026-11-07',
    dueTime: '23:59',
    priority: 'Medium',
    status: 'Completed',
    createdAt: '2026-11-03',
    completedAt: '2026-11-07T20:15:00',
  },
  {
    id: 'task-24',
    title: 'CI Pipeline GitHub Actions Configuration',
    description: 'Write workflow yaml to run linter, build check, and test suite on push to main.',
    category: 'Software Engineering',
    dueDate: '2026-11-09',
    dueTime: '17:00',
    priority: 'Medium',
    status: 'Completed',
    createdAt: '2026-11-05',
    completedAt: '2026-11-09T16:00:00',
  },
];

// Storage helpers
const STORAGE_KEYS = {
  TASKS: 'studyflow_tasks_v1',
  CATEGORIES: 'studyflow_categories_v1',
  PROFILE: 'studyflow_profile_v1',
};

export function getStoredTasks(): Task[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.TASKS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(INITIAL_TASKS));
      return INITIAL_TASKS;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to read tasks from localStorage', err);
    return INITIAL_TASKS;
  }
}

export function saveStoredTasks(tasks: Task[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
  } catch (err) {
    console.error('Failed to save tasks to localStorage', err);
  }
}

export function getStoredCategories(): Category[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(INITIAL_CATEGORIES));
      return INITIAL_CATEGORIES;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to read categories from localStorage', err);
    return INITIAL_CATEGORIES;
  }
}

export function saveStoredCategories(categories: Category[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
  } catch (err) {
    console.error('Failed to save categories to localStorage', err);
  }
}

export function getStoredProfile(): UserProfile {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PROFILE);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(INITIAL_USER_PROFILE));
      return INITIAL_USER_PROFILE;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to read profile from localStorage', err);
    return INITIAL_USER_PROFILE;
  }
}

export function saveStoredProfile(profile: UserProfile): void {
  try {
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
  } catch (err) {
    console.error('Failed to save profile to localStorage', err);
  }
}

export function resetToSampleData(): { tasks: Task[]; categories: Category[]; profile: UserProfile } {
  localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(INITIAL_TASKS));
  localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(INITIAL_CATEGORIES));
  localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(INITIAL_USER_PROFILE));
  return {
    tasks: INITIAL_TASKS,
    categories: INITIAL_CATEGORIES,
    profile: INITIAL_USER_PROFILE,
  };
}
