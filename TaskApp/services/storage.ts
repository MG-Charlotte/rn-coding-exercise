// src/services/storage.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task } from '../types';

export const loadTasksFromStorage = async (storageKey: string): Promise<Task[] | null> => {
  try {
    const storedTasks = await AsyncStorage.getItem(storageKey);
    return storedTasks ? JSON.parse(storedTasks) : null;
  } catch (error) {
    console.error('Error reading tasks from storage:', error);
    return null;
  }
};

export const saveTasksToStorage = async (storageKey: string, tasks: Task[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(storageKey, JSON.stringify(tasks));
  } catch (error) {
    console.error('Error saving tasks to storage:', error);
  }
};
