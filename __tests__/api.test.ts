import { fetchTasksFromAPI, updateTasksOnAPI } from '../services/api';
import { Task } from '../types';

jest.useFakeTimers();

const mockTasks: Task[] = [
  { id: 1, text: 'Buy groceries', completed: false },
  { id: 2, text: 'Walk the dog', completed: false },
  { id: 3, text: 'Do laundry', completed: false },
];

describe('API Service', () => {
  it('should fetch tasks from API', async () => {
    const promise = fetchTasksFromAPI();
    jest.advanceTimersByTime(1000);
    const tasks = await promise;
    expect(tasks).toEqual(mockTasks);
  });

  it('should update tasks on API', () => {
    console.log = jest.fn();
    updateTasksOnAPI(mockTasks);
    jest.advanceTimersByTime(1000);
    expect(console.log).toHaveBeenCalledWith('Tasks updated on server:', mockTasks);
  });
});
