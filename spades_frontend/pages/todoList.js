import Form from "./components/form"
import Section from "./components/section"
import List from "./components/list"

import todos from "./api/index";
import { useEffect, useState } from "react";
import { Grid, Paper } from '@material-ui/core';

const appTitle = 'To-Do App'
const paperStyle = { backgroundColor: '#f2f2f2', padding: 20, height: '70vh', width: '400px', margin: '20px auto', }


const TodoList = () => {
    const [todoList, setTodoList] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const { data } = await todos.get('/todos');
            setTodoList(data);
        }

        fetchData();
    }, []);

    const addTodo = async (item) => {
        const { data } = await todos.post('/todos', item);
        setTodoList((oldList) => [...oldList, data]);
    };

    const editTodo = async (id, item) => {
        await todos.put('/todos/' + id, item);
    };

    const removeTodo = async (id) => {
        await todos.delete('/todos/' + id);
        setTodoList((oldList) => oldList.filter((item) => item._id !== 'id'));
    };

    return (
        <Grid>
            <Paper elevation={10} style={paperStyle}>

                <Section>
                    <h1> {appTitle}</h1>
                </Section>

                <Section>
                    <Form addTodo={addTodo} />
                </Section>

                <Section>
                    <List
                        editTodoListProp = {editTodo}   
                        removeTodoListProp={removeTodo}
                        list={todoList}
                    />
                </Section>
            </Paper>
        </Grid>
    )
}

export default TodoList