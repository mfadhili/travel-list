import {useState} from "react";


function App() {

    /*LIFTED STATE*/
    const [items, setItems] = useState([]);

    /*FOR HOLDING NEW ITEMS*/
    function handleAddItems(itemAdd) {
        /*WITHOUT MUTATING THE STATE ARRAY*/
        setItems((item) => [...items, itemAdd])
    }

    function handleDeleteItem(itemId) {
        /*ITEMS WITH DIFFERENT ID ARE RETAINED*/
        setItems((items) => items.filter(
            item => item.id !== itemId
        ))
    }

    function handleToggleItem(id) {
        setItems((items) =>
            items.map((item) => item.id === id ?
                {...item, packed: !item.packed}:
                item
            )
        )


    }

  return (
    <div className="app">
      <Logo/>
      <Form onAddItems={handleAddItems} />
      <PackingList items={items} onDeleteItem={handleDeleteItem} onPackedItem={handleToggleItem}/>
      <Stats items={items}/>
    </div>
  );
}

function Logo(props) {
  return (
      <h1>🏝️ Far Away 🧳</h1>
  );
}

function Form({onAddItems}) {
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState(1);


    function handleSubmit(e) {
        e.preventDefault(); // PREVENT REFRESH
        console.log(e);

        // TO PREVENT SUBMITTING A BLANK ITEM
        if (!description) return;

        const newItem = {
            description,
            quantity,
            packed: false,
            id: Date.now(),
        };
        console.log(newItem);
        /*USING SETSTATE FUNCTION AS A PROP*/
        onAddItems(newItem);

        /* RESET THE FORM INPUTS(QUANTITY AND DESCRIPTION) TO DEFAULT*/
        setDescription('');
        setQuantity(1);
    }

  return (
      <form className="add-form" onSubmit={handleSubmit}>
          <h3>What do you need for your trip?</h3>
          <select name="" id="" value={quantity}
                  onChange={(e) => {
                        console.log(e.target.value);
                      setQuantity(Number(e.target.value));
                  }}
          >
              {/* MAPPING TO PROVIDE LIST WITH NUMBERS FOR RETURNING VALUE TO SELECT TAG*/}
              {Array.from({length: 20},(_,i) => i+1).
              map((num) => (
                  <option value={num} key={num}>
                      {num}
                  </option>
              ))}
          </select>
          <input type={"text"} placeholder={"Item..."} value={description}
                 onChange={(e) =>
                 {
                     console.log(e.target);
                     setDescription(e.target.value);
                 }}
          />
          <button>Add</button>
      </form>
  );
}


function PackingList({items,onDeleteItem,onPackedItem}) {
    /*COMPONENT TO HOLD COMPLETE PACKING LIST ITEMS AND A PASSED DOWN HANDLER*/

    return (
        <div className="list">
            <ul>
                {items.map((item) => (
                    <Item key={item.id} item={item} onDeleteItem={onDeleteItem} onPackedItem={onPackedItem} />
                ))}
            </ul>
        </div>
    );
}

function Item({item,onDeleteItem,onPackedItem}) {
    /* MAPPING ITEM TO LI WITH ITEM NAME SPAN  AND BUTTON USING PASSED DOWN HANDLER onDeleteItem*/

    return (
        <li className={""}>
            <input type="checkbox" value={item.packed} onChange={() => {onPackedItem(item.id)}}/>
            <span style={item.packed ? {textDecoration: 'line-through'} : {}}>
            {item.quantity} {item.description}
            </span>
            <button onClick={() => onDeleteItem(item.id)}>❌</button>
        </li>
    );
}


function Stats({items}) {
    const numItems = items.length;
    const numPacked = items.filter((item) => item.packed).length
    const numPackedPercent = Math.floor((numPacked/numItems) * 100);


  return (
      <footer className={"stats"}>
          <em>
              {`You have ${numItems} ${numItems > 1 || numItems === 0 ? `items` : `item` } on your list, and you already packed ${numPacked} (${numPackedPercent}%)`}
          </em>
      </footer>
  );
}

/*
* INITIALISING ITEMS
* */
const initialItems = [
    { id: 1, description: "Passports", quantity: 2, packed: false },
    { id: 2, description: "Socks", quantity: 12, packed: true },
    { id: 3, description: "Charger", quantity: 1, packed: false },
];
export default App;
