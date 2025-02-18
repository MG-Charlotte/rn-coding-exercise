// src/screens/HomeScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Task } from '../types';
import TaskList from '../components/TaskList';
import { fetchTasksFromAPI, updateTasksOnAPI } from '../services/api';
import { loadTasksFromStorage, saveTasksToStorage } from '../services/storage';

const STORAGE_KEY = 'TASKS';

export default function HomeScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  // Load tasks on mount
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const storedTasks = await loadTasksFromStorage(STORAGE_KEY);
        if (storedTasks) {
          setTasks(storedTasks);
          setLoading(false);
        } else {
          const apiTasks = await fetchTasksFromAPI();
          setTasks(apiTasks);
          await saveTasksToStorage(STORAGE_KEY, apiTasks);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error loading tasks:', error);
        const apiTasks = await fetchTasksFromAPI();
        setTasks(apiTasks);
        await saveTasksToStorage(STORAGE_KEY, apiTasks);
        setLoading(false);
      }
    };
    loadTasks();
  }, []);

  // Save tasks to storage and simulate API update whenever tasks change
  useEffect(() => {
    const updateStorage = async () => {
      try {
        await saveTasksToStorage(STORAGE_KEY, tasks);
        updateTasksOnAPI(tasks);
      } catch (error) {
        console.error('Error saving tasks:', error);
      }
    };

    if (!loading) {
      updateStorage();
    }
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim().length === 0) return;
    const task: Task = {
      id: tasks.length + 1, // In production, use unique IDs!
      text: newTask,
      completed: false,
    };
    setTasks([...tasks, task]);
    setNewTask('');
  };

  // BUG: This function toggles 'isComplete' instead of the 'completed' property
  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, isComplete: !task.completed } : task
      )
    );
  };

  // MISSING FUNCTIONALITY: Implement deletion of tasks marked as completed.
  const deleteCompletedTasks = () => {
    // TODO: Remove all tasks where task.completed === true
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading tasks...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Task List</Text>
      <TaskList tasks={tasks} onToggleTask={toggleTask} />
      <TextInput
        style={styles.input}
        placeholder="Add new task..."
        value={newTask}
        onChangeText={setNewTask}
      />
      <TouchableOpacity style={styles.addButton} onPress={addTask}>
        <Text style={styles.buttonText}>Add Task</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.deleteButton} onPress={deleteCompletedTasks}>
        <Text style={styles.buttonText}>Delete Completed Tasks</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 50, backgroundColor: '#fff' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: { height: 40, borderColor: 'gray', borderWidth: 1, paddingHorizontal: 10, marginBottom: 10 },
  addButton: { backgroundColor: 'green', padding: 10, alignItems: 'center', marginBottom: 10 },
  deleteButton: { backgroundColor: 'red', padding: 10, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 18 },
});
