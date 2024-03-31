// Counter.js
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, SafeAreaView } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import * as FileSystem from 'expo-file-system';
import { format, startOfWeek } from 'date-fns';
import { useDarkMode } from '../components/darkModeContext'; 

const STEPS_DATA_FILE_URI = FileSystem.documentDirectory + 'stepsData.json';

const getCurrentWeekStart = () => format(startOfWeek(new Date(), { weekStartsOn: 1 }), 'yyyy-MM-dd');

async function saveStepsToStorage(steps) {
  const currentDate = format(new Date(), 'yyyy-MM-dd');
  const weekStart = getCurrentWeekStart();
  try {
    let stepsData = [];
    const fileInfo = await FileSystem.getInfoAsync(STEPS_DATA_FILE_URI);
    if (fileInfo.exists) {
      const existingData = await FileSystem.readAsStringAsync(STEPS_DATA_FILE_URI);
      stepsData = JSON.parse(existingData);
    }

    let currentWeek = stepsData.find(week => week.weekStart === weekStart);
    if (!currentWeek) {
      currentWeek = { weekStart, days: {} };
      stepsData.push(currentWeek);
    }

    currentWeek.days[currentDate] = steps;

    await FileSystem.writeAsStringAsync(STEPS_DATA_FILE_URI, JSON.stringify(stepsData));
  } catch (error) {
    console.error('Error saving steps to file:', error);
  }
}

export default function StepCounter() {
  const [steps, setSteps] = useState(0);
  const { isDarkMode } = useDarkMode();

  useEffect(() => {
    let lastReadingTimestamp = 0;
    const subscription = Accelerometer.addListener(accelerometerData => {
      const now = Date.now();
      if (now - lastReadingTimestamp >= 1000 && Math.abs(accelerometerData.x) > 0.5) {
        lastReadingTimestamp = now;
        setSteps(prev => prev + 1);
      }
    });

    Accelerometer.setUpdateInterval(1000);

    return () => subscription.remove();
  }, []);

  useEffect(() => {
    saveStepsToStorage(steps);
  }, [steps]);

  const dynamicStyles = getStyles(isDarkMode);

  return (
    <SafeAreaView style={dynamicStyles.container}>
      <Text style={dynamicStyles.text}>Steps: {steps}</Text>
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
  }
});
