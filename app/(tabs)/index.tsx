import { ScrollView, StyleSheet } from 'react-native';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { Text, View } from '../../components/Themed';
import SingleTodo from '../../components/todo/SingleTodo';

const TodoTabScreen = () => {

  const todoUrlLink = "https://jsonplaceholder.typicode.com/todos"

  const [todos, setTodos] = useState<{
    userId: number,
    id: number,
    title: string,
    completed: boolean
  }[]>()

  const getTodosFromEndPoint = async () => {
    const todoResponse = await axios.get(todoUrlLink)
    if (todoResponse && todoResponse.data && todoResponse.data.length > 0) {
      setTodos(todoResponse.data)
    }
  }

  const sayHiFromIndex = (todoParam: {
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
        todos && todos.length > 0 ?
          <ScrollView style={styles.todoListView}>
            {todos.map((todo, i) =>
              <SingleTodo key={i} todo={todo} counter={i} sayHiFromIndex={(todoParam) => sayHiFromIndex(todoParam)} />
            )}
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
    marginBottom: 2,
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
    padding: 2
  }
});
