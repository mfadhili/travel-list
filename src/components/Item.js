export default function Item({item, onDeleteItem, onPackedItem}) {
    /* MAPPING ITEM TO LI WITH ITEM NAME SPAN  AND BUTTON USING PASSED DOWN HANDLER onDeleteItem*/

    return (
        <li className={""}>
            <input type="checkbox" value={item.packed} onChange={() => {
                onPackedItem(item.id)
            }}/>
            <span style={item.packed ? {textDecoration: 'line-through'} : {}}>
            {item.quantity} {item.description}
            </span>
            <button onClick={() => onDeleteItem(item.id)}>❌</button>
        </li>
    );
}