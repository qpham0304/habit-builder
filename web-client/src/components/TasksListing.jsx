import { Checkbox, IconButton, List, ListItem } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import { setTask } from '../features/tasks/taskSlice'
import TaskItem from './TaskItem'

function TasksListing({ tasks, selectedTask, setSelectedTask, setFormInfo, handleOpen, setAction }) {
  const dispatch = useDispatch()
  return (
    <List>
      {tasks.map((task) => {
        return (
          <ListItem
            onClick={() => {
              setSelectedTask(task)
            }}
            key={task._id}
            disableGutters
            className={selectedTask === task ? 'task-item active' : 'task-item'}
          >
            <Checkbox
              color={'success'}
              defaultChecked={task.completed}
              onChange={(e) => {
                dispatch(setTask({
                    id: task._id,
                    tasks: {
                    task: task.task,
                    description: task.description,
                    completed: e.target.checked,
                    time_taken: task.time_taken,
                    tag: task.tag,
                  }
                }))
                console.log(task.completed)
              }}
            />
            <TaskItem task={task} setFormInfo={setFormInfo} handleOpen={handleOpen} setAction={setAction} />
          </ListItem>
        )
      })}
    </List>
  )
}

export default TasksListing
