import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Alert,
  Platform,
  Dimensions,
} from 'react-native';
import _ from 'lodash';
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  Callout,
  Polygon,
} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {request, PERMISSIONS} from 'react-native-permissions';
const Map = () => {
  const [data, setdata] = useState([
    {
      name: 'Burger',
      latitude: 10.752622,
      longitude: 106.660172,
    },
    {
      name: 'Pizza',
      latitude: 10.787897,
      longitude: 106.650123,
    },
    {
      name: 'Soup',
      latitude: 10.786768,
      longitude: 106.674586,
    },
  ]);
  useEffect(() => {
    const timer = setTimeout(() => {
      requestLocationPermisson();
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  const showWellComMessage = () => {
    Alert.alert('Wellcome to Thong Nhat Stadium', 'The match is starting', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'OK',
      },
    ]);
  };
  const _renderItem = ({item}) => {
    <View>
      <Text>{item.name}</Text>
      <Image source={item.img} />
    </View>;
  };
  const requestLocationPermisson = async () => {
    if (Platform.OS === 'ios') {
      var response = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      console.log('iPhone:' + response);
      if (response === 'granted') {
        locateCurrentPosition();
      }
    } else {
      var response = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      console.log('android:' + response);
      if (response === 'granted') {
        locateCurrentPosition();
      }
    }
  };
  const locateCurrentPosition = () => {
    Geolocation.getCurrentPosition(position => {
      console.log(JSON.stringify(position));
    });
  };
  return (
    <View>
      <MapView
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        style={styles.map}
        region={{
          latitude: 10.762622,
          longitude: 106.660172,
          latitudeDelta: 0.09,
          longitudeDelta: 0.035,
        }}>
        <Polygon
          coordinates={data}
          fillColor={'rgba(100,200,200,0.3)'}
          strokeWidth={3}
        />
        <Marker draggable coordinate={{latitude: 10.76, longitude: 106.6623}}>
          <Callout onPress={showWellComMessage}>
            <Image
              style={styles.img}
              source={require('../asset/thongnhat.jpg')}
            />
            <Text>Thong Nhat Stadium</Text>
          </Callout>
        </Marker>
        {data.map(marker => (
          <Marker
            key={marker.name}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            title={marker.name}
          />
        ))}
      </MapView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    height: '100%',
  },
  img: {
    height: 100,
    width: 100,
  },
});
export default Map;
