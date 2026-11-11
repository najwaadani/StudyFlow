import test from 'node:test';
import assert from 'node:assert/strict';
import { 
  computeTaskStatistics, 
  isTaskOverdue, 
  formatDeadlineRelative, 
  filterAndSortTasks, 
  computeCategorySummaries 
} from './taskUtils';
import { Task, Category } from '../types';

const mockTasks: Task[] = [
  {
    id: 't-1',
    title: 'Complete Database Systems Assignment',
    description: 'Design ER diagram and write SQL queries',
    category: 'Database Systems',
    dueDate: '2026-11-10',
    dueTime: '23:59',
    priority: 'High',
    status: 'In Progress',
    createdAt: '2026-11-01',
  },
  {
    id: 't-2',
    title: 'Review Web Programming Materials',
    description: 'React components and hooks review',
    category: 'Web Programming',
    dueDate: '2026-11-08',
    dueTime: '12:00',
    priority: 'Medium',
    status: 'Pending', // Overdue relative to 2026-11-10
    createdAt: '2026-11-02',
  },
  {
    id: 't-3',
    title: 'Prepare UI/UX Presentation',
    description: 'Figma prototype presentation',
    category: 'UI/UX Design',
    dueDate: '2026-11-05',
    dueTime: '10:00',
    priority: 'High',
    status: 'Completed',
    createdAt: '2026-10-30',
    completedAt: '2026-11-04',
  },
  {
    id: 't-4',
    title: 'Study for Software Engineering Quiz',
    description: 'Agile methodologies and design patterns',
    category: 'Software Engineering',
    dueDate: '2026-11-15',
    dueTime: '14:00',
    priority: 'Low',
    status: 'Pending',
    createdAt: '2026-11-03',
  },
];

const mockCategories: Category[] = [
  {
    id: 'c-1',
    name: 'Database Systems',
    code: 'CS-301',
    color: '#2563EB',
    description: 'Relational databases and SQL',
  },
  {
    id: 'c-2',
    name: 'UI/UX Design',
    code: 'UX-105',
    color: '#059669',
    description: 'Design thinking and Figma',
  },
];

test('computeTaskStatistics calculates accurate totals and rates', () => {
  const refDate = new Date('2026-11-10T12:00:00');
  const stats = computeTaskStatistics(mockTasks, refDate);

  assert.equal(stats.total, 4);
  assert.equal(stats.completed, 1);
  assert.equal(stats.inProgress, 1);
  assert.equal(stats.overdue, 1); // t-2 is overdue
  assert.equal(stats.completionRate, 25);
});

test('isTaskOverdue detects overdue pending tasks and ignores completed', () => {
  const refDate = new Date('2026-11-10T12:00:00');
  assert.equal(isTaskOverdue(mockTasks[1], refDate), true); // Nov 8 pending is overdue
  assert.equal(isTaskOverdue(mockTasks[2], refDate), false); // Nov 5 completed is NOT overdue
  assert.equal(isTaskOverdue(mockTasks[3], refDate), false); // Nov 15 is upcoming
});

test('formatDeadlineRelative handles today, tomorrow, and overdue', () => {
  const refDate = new Date('2026-11-10T08:00:00');
  
  const todayResult = formatDeadlineRelative('2026-11-10', '23:59', refDate);
  assert.equal(todayResult.isToday, true);
  assert.equal(todayResult.isOverdue, false);

  const overdueResult = formatDeadlineRelative('2026-11-08', '12:00', refDate);
  assert.equal(overdueResult.isOverdue, true);

  const futureResult = formatDeadlineRelative('2026-11-15', '14:00', refDate);
  assert.equal(futureResult.isOverdue, false);
  assert.ok(futureResult.daysRemaining > 0);
});

test('filterAndSortTasks correctly filters by search keyword and category', () => {
  const searchResults = filterAndSortTasks(mockTasks, { searchQuery: 'database' });
  assert.equal(searchResults.length, 1);
  assert.equal(searchResults[0].id, 't-1');

  const categoryResults = filterAndSortTasks(mockTasks, { categoryFilter: 'UI/UX Design' });
  assert.equal(categoryResults.length, 1);
  assert.equal(categoryResults[0].id, 't-3');
});

test('computeCategorySummaries aggregates course progress metrics', () => {
  const summaries = computeCategorySummaries(mockCategories, mockTasks);
  assert.equal(summaries.length, 2);

  const dbSummary = summaries.find((s) => s.category.name === 'Database Systems');
  assert.ok(dbSummary);
  assert.equal(dbSummary.totalTasks, 1);
  assert.equal(dbSummary.completedTasks, 0);
  assert.equal(dbSummary.inProgressTasks, 1);
  assert.equal(dbSummary.progressPercent, 0);

  const uxSummary = summaries.find((s) => s.category.name === 'UI/UX Design');
  assert.ok(uxSummary);
  assert.equal(uxSummary.totalTasks, 1);
  assert.equal(uxSummary.completedTasks, 1);
  assert.equal(uxSummary.progressPercent, 100);
});
