import { Button } from '@material-ui/core';
import TodoItem from './todoItem';




const List = ({ list, removeTodoListProp, editTodoListProp }) => {
    const renderedlist = list.map(
        (item) => (
            <TodoItem
                title={item.title}
                removeTodoItemProp={(e) => removeTodoListProp(item._id)}
                completed={item.completed}
                editTodoItemProp={(updatedItem) => editTodoListProp(item._id, updatedItem)}
                key={item.title}
            />
        )
    );

    return (

        <div className='ui grid'>
            {renderedlist}
        </div>
    );

};

export default List;