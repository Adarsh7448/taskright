import React from 'react'
import CreateTodo from './createTodo'
import ListTodos from './ListTodos'
import Navbar from './Navbar'

function Dashboard() {
  return (
    <>
        <Navbar/>
        <div className="flex flex-col md:flex-row">
              <CreateTodo></CreateTodo>
              <ListTodos></ListTodos>
        </div>
    </>
  )
}

export default Dashboard