import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

const MapTabScreen = () => {

  const GOOGLE_MAPS_API = process.env.EXPO_PUBLIC_BACKEND_LINK ? process.env.EXPO_PUBLIC_BACKEND_LINK : ''

  const startingMarker = require('../../../assets/images/current-location.png')
  const destinationMarker = require('../../../assets/images/destination.png')
  const currentMarker = require('../../../assets/images/start.png')
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
  
  const startMovingOfMarker = async (allPaths: {latitude: number, longitude: number}[]) => {
    const totalHops = await allPaths.length
    let i = 0
    if (totalHops > 0) {
      setInterval(() => {
        if (i >= totalHops) {
          i--
        } else {
          setCurrentMockLocation(allPaths[i++])
        }
      }, 20)
    }
  }

  const startMovingMarker = async (routesStepsFromGoogleMaps: any[]) => {

    if (routesStepsFromGoogleMaps && routesStepsFromGoogleMaps.length > 0) {
      let paths: { latitude: number, longitude: number }[] = []
      const stepPerSecond = 0.0001

      for (let i = 0; i < routesStepsFromGoogleMaps.length - 1; i++) {
        const pointOne = {
            latitude: routesStepsFromGoogleMaps[i].start_location.lat,
            longitude: routesStepsFromGoogleMaps[i].start_location.lng
        }

        const pointTwo = {
            latitude: routesStepsFromGoogleMaps[i+1].end_location.lat,
            longitude: routesStepsFromGoogleMaps[i+1].end_location.lng
        }

        const biggerFactor = Math.abs(pointOne.latitude - pointTwo.latitude) >= Math.abs(pointOne.longitude - pointTwo.longitude) ? Math.abs(pointOne.latitude - pointTwo.latitude) : Math.abs(pointOne.longitude - pointTwo.longitude)
        const latitudeStep = pointTwo.latitude >= pointOne.latitude ?
          ((Math.abs(pointOne.latitude - pointTwo.latitude) / biggerFactor) * stepPerSecond)
          : -((Math.abs(pointOne.latitude - pointTwo.latitude) / biggerFactor) * stepPerSecond)
        const longitudeStep = pointTwo.longitude >= pointOne.longitude ?
          ((Math.abs(pointOne.longitude - pointTwo.longitude) / biggerFactor) * stepPerSecond)
          : -((Math.abs(pointOne.longitude - pointTwo.longitude) / biggerFactor) * stepPerSecond)

        const totlaSteps = Math.floor(Math.abs((Math.abs(pointOne.latitude - pointTwo.latitude)) / latitudeStep))

        let currentStep = pointOne

        await paths.push(currentStep)

        for (let j = 0; j < totlaSteps; j++) {
          currentStep = {
            latitude: currentStep.latitude + latitudeStep,
            longitude: currentStep.longitude + longitudeStep,
          }
          await paths.push(currentStep)
        }
        await paths.push({
          latitude: pointTwo.latitude,
          longitude: pointTwo.longitude
        })

      }
      setTimeout(() => {
        startMovingOfMarker(paths)
      }, 3000)
    }
  }

  useEffect(() => {
    const destination = `${fiveGeoMarkers[fiveGeoMarkers.length - 1].latitude}%2C${fiveGeoMarkers[fiveGeoMarkers.length - 1].longitude}`
    const origin = `${fiveGeoMarkers[0].latitude}%2C${fiveGeoMarkers[0].longitude}`
    const googleMapsRouteRequestUrl = `https://maps.googleapis.com/maps/api/directions/json?destination=${destination}&origin=${origin}&key=${GOOGLE_MAPS_API}`
    axios.get(googleMapsRouteRequestUrl)
      .then((response) => {
        startMovingMarker(response.data.routes[0].legs[0].steps)
      })
      .catch((error) => {
        console.log(error)
        alert('Unable to fetch from Google Maps')
      })
  }, [GOOGLE_MAPS_API])

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
          strokeColor="#FF1E1E"
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

        <Marker
          coordinate={{ latitude: currentMockLocation.latitude, longitude: currentMockLocation.longitude }}
          image={currentMarker}
          title="Current Location"
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
