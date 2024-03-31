// Home.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { parseISO, format } from 'date-fns';

import { useDarkMode } from '../components/darkModeContext'; 

const STEPS_DATA_FILE_URI = FileSystem.documentDirectory + 'stepsData.json';

export default function HomeScreen() {
  const [stepsData, setStepsData] = useState([]);
  const [currentWeekIndex, setCurrentWeekIndex] = useState(0);
  const { isDarkMode } = useDarkMode();

  useEffect(() => {
    const loadStepsData = async () => {
      try {
        const fileInfo = await FileSystem.getInfoAsync(STEPS_DATA_FILE_URI);
        if (fileInfo.exists) {
          const rawData = await FileSystem.readAsStringAsync(STEPS_DATA_FILE_URI);
          const data = JSON.parse(rawData);
          setStepsData(data);
          setCurrentWeekIndex(data.length - 1);
        }
      } catch (error) {
        console.error('Error loading steps data:', error);
      }
    };

    loadStepsData();
  }, []);

  const chartData = {
    labels: stepsData[currentWeekIndex]?.days ? Object.keys(stepsData[currentWeekIndex].days).map(day => format(parseISO(day), 'EEE')) : [],
    datasets: [{
      data: stepsData[currentWeekIndex]?.days ? Object.values(stepsData[currentWeekIndex].days) : []
    }]
  };

  const chartConfig = {
    backgroundGradientFrom: isDarkMode ? '#333' : '#fff',
    backgroundGradientTo: isDarkMode ? '#333' : '#fff',
    color: (opacity = 1) => `rgba(${isDarkMode ? '255, 255, 255' : '0, 0, 0'}, ${opacity})`,
    barPercentage: 0.5,
    fillShadowGradient: `${isDarkMode ? '#ffffff' : '#000000'}`,
    fillShadowGradientOpacity: 1,
  };

  const screenWidth = Dimensions.get('window').width;

  return (
    <View style={[styles.container, isDarkMode ? styles.darkContainer : {}]}>
      <Text style={[styles.header, isDarkMode ? styles.darkText : {}]}>Steps</Text>
      <BarChart
        data={chartData}
        width={screenWidth}
        height={220}
        yAxisLabel=""
        chartConfig={chartConfig}
        fromZero
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  darkContainer: {
    backgroundColor: '#333',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  darkText: {
    color: '#ffffff',
  }
});
