import FontAwesome from '@expo/vector-icons/FontAwesome';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, useColorScheme } from 'react-native';

const TabBarIcon = (props: {
        name: React.ComponentProps<typeof FontAwesome>['name'];
        color: string;
    }) => {
        return <FontAwesome size={18} {...props} />;
    }

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

    const theme = useColorScheme() ?? 'light';
    const textColor = theme === 'dark' ? 'white' : 'black'
    
    return (
        <TouchableOpacity onPress={() => props.sayHiFromIndex(todoInfo)} style={styles.singleTodoView} >
            <View style={styles.todoTopRowView}>
                <Text style={{color: textColor, fontWeight: '700'}} > #{todoNumber + 1} </Text>
                <Text style={{ color: textColor }} >
                    <TabBarIcon name="user" color={'purple'} />{todoInfo.userId}
                </Text>
                <Text>
                    {
                        todoInfo.completed ? 
                            <TabBarIcon name="check-circle" color={'green'} />
                            :
                            <TabBarIcon name="circle-o" color={'red'} />
                    }
                </Text>
            </View>
            <Text style={styles.todoTopRowUnderline}></Text>
            <Text style={[
                { color: textColor },
                todoInfo.completed && styles.completedTodoTitle
            ]} >{todoInfo.title}</Text>
        </TouchableOpacity>
    )
}

export default SingleTodo

const styles = StyleSheet.create({
    singleTodoView: {
        width: '92%',
        padding: 4,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: 'gray',
        marginVertical: 2,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    todoTopRowView: {
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },
    todoTopRowUnderline: {
        width: '100%',
        borderTopWidth: 1,
        borderColor: 'gray'
    },
    completedTodoTitle: {
        textDecorationLine: 'line-through'
    }
})