import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, useColorScheme, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import TabBarIcon from '../../functionalities/Icon/TabBarIcon';
import { setTodos } from '../../redux/features/todoLists/todoListsSlice';
import { RootState } from '../../redux/store';

const TodoDetailsPage = () => {

    const { id, userId, completed, title } = useLocalSearchParams()

    const [completion, setCompletion] = useState<string>(typeof (completed) === 'string' ? completed : completed[0])
    
    const theme = useColorScheme() ?? 'light'
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
            <Image
                source={require('../../assets/images/man-taking-coffee.png')}
                style={{
                    backgroundColor: '#E8FFCE',
                    position: 'absolute',
                    bottom: '90%',
                    right: 200,
                    borderBottomRightRadius: 300,
                }}
            />
            <Text style={[
                {color: 'black', fontFamily: 'UbuntuBold', fontSize: 30, marginBottom: 20}
            ]}>TASK # { id }</Text>
            <Text style={[
                {color: 'black', fontFamily: 'UbuntuRegular', fontSize: 20, marginBottom: 10}
            ]}>User - {userId}</Text>
            <View style={{ marginBottom: 6, flexDirection: 'row' }}>
                {
                    completion === 'true' ?
                        <TabBarIcon name={iconName} color={iconColor} />
                        :
                        <TabBarIcon name={iconName} color={iconColor} />
                }
                <Text style={{color: 'black', marginLeft: 6, fontSize: 16}}>
                    {
                        completion === 'true' ? 'completed' : 'incomplete'
                    }
                </Text>
            </View>
            <Text style={[
                { color: 'black', fontFamily: 'UbuntuRegular', fontSize: 18, marginBottom: 60, textAlign: 'center'}
            ]}>
                {title}
            </Text>
            <TouchableOpacity
                onPress={() => {toggleTodoCompletion()}}
            >
                <Text style={[
                    styles.baseButton,
                    completion === 'true' ? {backgroundColor: 'gray', color: 'white'} : {backgroundColor: 'black', color: 'white'}
                ]}>{completion === 'true' ? "UnTick" : "Tick"} Task</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {deleteTodoFromList()}}
            >
                <Text style={[
                    styles.baseButton,
                    {color: 'white', backgroundColor: 'black'}
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
        padding: 10, 
        top: '12%',
        margin: 'auto',
        position: 'absolute',
        left: 0,
        right: 0,
        backgroundColor: '#E8FFCE',
        borderRadius: 24,
        borderTopLeftRadius: 450,
        height: 800
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