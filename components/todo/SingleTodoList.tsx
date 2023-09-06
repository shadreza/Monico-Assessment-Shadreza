import React from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity } from 'react-native';
import TabBarIcon from '../../functionalities/Icon/TabBarIcon';

const SingleTodo = (props: {
        todo: {
            userId: number,
            id: number,
            title: string,
            completed: boolean
        },
        color: string,
        sayHiFromIndex: (todo: {
            userId: number,
            id: number,
            title: string,
            completed: boolean
        }) => void
    }) => {

    const todoInfo = props.todo

    const generateBoxShadowStyle = (
        xOffset: number,
        yOffset: number,
        shadowColorIos: string,
        shadowOpacity: number,
        shadowRadius: number,
        elevation: number,
        shadowColorAndroid: string,
        ) => {
        if (Platform.OS === 'ios') {
            return {
            shadowColor: shadowColorIos,
            shadowOffset: {width: xOffset, height: yOffset},
            shadowOpacity,
            shadowRadius,
            };
        } else if (Platform.OS === 'android') {
            return {
            elevation,
            shadowColor: shadowColorAndroid,
            };
        }
        };
    
    return (
        <TouchableOpacity
            onPress={() => props.sayHiFromIndex(todoInfo)}
            style={[
                styles.singleTodoView,
                generateBoxShadowStyle(-2, 6, '#171717', 0.4, 4, 10, 'black'),
                todoInfo.completed ? {
                    marginLeft: 'auto',
                    borderRightWidth: 0,
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                    flexDirection: 'row-reverse',
                    borderColor: '#90908D',
                } : {
                    marginRight: 'auto',
                    borderLeftWidth: 0,
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                    flexDirection: 'row',
                    borderColor: 'black',
                },
                {backgroundColor: props.color}
            ]}
        >
            <Text>
                {
                    todoInfo.completed ? 
                        <TabBarIcon name="check-square" size={24} color={'#90908D'} />
                        :
                        <TabBarIcon name="square-o" size={24} color={'black'} />
                }
            </Text>
            <Text style={[
                { color: 'black', width: '80%', fontSize: 16 },
                todoInfo.completed ? styles.completedTodoTitle : {marginLeft: 0, marginRight: 2, textAlign: 'right'}
            ]} >{todoInfo.title}</Text>
        </TouchableOpacity>
    )
}

export default SingleTodo

const styles = StyleSheet.create({
    singleTodoView: {
        width: '78%',
        padding: 6,
        borderRadius: 12,
        borderWidth: 2,
        marginVertical: 6,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    completedTodoTitle: {
        textDecorationLine: 'line-through',
        color: '#90908D',
        textAlign: 'left',
        marginRight: 0,
        marginLeft: 2,
    }
})