import { useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { View } from '../../../components/Themed';

const MapTabScreen = () => {

  const GOOGLE_MAPS_API = process.env.EXPO_PUBLIC_BACKEND_LINK ? process.env.EXPO_PUBLIC_BACKEND_LINK : ''
  
  const currentMarker = require('../../../assets/images/current-location.png')
  const destinationMarker = require('../../../assets/images/destination.png')
  const startingMarker = require('../../../assets/images/start.png')
  const pointMarker = require('../../../assets/images/point.png')

  const mapRef = useRef<MapView>(null)

  const geoLocationOfDhaka = {
    latitude: 23.810332,
    longitude: 90.41251809999994,
  }

  const fiveGeoMarkers = [
    {
      latitude: 23.81426279756788,
      longitude: 90.40413862620731,
      title: 'Start',
    },
    {
      latitude: 23.808106397946844,
      longitude: 90.40328323667977,
      title: 'Stop - 1',
    },
    {
      latitude: 23.798141522836097,
      longitude: 90.40168671183021,
      title: 'Stop - 2',
    },
    {
      latitude: 23.78979393341548,
      longitude: 90.40020439868736,
      title: 'Stop - 3',
    },
    {
      latitude: 23.77941034563629,
      longitude: 90.39837976942222,
      title: 'Destination',
    }
  ]

  const [currentMockLocation, setCurrentMockLocation] = useState({
    latitude : fiveGeoMarkers[0].latitude,
    longitude : fiveGeoMarkers[0].longitude,
  })

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: geoLocationOfDhaka.latitude,
          longitude: geoLocationOfDhaka.longitude,
          latitudeDelta: 0.0622,
          longitudeDelta: 0.0121,
        }}
        ref={mapRef}
      >
        <MapViewDirections
          origin={fiveGeoMarkers[0]}
          destination={fiveGeoMarkers[fiveGeoMarkers.length - 1]}
          apikey={GOOGLE_MAPS_API}
          strokeWidth={3}
          strokeColor="red"
          optimizeWaypoints={true}
          waypoints={(fiveGeoMarkers.length > 2) ? fiveGeoMarkers.slice(1, -1) : undefined}
          onReady={(result) => {
            if (mapRef.current) {
              mapRef.current.fitToCoordinates(result.coordinates, {
                edgePadding: {
                  right: 20,
                  bottom: 40,
                  left: 20,
                  top: 40
                }
              })
            }
          }}
        />

        {fiveGeoMarkers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
            image={
              index === 0 ?
                startingMarker :
                index === fiveGeoMarkers.length - 1 ?
                  destinationMarker :
                  pointMarker
            }
            title={fiveGeoMarkers[index].title}
          />
        ))}

        <Marker
          coordinate={{ latitude: currentMockLocation.latitude, longitude: currentMockLocation.longitude }}
          image={currentMarker}
          title="Current Location"
        />

      </MapView>
    </View>
  );
}

export default MapTabScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
