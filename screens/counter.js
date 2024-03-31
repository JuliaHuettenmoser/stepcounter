import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, SafeAreaView, Button } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import * as FileSystem from 'expo-file-system';
import { format, startOfWeek } from 'date-fns';
import AsyncStorage from '@react-native-async-storage/async-storage';
import "firebase/database";

import { useDarkMode } from '../components/darkModeContext';

const STEPS_DATA_FILE_URI = '../stepsData.json';

async function ensureDirExists(dirPath) {
  const dirInfo = await FileSystem.getInfoAsync(dirPath);
  if (!dirInfo.exists) {
    console.log("Directory doesn't exist, creating...");
    await FileSystem.makeDirectoryAsync(dirPath, { intermediates: true });
  }
}

async function saveStepsToStorage(currentDate, steps) {
  try {
    const fileInfo = await FileSystem.getInfoAsync(STEPS_DATA_FILE_URI);
    let stepsData = fileInfo.exists ? JSON.parse(await FileSystem.readAsStringAsync(STEPS_DATA_FILE_URI)) : [];

    if (!Array.isArray(stepsData)) {
      stepsData = [];
    }

    let currentDay = stepsData.find(day => day.date === currentDate);
    if (!currentDay) {
      currentDay = { date: currentDate, steps: 0 };
      stepsData.push(currentDay);
    }

    currentDay.steps += steps;

    await FileSystem.writeAsStringAsync(STEPS_DATA_FILE_URI, JSON.stringify(stepsData, null, 2));
    console.log('Steps data saved successfully!');

  } catch (error) {
    console.error('Error writing steps data to file:', error);
  }
}

export default function StepCounter() {
  const [steps, setSteps] = useState(0);
  const { isDarkMode } = useDarkMode();

  useEffect(() => {
    let lastReadingTimestamp = 0;
    const subscription = Accelerometer.addListener(accelerometerData => {
      const now = Date.now();
      if (now - lastReadingTimestamp >= 500 && Math.abs(accelerometerData.x) > 0.5) {
        lastReadingTimestamp = now;
        setSteps(prev => prev + 1);
      }
    });

    Accelerometer.setUpdateInterval(500);

    return () => subscription.remove();
  }, []);

  const handleSaveSteps = () => {
    const currentDate = format(new Date(), 'yyyy-MM-dd');
    saveStepsToStorage(currentDate, steps);
    alert('Steps saved successfully!');
  };

  const dynamicStyles = getStyles(isDarkMode);

  return (
    <SafeAreaView style={dynamicStyles.container}>
      <Text style={dynamicStyles.text}>Steps: {steps}</Text>
      <Text style={dynamicStyles.text}>Burnt calories: {steps * 0.04}</Text>
      <Button title="Save Today's Steps Now" onPress={handleSaveSteps} />
    </SafeAreaView>
  );
}

const getStyles = (isDarkMode) => StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: isDarkMode ? '#333' : '#FFFFFF',
  },
  text: {
    fontSize: 20,
    color: isDarkMode ? '#FFFFFF' : '#121212',
    marginBottom: 20
  }
});