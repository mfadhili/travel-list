import {useState} from "react";
import Item from "./Item";

export default  function PackingList({items, onDeleteItem, onPackedItem, handleClearList}) {
    /*COMPONENT TO HOLD COMPLETE PACKING LIST ITEMS AND A PASSED DOWN HANDLER*/


    const [sortBy, setSortBy] = useState("input");

    /*SORTING LOGIC*/
    let sortedItems
    if (sortBy === "input")
        sortedItems = items
    else if (sortBy === "description")
        sortedItems = items.slice().sort((a, b) => a.description.localeCompare(b.description))
    else if (sortBy === "packed")
        sortedItems = items.slice().sort((a, b) => Number(a.packed) - Number(b.packed))


    return (
        <div className="list">
            <ul>
                {sortedItems.map((item) => (
                    <Item key={item.id} item={item} onDeleteItem={onDeleteItem} onPackedItem={onPackedItem}/>
                ))}
            </ul>

            <div className="action">
                <select name="" id="" value={sortBy} onChange={e => setSortBy(e.target.value)}>
                    <option value="input">Sort by the input order</option>
                    <option value="description">Sort by description</option>
                    <option value="packed">Sort by packed status</option>
                </select>

                <button onClick={handleClearList}>Clear list</button>
            </div>
        </div>
    );
}

