import React from 'react';
import { Image, ImageBackground, SafeAreaView, StyleSheet, Text, View } from 'react-native';

const index = () => {

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFDAC7'}}>
      <ImageBackground source={require('../../assets/images/layered-bg.png')} resizeMode="cover" style={{flex: 1,justifyContent: 'center', width: '100%'}}>
        {/* <LottieView
          style={{
            width: 250,
            height: 250,
          }}
          source={require('../../assets/animations/working.json')}
          autoPlay
          loop
        /> */}
        <Image
          source={require('../../assets/images/man-and-task.png')}
          style={{
            position: 'absolute',
            top: '6%',
            left: '-30%',
          }}
        />
        <View style={{ position: 'relative', bottom: '3%', marginLeft: 'auto', marginRight: 'auto', marginTop: 24 }}>
          <Text style={{ color: 'black', fontSize: 40, fontFamily: 'UbuntuBold', }}>Self Manager</Text>
          <Text style={{ color: 'black', fontSize: 18, fontFamily: 'UbuntuBold', }}>Task Planner & Map Director</Text>
        </View>
        
        <Image
          source={require('../../assets/images/man-and-map.png')}
          style={{
            position: 'absolute',
            bottom: '6%',
            right: '-24%',
          }}
        />
      </ImageBackground>
    </SafeAreaView>
  )
}

export default index

const styles = StyleSheet.create({})