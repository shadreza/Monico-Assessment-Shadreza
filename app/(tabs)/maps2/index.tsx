import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import MapView, { Marker, Polyline } from 'react-native-maps'
import MapViewDirections from 'react-native-maps-directions'

const MapScreen = () => {

    const GOOGLE_MAPS_API = process.env.EXPO_PUBLIC_BACKEND_LINK ? process.env.EXPO_PUBLIC_BACKEND_LINK : ''

    const startingMarker = require('../../../assets/images/current-location.png')
    const destinationMarker = require('../../../assets/images/destination.png')
    const currentMarker = require('../../../assets/images/start.png')
    const pointMarker = require('../../../assets/images/point.png')

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
    
    const [origin, setOrigin] = useState({ latitude: fiveGeoMarkers[0].latitude, longitude: fiveGeoMarkers[0].longitude })
    const [destination, setDestination] = useState({ latitude: fiveGeoMarkers[fiveGeoMarkers.length - 1].latitude, longitude: fiveGeoMarkers[fiveGeoMarkers.length - 1].longitude })
    

    const mapRef = useRef<MapView>(null)
    
    const geoLocationOfDhaka = {
        latitude: 23.810332,
        longitude: 90.41251809999994,
    }
    

    useEffect(() => {

        const moveMarker = () => {
        
        let step = 0
        const interval = setInterval(() => {
            if (step >= 1) {
            clearInterval(interval)
            return
        }

        const newLatitude = origin.latitude + (destination.latitude - origin.latitude) * step
        const newLongitude = origin.longitude + (destination.longitude - origin.longitude) * step

        setOrigin({ latitude: newLatitude, longitude: newLongitude })
        
        step += 0.001
        }, 100)
        }

        moveMarker()
    }, [])

    return (
        <View style={styles.container}>
            <MapView
                ref={mapRef}
                style={styles.map}
                initialRegion={{
                latitude: geoLocationOfDhaka.latitude,
                longitude: geoLocationOfDhaka.longitude,
                latitudeDelta: 0.0622,
                longitudeDelta: 0.0121,
            }}
            >
                
                <MapViewDirections
                    origin={fiveGeoMarkers[0]}
                    destination={fiveGeoMarkers[fiveGeoMarkers.length - 1]}
                    apikey={GOOGLE_MAPS_API}
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
                <Marker image={currentMarker} coordinate={{ latitude: origin.latitude, longitude: origin.longitude }} />

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

        <Polyline coordinates={fiveGeoMarkers} strokeWidth={6} strokeColor="#FF1E1E" />

        </MapView>    
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    map: {
        width: '100%',
        height: '100%',
    },
})

export default MapScreen
