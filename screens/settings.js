// Settings.js
import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet, TextInput } from 'react-native';
import { useDarkMode } from '../components/darkModeContext';

const Settings = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [stepGoal, setStepGoal] = useState('10000');

  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      <Text style={[styles.label, isDarkMode && styles.darkText]}>
        Enable Dark Mode
      </Text>
      <Switch
        value={isDarkMode}
        onValueChange={toggleDarkMode}
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={isDarkMode ? '#f5dd4b' : '#f4f3f4'}
        style={styles.switch}
      />
      <Text style={[styles.label, isDarkMode && styles.darkText]}>
        Step Goal Per Day
      </Text>
      <TextInput
        style={[styles.input, isDarkMode && styles.darkInput]}
        onChangeText={setStepGoal}
        value={stepGoal}
        keyboardType="number-pad"
        placeholder="Enter your step goal"
        placeholderTextColor={isDarkMode ? '#ddd' : '#aaa'}
      />
    </View>
  );
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    padding: 20,
  },
  darkContainer: {
    backgroundColor: '#333',
  },
  label: {
    fontSize: 18,
    color: 'black',
    marginTop: 16,
    marginLeft: 16,
  },
  switch: {
    alignSelf: 'flex-start',
    marginLeft: 16,
    marginVertical: 16,
  },
  input: {
    fontSize: 18,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginTop: 8,
    marginHorizontal: 16,
    backgroundColor: 'white',
  },
  darkInput: {
    backgroundColor: '#555',
    borderColor: '#999',
    color: 'white',
  },
  darkText: {
    color: 'white',
  },
});

export default Settings;
