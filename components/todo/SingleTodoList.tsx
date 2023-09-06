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
        toggleTodoCompletionFromParent: (todo: {
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
            <TouchableOpacity onPress={() => props.toggleTodoCompletionFromParent(todoInfo)}>
                {
                    todoInfo.completed ? 
                        <TabBarIcon name="check-square" size={24} color={'#90908D'} />
                        :
                        <TabBarIcon name="square-o" size={24} color={'black'} />
                }
            </TouchableOpacity>
            <Text style={[
                { color: 'black', width: '80%', fontSize: 16, fontFamily: 'UbuntuBold' },
                todoInfo.completed ? styles.completedTodoTitle : {marginLeft: 12, justifyContent: 'flex-start',}
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
        alignItems: 'center',
        textAlign: 'left'
    },
    completedTodoTitle: {
        textDecorationLine: 'line-through',
        color: '#90908D',
        justifyContent: 'flex-end',
        marginRight: 12,
    }
})