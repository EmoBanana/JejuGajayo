import React, { useState } from 'react';
import { View, Text, Button, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CheckBox from 'expo-checkbox';

const attractions = [
  'Seongsan Ilchulbong', 'Hallasan', 'Jeju Folk Village', 'Jeju Stone Park' , 'Manjanggul Cave', 'Bijarim Forest', 'Snoopy Garden', 'Hamdeok Beach', 'Seopjikoji', 'Cheonjiyeon Waterfall', 'Hallim Park', 'Jeju ARTE MUSEUM', 'Osulloc Tea Museum'
];

const HomeScreen = ({ onSelectItinerary }) => {
  const [itinerary, setItinerary] = useState({});
  const navigation = useNavigation();

  const handleChange = (attraction) => {
    setItinerary(prev => ({
      ...prev,
      [attraction]: !prev[attraction]
    }));
  };

  const handleSubmit = () => {
    const selectedItinerary = Object.keys(itinerary).filter(attraction => itinerary[attraction]);
    onSelectItinerary(selectedItinerary); // Pass itinerary to App.js
    navigation.navigate('Personalized Interactive Experience', { itinerary: selectedItinerary }); // Navigate to Story screen
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Select the attractions you plan to visit:</Text>
      {attractions.map((attraction, index) => (
        <View key={index} style={styles.itemContainer}>
          <CheckBox
            value={itinerary[attraction] || false}
            onValueChange={() => handleChange(attraction)}
          />
          <Text style={styles.itemText}>{attraction}</Text>
        </View>
      ))}
      <Button title="Start Exploring" onPress={handleSubmit} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFF',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  itemText: {
    marginLeft: 8,
    fontSize: 16,
  },
});

export default HomeScreen;
