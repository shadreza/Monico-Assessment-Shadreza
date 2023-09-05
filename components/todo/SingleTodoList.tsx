import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import TabBarIcon from '../../functionalities/Icon/TabBarIcon';

const SingleTodo = (props: {
        todo: {
            userId: number,
            id: number,
            title: string,
            completed: boolean
        },
        counter: number,
        sayHiFromIndex: (todo: {
            userId: number,
            id: number,
            title: string,
            completed: boolean
        }) => void
    }) => {

    const todoInfo = props.todo
    const todoNumber = props.counter
    
    return (
        <TouchableOpacity
            onPress={() => props.sayHiFromIndex(todoInfo)}
            
            style={[
                styles.singleTodoView,
                todoInfo.completed ? {
                    marginLeft: 'auto',
                    borderRightWidth: 0,
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                    flexDirection: 'row-reverse',
                } : {
                    marginRight: 'auto',
                    borderLeftWidth: 0,
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                    flexDirection: 'row',
                }
            ]}
        >
            <Text>
                {
                    todoInfo.completed ? 
                        <TabBarIcon name="check-circle" size={24} color={'green'} />
                        :
                        <TabBarIcon name="circle-o" size={24} color={'red'} />
                }
            </Text>
            <Text style={[
                { color: 'black', width: '80%'},
                todoInfo.completed ? styles.completedTodoTitle : {marginLeft: 0, marginRight: 2, textAlign: 'right',}
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
        borderColor: 'gray',
        marginVertical: 2,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    completedTodoTitle: {
        textDecorationLine: 'line-through',
        color: 'gray',
        textAlign: 'left',
        marginRight: 0,
        marginLeft: 2,
    }
})