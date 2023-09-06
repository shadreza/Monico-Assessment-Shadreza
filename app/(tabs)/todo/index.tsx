import axios from 'axios';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, useColorScheme } from 'react-native';
import { Text, View } from '../../../components/Themed';
import SingleTodoList from '../../../components/todo/SingleTodoList';
import Colors from '../../../constants/Colors';

const TodoTabScreen = () => {

  const todoUrlLink = "https://jsonplaceholder.typicode.com/todos"

  const theme = useColorScheme() ?? 'light'

  const [todos, setTodos] = useState<{
    userId: number,
    id: number,
    title: string,
    completed: boolean
  }[]>()
  const [distinctUsers, setDistinctUsers] = useState<number[]>()

  const getDistinctUserIds = (todoList: {
      userId: number,
      id: number,
      title: string,
      completed: boolean
    }[]) => {
    const distinctUserIdList: number[] = []
    todoList.forEach((todo) => {
      if (!distinctUserIdList.includes(todo.userId)) {
        distinctUserIdList.push(todo.userId)
      }
    })
    return distinctUserIdList
  }

  const getTodosFromEndPoint = async () => {
    const todoResponse = await axios.get(todoUrlLink)
    if (todoResponse && todoResponse.data && todoResponse.data.length > 0) {
      setTodos(todoResponse.data)
      const distinctUserIds = getDistinctUserIds(todoResponse.data)
      setDistinctUsers(distinctUserIds)
    }
  }

  const toggleTodoCompletionFromParent = (todoParam: {
      userId: number,
      id: number,
      title: string,
      completed: boolean
    }) => {
    if (todos) {
      setTodos(
        todos.map((todo) => todo===todoParam ? {...todo, completed:!todo.completed} : todo)
      )
    }
  }

  useEffect(() => {
    getTodosFromEndPoint()
  }, [])

  return (
    <View style={styles.container}>
      {
        todos && todos.length > 0 && distinctUsers && distinctUsers.length > 0 ?
          <ScrollView style={styles.todoListView}>
            {
              distinctUsers.map((userId, i) => 
                <View style={[
                  styles.distinctUserTodo,
                  theme === 'dark' ? { borderColor: '#848480' } : { borderColor: 'black' },
                  {backgroundColor: Colors.soothingColors[(i)%Colors.soothingColors.length]}
                ]} key={i}>
                  <Text style={styles.distinctUserHeading}>
                    USER { userId }
                  </Text>
                  {
                    (todos.filter((todo) => todo.userId === userId))
                      .map((todo, j) => 
                        <SingleTodoList key={j} todo={todo} color={Colors.soothingColors[(i)%Colors.soothingColors.length]} toggleTodoCompletionFromParent={(todoParam) => toggleTodoCompletionFromParent(todoParam)} />
                  )}
                </View>
              )
            }

          </ScrollView>
          :
          <Text>No Todos Found !</Text>
      }
    </View>
  );
}

export default TodoTabScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  todoListView: {
    width: '100%',
    padding: 12,
  },
  distinctUserTodo: {
    marginBottom: 24,
    borderRadius: 12,
    paddingVertical: 12,
    borderWidth: 4,
  },
  distinctUserHeading: {
    textAlign: 'center', 
    color: 'black', 
    fontSize: 20, 
    fontWeight: '800', 
    marginBottom: 6,
    fontFamily: 'RobotoBlack'
  }
});
