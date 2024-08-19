import React, { useState, useEffect } from 'react';
import { View, Text, Button, ScrollView, StyleSheet } from 'react-native';
import { getNearbySuggestions, getStorySegment } from '../api/upstage';

const StoryScreen = ({ route }) => {
  const { itinerary } = route.params || {}; // Ensure default value to avoid errors
  const [currentLocation, setCurrentLocation] = useState(null);
  const [story, setStory] = useState('');
  const [nearbySuggestions, setNearbySuggestions] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentLocation) {
      setLoading(true);
      fetchStoryData();
    }
  }, [currentLocation]);

  const fetchStoryData = async () => {
    try {
      const storySegment = await getStorySegment(currentLocation);
      const suggestion = await getNearbySuggestions(currentLocation, itinerary);

      setStory(storySegment || '');
      setNearbySuggestions(suggestion || '');
    } catch (error) {
      console.error('Error fetching story data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTravelToAttraction = () => {
    const randomAttraction = itinerary[Math.floor(Math.random() * itinerary.length)];
    setCurrentLocation(randomAttraction);
  };

  return (
    <ScrollView style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      ) : currentLocation ? (
        <>
          <Text style={styles.header}>Story for {currentLocation}</Text>
          <Text style={styles.content}>{story}</Text>
          <Text style={styles.subheader}>Nearby Suggestion</Text>
          <Text style={styles.suggestion}>{nearbySuggestions}</Text>
          <Button title="Travel to Another Attraction" onPress={handleTravelToAttraction} />
        </>
      ) : (
        <View style={styles.messageContainer}>
          <Text style={styles.message}>You will be notified when you visit selected attraction spots!</Text>
          <Button title="Travel to Attraction Spot" onPress={handleTravelToAttraction} />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  content: {
    fontSize: 16,
    marginBottom: 10,
  },
  subheader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  suggestion: {
    fontSize: 16,
    marginBottom: 5,
  },
  messageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  message: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  loadingText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default StoryScreen;
