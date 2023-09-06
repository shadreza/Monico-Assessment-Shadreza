import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

export interface ModalState {
    todoLists: {
        id: number,
        userId: number,
        completed: boolean,
        title: string
    }[]
}

const initialState: ModalState = {
    todoLists: []
}

export const todoListsSlice = createSlice({
    name: 'todoListsProperty',
    initialState,
    reducers: {
        setTodos: (state, action: PayloadAction<{
            todos: {
                id: number,
                userId: number,
                completed: boolean,
                title: string
            }[]
        }>) => {
            state.todoLists = action.payload.todos
        },
        clearTodos: (state) => {
            state.todoLists = []
        }
    },
})

// Action creators are generated for each case reducer function
export const { setTodos, clearTodos } = todoListsSlice.actions

export default todoListsSlice.reducer