import React, { useState } from 'react';
import Header from '../components/header';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet, Alert, Platform } from 'react-native';

const generateUniqueId = () => {
  return '_' + Math.random().toString(36).substr(2, 9);
};

export default function Component() {
  const [tasks, setTasks] = useState([
    { id: generateUniqueId(), text: "Gather Patient Information", completed: false },
    { id: generateUniqueId(), text: "Sign Service Agreement", completed: false },
    { id: generateUniqueId(), text: "Confirm Departure Information", completed: false },
    { id: generateUniqueId(), text: "Confirm Arrival Information", completed: false },
  ]);
  const [newTask, setNewTask] = useState("");
  const [editingTask, setEditingTask] = useState(null);

  const handleTaskCompletion = (id) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)));
  };

  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { id: generateUniqueId(), text: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const handleEditTask = (task) => {
    setNewTask(task.text);
    setEditingTask(task.id);
  };

  const handleSaveEdit = () => {
    setTasks(tasks.map((task) => (task.id === editingTask ? { ...task, text: newTask } : task)));
    setNewTask("");
    setEditingTask(null);
  };

  const handleDeleteTask = (id) => {
    if (Platform.OS === 'web') {
      if (window.confirm("Are you sure you want to delete this task?")) {
        setTasks(tasks.filter((task) => task.id !== id));
      }
    } else {
      Alert.alert("Delete Task", "Are you sure you want to delete this task?", [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            setTasks(tasks.filter((task) => task.id !== id));
          },
        },
      ]);
    }
  };

  const CustomCheckbox = ({ isChecked, onPress }) => (
    <TouchableOpacity onPress={onPress} style={styles.checkboxContainer}>
      <View style={[styles.checkbox, isChecked && styles.checkboxChecked]}>
        {isChecked && <Text style={styles.checkmark}>✔</Text>}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.main}>
        <View style={styles.card}>
          <Text style={styles.title}>Trip Checklist</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Add a new task"
              value={newTask}
              onChangeText={setNewTask}
              onSubmitEditing={editingTask !== null ? handleSaveEdit : handleAddTask}
            />
            <Button title={editingTask !== null ? "Save" : "Add"} onPress={editingTask !== null ? handleSaveEdit : handleAddTask} />
          </View>
          <FlatList
            data={tasks}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.taskContainer}>
                <CustomCheckbox
                  isChecked={item.completed}
                  onPress={() => handleTaskCompletion(item.id)}
                />
                <Text style={[styles.taskText, item.completed && styles.taskCompleted]}>
                  {item.text}
                </Text>
                <TouchableOpacity onPress={() => handleEditTask(item)}>
                  <Text style={styles.editButton}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDeleteTask(item.id)}>
                  <Text style={styles.deleteButton}>Delete</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7fafc',
    justifyContent: 'start',
  },
  main: {
    flex: 1,
    padding: 16,
    alignContent: 'center',
    backgroundColor: '#f0f0f0',
  },
  card: {
    alignSelf: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  backButton: {
    marginBottom: 10,
  },
  backButtonText: {
    color: '#3182ce',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    borderColor: '#e2e8f0',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#edf2f7',
    borderRadius: 5,
    padding: 8,
    marginBottom: 10,
  },
  taskText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  taskCompleted: {
    textDecorationLine: 'line-through',
    color: '#a0aec0',
  },
  checkboxContainer: {
    marginRight: 10,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#4A5568',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#4A5568',
  },
  checkmark: {
    color: '#ffffff',
  },
  editButton: {
    color: '#3182ce',
    marginLeft: 10,
  },
  deleteButton: {
    color: '#e53e3e',
    marginLeft: 10,
  },
});
