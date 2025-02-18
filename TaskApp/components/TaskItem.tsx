// src/components/TaskItem.tsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Task } from '../types';

interface TaskItemProps {
  task: Task;
  onToggle: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle }) => {
  return (
    <TouchableOpacity onPress={onToggle}>
      <Text style={[styles.taskText, task.completed && styles.completedTask]}>
        {task.text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  taskText: { fontSize: 18, paddingVertical: 10 },
  completedTask: { textDecorationLine: 'line-through', color: 'gray' },
});

export default TaskItem;
