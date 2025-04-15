import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import taskService from '../appwrite/taskService';
import authService from '../appwrite/authservice';
import {getTask, setEditing} from '../features/taskslice'
import { useNavigate } from 'react-router-dom';

function ListTodos() {
    const [thisTask, setThisTask] = useState({
        task_title: "",
        task_content: "",
        deadline: "",
        high_priority: false,
        is_completed: false,
    })
    const [auth_id, setAuth_id] = useState("")
    // const tasks = useSelector((state) => state.task.tasks)
    const [tasks, setTasks] = useState([])
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    useEffect(() => {
        authService.checkLogin()
        .then((user) => {
            if(user){
                getTaskList(user.$id)
                setAuth_id(user.$id)
            }
            else{
                navigate('/login')
            }
        })
    }, [])

    const getTaskList = (auth_id) => {
        taskService.getTasks(auth_id)
        .then((data) => setTasks(data.documents))
        .catch((error) => console.log(`APPWRITE ERROR: ${error}`))
    }

    const daysRemaining = (task) => {
        const today = new Date();
        const deadlineDate = new Date(task.deadline);
        return Math.floor((deadlineDate - today) / (1000 * 60 * 60 * 24));
    }
  
    const getDeadlineColor = (task) => {
        if (task.is_completed) return "text-gray-400";
        if (daysRemaining(task) < 0) return "text-red-600";
        if (daysRemaining(task) <= 2) return "text-orange-500";
        return "text-blue-600";
    };

    const handleEdit = (task) => {
        if (task.isEditing){
            console.log(thisTask)
            console.log("editing at backend")
            taskService.updateTask({task_id:task.$id, ...thisTask})
            .then((data) => getTaskList(auth_id))
            .catch((error) => console.log(`APPWRITE ERROR: ${error}`))
            dispatch(setEditing(task.$id))
        }
        else{
            setThisTask({
                task_title: task.task_title,
                task_content: task.task_content,
                deadline: task.deadline.slice(0,23),
                high_priority: task.high_priority,
                is_completed: task.is_completed,
                auth_id: auth_id
            })
            console.log("changing to editing")
            dispatch(setEditing(task.$id))
            
        }
    }

    const handleComplete = (task) => {
        taskService.updateTask({task_id:task.$id, is_completed: true})
        .then((data) => getTaskList(auth_id))
        .catch((error) => console.log(`APPWRITE ERROR: ${error}`))
    }

    const handleCancel = (task) => {
        dispatch(setEditing(task.$id))
    }

    const handleDelete = (task) => {
        taskService.deleteTask(task.$id)
        .then((data) => getTaskList(auth_id))
        .catch((error) => console.log(`APPWRITE ERROR: ${error}`))
    }

    const getDate = (task) => {
        const thisDate = new Date(task.deadline)
        const optionsDate = { timeZone: 'Asia/Kolkata', year: 'numeric', month: '2-digit', day: '2-digit' };
        const optionsTime = { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
        const formattedDate = thisDate.toLocaleDateString('en-IN', optionsDate);
        const formattedTime = thisDate.toLocaleTimeString('en-IN', optionsTime);
        return `Deadline: ${formattedDate} ${formattedTime}`
    } 
    
    return (
        <div className='px-2 py-3 mt-2 border border-gray-300 rounded w-full md:w-2/3 lg:w-3/4 mx-1'>
            <h1 className='text-2xl font-bold'>Your listed Tasks</h1>
            <div className="mt-3" style={{overflowY: "auto", height: "500px"}}>
                {
                    tasks.map((task) => {
                        return(
                        task.isEditing ? (
                        <div className="rounded-lg border border-gray-300 shadow-sm p-4 bg-white mt-2" key={task.$id}>
                            <input
                                name="title"
                                value={thisTask.task_title}
                                onChange={(e) => setThisTask({...thisTask, task_title : e.target.value})}
                                className="w-full px-1 ml-2 text-lg font-medium text-gray-400 focus:bg-gray-100 border-rounded-lg border-none border-bottom focus:outline-indigo-600 focus:px-1"
                            />
                            <textarea
                                name="description"
                                value={thisTask.task_content}
                                onChange={(e) => setThisTask({...thisTask, task_content : e.target.value})}
                                rows="3"
                                className="w-full px-1 ml-2 py-2 text-gray-400 focus:bg-gray-100 border-rounded-lg border-none border-bottom focus:outline-indigo-600 focus:px-1"
                            />
                            <input
                                type="datetime-local"
                                name="deadline"
                                value={thisTask.deadline}
                                onChange={(e) => setThisTask({...thisTask, deadline : e.target.value})}
                                className="ml-2 px-1 py-2 text-gray-400 focus:bg-gray-100 border-rounded-lg border-none border-bottom focus:outline-indigo-600 focus:px-1"
                            />
                            <div className="flex justify-end space-x-2 pt-2">
                                <button 
                                onClick={() => handleCancel(task)}
                                className="px-3 py-1 text-sm/6 font-semibold text-gray-900 cursor-pointer">
                                Cancel
                                </button>
                                <button 
                                onClick={() => handleEdit(task)}
                                className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-blue-700 cursor-pointer">
                                Save
                                </button>
                            </div>
                        </div>
                        ) : (
                        <div key={task.$id} className="rounded-lg border border-gray-300 shadow-sm p-4 bg-white mt-2">
                            <div className="flex items-start justify-between">
                                
                                    {
                                    task.is_completed ? (
                                        <h3 className="ml-2 text-lg font-medium text-gray-800">
                                        <strike>{task.task_title}</strike>
                                        </h3>
                                    ) : (
                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={task.is_completed}
                                                onChange={() => handleComplete(task)}
                                                className="h-5 w-5 text-blue-600 focus:ring-blue-500 rounded cursor-pointer"
                                            />
                                            <h3 className="ml-2 text-lg font-medium text-gray-800">
                                                {task.task_title}
                                            </h3>
                                        </div>
                                    )
                                    }
                                
                                <div className="flex space-x-2">
                                    {
                                        !task.is_completed && (
                                        <button onClick={() => handleEdit(task)} className="text-blue-600 hover:text-blue-800 cursor-pointer">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                            </svg>
                                        </button>
                                        )
                                    }
                                    <button onClick={() => handleDelete(task)} className="text-red-600 hover:text-red-800 cursor-pointer">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                                            </svg>
                                    </button>
                                </div>
                            </div>
                            <p className="ml-2 text-sm text-gray-600 mt-3">
                                    {task.task_content}
                            </p>
                            <div className="text-sm font-medium text-blue-600 mt-3">
                                <span className={`ml-2 ${getDeadlineColor(task)}`}>
                                {task.is_completed ? (
                                    "Completed"
                                    ) : daysRemaining(task) < 0 ? (
                                    "Overdue"
                                    ) : daysRemaining(task) === 0 ? (
                                    "Due today"
                                    ) : daysRemaining(task) === 1 ? (
                                    "Due tomorrow"
                                    ) : (
                                    `${daysRemaining(task)} days remaining`
                                )}
                                
                                </span>
                                <span className="text-gray-500 ml-2">
                                    {getDate(task)}
                                </span>
                            </div>
                        </div>
                    ))})
                } 
            </div>  
        </div>     
    )
}

export default ListTodos