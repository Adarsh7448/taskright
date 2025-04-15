import React from 'react'
import { useState, useEffect} from 'react';
import taskService from '../appwrite/taskService';
import authService from '../appwrite/authservice';
import { useDispatch, useSelector } from 'react-redux';
import { addTask } from '../features/taskslice';
import { signIn } from '../features/authslice';

function CreateTodo() {
    const [task, setTask] = useState({high_priority: false, is_completed: false})
    const dispatch = useDispatch()

    useEffect(() => {
        authService.checkLogin()
        .then((user) => { dispatch(signIn(user))
            setTask({...task, auth_id: user.$id})
        })
        .catch((error) => console.log(`APPWRITE ERROR: ${error}`))
    }, [])

    const addTaskForm = (e) => {
        e.preventDefault(); 
        try {
            taskService.createTask(task)
            .then((data) => {
                dispatch(addTask(data));
                document.getElementById('myForm').reset();

            })
            .catch((error) => console.log(`APPWRITE ERROR: ${error}`))
        } catch (error) {
            console.log(`APPWRITE ERROR: ${error}`);
        }
    }

    return (
        <>
            <div className='px-2 mt-2 border border-gray-300 w-full md:w-1/3 lg:w-1/4 rounded py-3 mx-1'>
            <h1 className='text-2xl font-bold'>Create a New Task</h1>
            <form onSubmit = {addTaskForm} className='w-full my-3' id="myForm">
                <div className="sm:col-span-4">
                    <label htmlFor="task_title" className="block text-sm/6 font-medium text-gray-900">
                        Task Title
                    </label>
                    <div className="mt-2">
                        <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                            <input
                                id="task_title"
                                name="task_title"
                                type="text"
                                onChange={(e) => setTask((prev) => ({...prev, task_title: e.target.value}))}
                                placeholder="Add notes..."
                                className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                            />
                        </div>
                    </div>
                </div>
                <div className="col-span-full">
                <label htmlFor="about" className="block text-sm/6 font-medium text-gray-900">
                    Define your task
                </label>
                <div className="mt-2">
                    <textarea
                    id="task_content"
                    name="task_content"
                    rows={3}
                    onChange={(e) => setTask((prev) => ({...prev, task_content: e.target.value}))}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    defaultValue={''}
                    />
                </div>
                <p className="mt-3 text-sm/6 text-gray-600">Write a clear and concise task description.</p>
                <div className="mt-2">
                    <label htmlFor="deadline" className="block mb-2">
                    Due Date and Time
                    </label>
                    <input 
                    type="datetime-local" 
                    id="deadline"
                    onChange={(e) => setTask((prev) => ({...prev, deadline: e.target.value}))}
                    className="w-full px-3 py-2 border rounded border-gray-300"
                    />
                </div>
                </div>
                <div className="flex mt-3 text-sm text-gray-600">
                    <input
                    id="high_priority"
                    name="high_priority"
                    type="checkbox"
                    checked = {task.high_priority}
                    onChange={(e) => setTask((prev) => ({...prev, high_priority: e.target.checked}))}
                    aria-describedby="comments-description"
                    className="rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-900 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                    />
                    <label htmlFor="high_priority" className="text-sm/6 font-medium text-gray-900 mx-2">
                        High Priority
                    </label>
                </div>
                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button className="text-sm/6 font-semibold text-gray-900 cursor-pointer">Cancel</button>
                    <button type="submit"className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer">           
                        Save
                    </button>
                </div>
            </form>
            </div>
        </>
    )
}

export default CreateTodo