import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';

import * as Location from 'expo-location';

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        const errorMessage = 'Permission to access location was denied';
        setErrorMsg(errorMessage);
        alert(errorMessage);
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = '...';
  let altitude = '';
  let latitude = '';
  let longitude = '';
  let speed = '';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
    altitude = location.coords.altitude;
    latitude = location.coords.latitude;
    longitude = location.coords.longitude;
    speed = location.coords.speed;
  }

  return (
    <View style={styles.container}>
      <Ionicon name="location-sharp" size='50' color='#606c38'></Ionicon>
      <Text style={styles.title}>Your location info</Text>
      <Text style={styles.paragraph}>Altitude: {altitude}</Text>
      <Text style={styles.paragraph}>Latitude: {latitude}</Text>
      <Text style={styles.paragraph}>Longitude: {longitude}</Text>
      <Text style={styles.paragraph}>Speed: {speed}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fefae0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 10,
  },
  paragraph: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});
