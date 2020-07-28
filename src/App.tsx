import React, {useState} from 'react';
import './App.css';
import {TasksType, TodoList} from "./Todolist";
import {v1} from "uuid";

export type FilterValuesType = "all" | "completed" | "active";

export function App() {

    let [tasks, setTasks] = useState<Array<TasksType>>([
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "Redux", isDone: false}
    ]);

    let [filter, setFilter] = useState<FilterValuesType>("all");

    function removeTask(id: string) {
        let fTasks = tasks.filter((t) => {
            return t.id !== id
        })
        setTasks(fTasks);
    }

    function addTask(title: string) {
        let newTask = {id: v1(), title: title, isDone: false};
        let newTasks = [newTask, ...tasks];
        setTasks(newTasks);
    }
    function changeStatus(taskId: string, isDone: boolean) {
        let task = tasks.find( t => t.id === taskId);
        if (task) { //proverka: esli taska suzhestvuet
            task.isDone = isDone;
        }
        /*let copy = [ ...tasks ]
        setTasks(copy);*/
        setTasks([ ...tasks ]);
    }


    function changeFilter(value: FilterValuesType) {
        setFilter(value);
    }

    let tasksForTodoList = tasks;
    if (filter === "completed") {
        tasksForTodoList = tasks.filter(t => t.isDone === true);
    }
    if (filter === "active") {
        tasksForTodoList = tasks.filter(t => t.isDone === false);
    }

    return (
        <div className="App">
            <TodoList
                title="What to learn"
                tasks={tasksForTodoList}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeTaskStatus={changeStatus}
                filter={filter}
            />
        </div>
    );
}

export default App;
