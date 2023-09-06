import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, useColorScheme } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import TabBarIcon from '../../functionalities/Icon/TabBarIcon';
import { setTodos } from '../../redux/features/todoLists/todoListsSlice';
import { RootState } from '../../redux/store';

const TodoDetailsPage = () => {

    const { id, userId, completed, title } = useLocalSearchParams()

    const [completion, setCompletion] = useState<string>(typeof (completed) === 'string' ? completed : completed[0])
    
    const theme = useColorScheme() ?? 'light'
    const textColor = theme === 'dark' ? 'white' : 'black'
    const iconColor = completion === 'true' ? 'green' : 'red'
    const iconName = completion === 'true' ? 'check-square' : 'circle-o-notch'


    const dispatch = useDispatch()
    
    const todos = useSelector((state: RootState) => state.todoListsFromStore.todoLists)

    const deleteTodoFromList = () => {
        const oldTodoLists = todos
        let removingId: number = 0
        if (typeof (id) === 'string') {
            removingId = parseInt(id)
        }
        dispatch(setTodos({ todos: oldTodoLists.filter((todo) => (todo.id !== removingId )) }))
        router.back()
    }

    const toggleTodoCompletion = () => {
        const oldTodoLists = todos
        let removingId: number = 0
        if (typeof (id) === 'string') {
            removingId = parseInt(id)
        }
        const newCompletion = completion === 'true' ? false : true
        dispatch(setTodos({ todos: oldTodoLists.map((todo) => (todo.id === removingId) ? { ...todo, completed: newCompletion } : todo) }))
        setCompletion(completion==='true' ? 'false' : 'true')
    }

    return (
        <View style={styles.detailsContainer}>
            <Text style={[
                {color: textColor, fontFamily: 'UbuntuBold', fontSize: 30, marginBottom: 20}
            ]}>TASK # { id }</Text>
            <Text style={[
                {color: textColor, fontFamily: 'UbuntuRegular', fontSize: 20, marginBottom: 10}
            ]}>User - {userId}</Text>
            <View style={{ marginBottom: 6, flexDirection: 'row' }}>
                {
                    completion === 'true' ?
                        <TabBarIcon name={iconName} color={iconColor} />
                        :
                        <TabBarIcon name={iconName} color={iconColor} />
                }
                <Text style={{color: textColor, marginLeft: 6, fontSize: 16}}>
                    {
                        completion === 'true' ? 'completed' : 'incomplete'
                    }
                </Text>
            </View>
            <Text style={[
                { color: textColor, fontFamily: 'UbuntuRegular', fontSize: 18, marginBottom: 60, textAlign: 'center'}
            ]}>
                {title}
            </Text>
            <TouchableOpacity
                onPress={() => {toggleTodoCompletion()}}
            >
                <Text style={[
                    styles.baseButton,
                    completion === 'true' ? {backgroundColor: 'yellow', color: 'black'} : {backgroundColor: 'green', color: textColor}
                ]}>{completion === 'true' ? "UnTick" : "Tick"} Task</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {deleteTodoFromList()}}
            >
                <Text style={[
                    styles.baseButton,
                    {color: textColor, backgroundColor: 'red'}
                ]}>Delete</Text>
            </TouchableOpacity>
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
    },
    baseButton: {
        padding: 4,
        borderRadius: 6,
        fontFamily: 'UbuntuBold',
        fontSize: 18,
        marginBottom: 20,
        textAlign: 'center',
        width: 120,
        overflow: 'hidden',
    }
})