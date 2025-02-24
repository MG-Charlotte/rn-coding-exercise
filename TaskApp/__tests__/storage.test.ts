import AsyncStorage from '@react-native-async-storage/async-storage';
import { loadTasksFromStorage, saveTasksToStorage } from '../services/storage';
import { Task } from '../types'; // Ensure this path is correct

jest.mock('@react-native-async-storage/async-storage');

const storageKey = 'tasks';
const mockTasks: Task[] = [
  { id: 1, text: 'Buy groceries', completed: false },
  { id: 2, text: 'Walk the dog', completed: false },
];

describe('Storage Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should load tasks from storage', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(JSON.stringify(mockTasks));
    const tasks = await loadTasksFromStorage(storageKey);
    expect(tasks).toEqual(mockTasks);
  });

  it('should return null if no tasks are found in storage', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);
    const tasks = await loadTasksFromStorage(storageKey);
    expect(tasks).toBeNull();
  });

  it('should save tasks to storage', async () => {
    await saveTasksToStorage(storageKey, mockTasks);
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(storageKey, JSON.stringify(mockTasks));
  });

  it('should handle errors when loading tasks from storage', async () => {
    (AsyncStorage.getItem as jest.Mock).mockRejectedValue(new Error('Storage error'));
    const tasks = await loadTasksFromStorage(storageKey);
    expect(tasks).toBeNull();
  });

  it('should handle errors when saving tasks to storage', async () => {
    (AsyncStorage.setItem as jest.Mock).mockRejectedValue(new Error('Storage error'));
    await saveTasksToStorage(storageKey, mockTasks);
    expect(console.error).toHaveBeenCalledWith('Error saving tasks to storage:', expect.any(Error));
  });
});
