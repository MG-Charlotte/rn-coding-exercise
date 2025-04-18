// src/services/api.ts
import { Task } from '../types';

const MOCK_API_DELAY = 1000;

/**
 * Fetches tasks from the API.
 * @returns {Promise<Task[]>} - A promise that resolves to the fetched tasks.
 */
export const fetchTasksFromAPI = (): Promise<Task[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const initialTasks: Task[] = [
        { id: 1, text: 'Buy groceries', completed: false },
        { id: 2, text: 'Walk the dog', completed: false },
        { id: 3, text: 'Do laundry', completed: false },
      ];
      resolve(initialTasks);
    }, MOCK_API_DELAY);
  });
};

/**
 * Updates tasks on the API.
 * @param {Task[]} tasks - The tasks to be updated.
 * @returns {void}
 */
export const updateTasksOnAPI = (tasks: Task[]): void => {
  setTimeout(() => {
    console.log('Tasks updated on server:', tasks);
  }, MOCK_API_DELAY);
};
