import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tasks : []
}

export const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        getTask: (state, action) => {
            let tasks = action.payload.map((task) => ({...task, isEditing: false}))
            state.tasks = tasks.sort((t1, t2) => new Date(t1.deadline) - new Date(t2.deadline))
        },
        addTask: (state, action) => {
            state.tasks.push(action.payload)
        },
        setEditing: (state, action) => {
            console.log("this",action.payload)
            let thisTask = state.tasks.filter((task) => task.$id === action.payload)
            thisTask[0].isEditing = !thisTask[0].isEditing
        }
    }
})

export const {getTask, addTask, setEditing} = taskSlice.actions
export default taskSlice.reducer