// locationService.js
import * as Location from 'expo-location';

export const getLocation = async () => {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    throw new Error('Permission to access location was denied');
  }

  let { coords } = await Location.getCurrentPositionAsync({});
  // Example Jeju coordinates
  const jejuCoordinates = {
    latitude: 33.4996,
    longitude: 126.5312,
  };

  // Determine if the current location is in Jeju (This is a simplified check)
  const isInJeju = Math.abs(coords.latitude - jejuCoordinates.latitude) < 0.1 &&
                    Math.abs(coords.longitude - jejuCoordinates.longitude) < 0.1;

  return {
    isInJeju,
    latitude: coords.latitude,
    longitude: coords.longitude,
  };
};
