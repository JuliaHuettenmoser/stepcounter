import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';
import { useDarkMode } from '../components/darkModeContext';
import stepsData from "../stepsData.json"

const HomeScreen = () => {
  const { isDarkMode } = useDarkMode();

  const biggestValue = Math.max(...stepsData.map(item => item.steps));

  const chartData = stepsData.map((item, index) => ({
    value: item.steps,
    label: item.date,
    frontColor: isDarkMode ? '#76a6ef' : '#007aff',
    topLabelComponent: () => (
      <Text style={[styles.topLabelText, { color: isDarkMode ? '#fff' : '#000' }]}>
        {item.steps}
      </Text>
    ),
  }));

  const chartConfig = {
    backgroundGradientFrom: isDarkMode ? '#303030' : '#f0faff',
    backgroundGradientTo: isDarkMode ? '#303030' : '#f0faff',
    color: () => (isDarkMode ? '#ffffff' : '#000000'),
  };

  return (
    <View style={[styles.container, isDarkMode ? styles.darkContainer : {}]}>
      <BarChart
        data={chartData}
        width={Dimensions.get('window').width - 32}
        height={300}
        chartConfig={chartConfig}
        yAxisInterval={1}
        yAxisTextNumberOfLines={2}
        fromZero
        formatYLabel = {(label) => {
          const labelVal = Number(label);
          if(labelVal >=1000000) return (labelVal/1000000).toFixed(0) + 'M';
          if(labelVal >= 1000) return (labelVal/1000).toFixed(0) + 'K';
          return label;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  darkContainer: {
    backgroundColor: '#303030',
  },
  topLabelText: {
    fontSize: 10,
  },
});

export default HomeScreen;