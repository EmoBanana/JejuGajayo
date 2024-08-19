import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import StoryScreen from './screens/StoryScreen';
import { getLocation } from './locationService';

const Stack = createStackNavigator();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isInJeju, setIsInJeju] = useState(false);
  const [hasSelectedItinerary, setHasSelectedItinerary] = useState(false);
  const [itinerary, setItinerary] = useState([]);

  useEffect(() => {
    const checkLocation = async () => {
      try {
        const location = await getLocation();
        setIsInJeju(location.isInJeju);
      } catch (error) {
        console.error('Error checking location:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkLocation();
  }, []);

  const handleTravelToJeju = () => {
    setIsInJeju(true);
  };

  const handleItinerarySelection = (selectedItinerary) => {
    setItinerary(selectedItinerary);
    setHasSelectedItinerary(true);
  };

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!isInJeju ? (
          <Stack.Screen name="Welcome">
            {({ navigation }) => (
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFACD' }}>
                <Text style={{ fontSize: 24, fontWeight: 'bold' }}>JejuGajayo</Text>
                <Text style={{ fontSize: 18, marginBottom: 20 }}>Your Interactive Travel Companion</Text>
                <Button
                  title="Start Exploring"
                  onPress={() => {
                    Alert.alert(
                      "Travel to Jeju Island",
                      "Travel to Jeju Island for An Amazing Experience. Your Journey Awaits!",
                      [
                        { text: "Cancel", style: "cancel" },
                        { text: "Travel to Jeju Island", onPress: handleTravelToJeju },
                      ]
                    );
                  }}
                />
              </View>
            )}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen name="Home">
              {() => <HomeScreen onSelectItinerary={handleItinerarySelection} />}
            </Stack.Screen>
            <Stack.Screen name="StoryScreen">
              {() => <StoryScreen itinerary={itinerary} />}
            </Stack.Screen>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
