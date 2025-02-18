// src/components/TaskList.tsx
import React from 'react';
import { FlatList } from 'react-native';
import { Task } from '../types';
import TaskItem from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  onToggleTask: (id: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggleTask }) => {
  const renderItem = ({ item }: { item: Task }) => (
    <TaskItem task={item} onToggle={() => onToggleTask(item.id)} />
  );

  return (
    <FlatList
      data={tasks}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

export default TaskList;
