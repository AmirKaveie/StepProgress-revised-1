import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, Button, StyleSheet } from 'react-native';

const Stack = createNativeStackNavigator();

const ProgressBar = ({ progress }) => (
  <View style={styles.progressBarContainer}>
    <View style={[styles.progressBar, { width: `${progress * 100}%` }]} />
  </View>
);

const StepScreen = ({ navigation, route }) => {
  const { stepIndex, totalSteps } = route.params;
  const progress = (stepIndex + 1) / totalSteps;

  const nextRouteName = stepIndex < totalSteps - 1 ? `Step${stepIndex + 2}` : null;
  const prevRouteName = stepIndex > 0 ? `Step${stepIndex}` : null;

  return (
    <View style={styles.container}>
      <ProgressBar progress={progress} />
      <Text style={styles.title}>Step {stepIndex + 1}</Text>
      {prevRouteName && (
        <Button
          title="Previous"
          onPress={() => navigation.navigate(prevRouteName, { stepIndex: stepIndex - 1, totalSteps })}
        />
      )}
      {nextRouteName && (
        <Button
          title="Next"
          onPress={() => navigation.navigate(nextRouteName, { stepIndex: stepIndex + 1, totalSteps })}
        />
      )}
    </View>
  );
};

const App = () => {
  const totalSteps = 4;

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {[...Array(totalSteps)].map((_, index) => (
          <Stack.Screen
            key={index}
            name={`Step${index + 1}`}
            component={StepScreen}
            initialParams={{ stepIndex: index, totalSteps }}
            options={{ headerTitle: `Step ${index + 1}` }}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginVertical: 20,
  },
  progressBarContainer: {
    height: 10,
    width: '80%',
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    marginVertical: 20,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#3b5998',
    borderRadius: 5,
  },
});

export default App;
