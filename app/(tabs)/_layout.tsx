import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ImageBackground } from 'react-native';

export default function TabLayout() {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (!isActive && time !== 0) {
      clearInterval(interval!);
    }
    return () => clearInterval(interval!);
  }, [isActive, time]);

  const handleStartStop = () => {
    setIsActive(!isActive);
  };

  const handleReset = () => {
    setIsActive(false);
    setTime(0);
  };

  const formatTime = (time: number) => {
    const getMilliseconds = `0${(time % 1000) / 10}`.slice(-2);
    const seconds = Math.floor(time / 1000);
    const getSeconds = `0${seconds % 60}`.slice(-2);
    const minutes = Math.floor(seconds / 60);
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(minutes / 60)}`.slice(-2);
    return `${getHours}:${getMinutes}:${getSeconds}.${getMilliseconds}`;
  };

  return (
    <ImageBackground source={{ uri: 'https://img.freepik.com/premium-photo/photo-sand-timer-with-beautiful-background-landscape_763111-17132.jpg' }} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Stopwatch</Text>
        <View style={styles.timerContainer}>
          <Text style={styles.timer}>{formatTime(time)}</Text>
          <View style={styles.buttonRow}>
            <View style={styles.buttonContainer}>
              <Button onPress={handleStartStop} title={isActive ? 'Stop' : 'Start'} />
            </View>
            <View style={styles.buttonContainer}>
              <Button onPress={handleReset} title="Reset" />
            </View>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 50,
    marginBottom: 20,
  },
  timerContainer: {
    alignItems: 'center',
  },
  timer: {
    fontSize: 48,
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 20,
    margin: 10,
    width: '90%',
  },
  buttonContainer: {
    padding: 10,
    height: 60, // Increased height
    width: 150, // Increased width
  },
});
