import { StyleSheet } from 'react-native';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { Text, View } from '../../components/Themed';

export default function TodoTabScreen() {

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
  
  useEffect(() => {
    getTodosFromEndPoint()
  }, [])

  return (
    <View style={styles.container}>
      <Text>Total Todo In List = { todos ? todos.length : 0 }</Text>
    </View>
  );
}

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
});
