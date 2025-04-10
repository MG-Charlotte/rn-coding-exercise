// src/services/storage.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task } from '../types';

/**
 * Loads tasks from storage.
 * @param {string} storageKey - The key used to store the tasks.
 * @returns {Promise<Task[] | null>} - A promise that resolves to the tasks or null if not found.
 */
export const loadTasksFromStorage = async (storageKey: string): Promise<Task[] | null> => {
  try {
    const storedTasks = await AsyncStorage.getItem(storageKey);
    return storedTasks ? JSON.parse(storedTasks) : null;
  } catch (error) {
    console.error('Error reading tasks from storage:', error);
    return null;
  }
};

/**
 * Saves tasks to storage.
 * @param {string} storageKey - The key used to store the tasks.
 * @param {Task[]} tasks - The tasks to be stored.
 * @returns {Promise<void>} - A promise that resolves when the tasks are saved.
 */
export const saveTasksToStorage = async (storageKey: string, tasks: Task[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(storageKey, JSON.stringify(tasks));
  } catch (error) {
    console.error('Error saving tasks to storage:', error);
  }
};
