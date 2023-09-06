import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const index = () => {

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {/* <LottieView
        style={{
          width: 250,
          height: 250,
        }}
        source={require('../../assets/animations/working.json')}
        autoPlay
        loop
      /> */}
      <Text style={{
        fontSize: 50,
      }}>👋</Text>
      <Text style={{color: '#4D2DB7', fontSize: 40, fontFamily: 'UbuntuBold'}}>Hi there</Text>
    </View>
  )
}

export default index

const styles = StyleSheet.create({})