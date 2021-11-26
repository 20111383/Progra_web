import { ListItem } from "../list_item/list_item.component"

export const TodoList = (props) => {

    return(
        <ul className="list-group">
            {
                props.items.map((item, index) => {
                    return <ListItem key={"item_" + index} todo={item} onDelete = {props.onDeleteItem}/>
                })
            }
        </ul>
    )
}