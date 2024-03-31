// Settings.js
import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { useDarkMode } from '../components/darkModeContext'; 

const Settings = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      <Text style={[styles.text, isDarkMode && styles.darkText]}>
        Enable Dark Mode
      </Text>
      <Switch
        value={isDarkMode}
        onValueChange={toggleDarkMode}
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={isDarkMode ? '#f5dd4b' : '#f4f3f4'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  darkContainer: {
    backgroundColor: '#333',
  },
  text: {
    fontSize: 18,
    color: 'black',
  },
  darkText: {
    color: 'white',
  },
});

export default Settings;
