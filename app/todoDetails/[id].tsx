import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View, useColorScheme } from 'react-native';
import TabBarIcon from '../../functionalities/Icon/TabBarIcon';

const TodoDetailsPage = () => {

    const { id, userId, completed, title } = useLocalSearchParams()

    const theme = useColorScheme() ?? 'light'
    const textColor = theme === 'dark' ? 'white' : 'black'
    const iconColor = completed === 'true' ? 'green' : 'red'
    const iconName = completed === 'true' ? 'check-square' : 'circle-o-notch'

    return (
        <View style={styles.detailsContainer}>
            <Text style={[
                {color: textColor, fontFamily: 'UbuntuBold', fontSize: 30, marginBottom: 20}
            ]}>TASK # { id }</Text>
            <Text style={[
                {color: textColor, fontFamily: 'UbuntuRegular', fontSize: 20, marginBottom: 10}
            ]}>User - {userId}</Text>
            <View style={{ marginBottom: 6, flexDirection: 'row' }}>
                <Text>
                    <TabBarIcon name={iconName} color={iconColor} />
                </Text>
                <Text style={{color: textColor, marginLeft: 6, fontSize: 16}}>
                    {
                        completed === 'true' ? 'completed' : 'incomplete'
                    }
                </Text>
            </View>
            <Text style={[
                { color: textColor, fontFamily: 'UbuntuRegular', fontSize: 18, marginBottom: 20, textAlign: 'center'}
            ]}>
                {title}
            </Text>
        </View>
    )
}

export default TodoDetailsPage

const styles = StyleSheet.create({
    detailsContainer: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center', 
        padding: 4, 
        top: 0,
        bottom: '30%',
        margin: 'auto',
        position: 'absolute',
        left: 0,
        right: 0,
        borderWidth: 2,
    }
})