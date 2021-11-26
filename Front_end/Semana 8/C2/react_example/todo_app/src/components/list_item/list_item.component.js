export const ListItem = (props) => {
    return <li className="list-group-item d-flex justify-content-between">
        {props.todo.nombre}
        <button type="button" 
            className="btn-close" 
            aria-label="Close"
            onClick={() =>{
                props.onDelete(props.todo.id)
            }}
            ></button>

    </li>
}