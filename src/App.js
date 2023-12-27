import {useState} from "react";
import Stats from "./components/Stats";
import Logo from "./components/Logo";
import Form from "./components/Form";
import PackingList from "./components/PackingList";


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

    function handleClearList() {
        /*  ALERT*/
        const confirmed = window.confirm("Are you sure you want to delete all items?");

        if (confirmed) setItems([]);
    }

  return (
    <div className="app">
      <Logo/>
      <Form onAddItems={handleAddItems} />
      <PackingList items={items} onDeleteItem={handleDeleteItem} onPackedItem={handleToggleItem} handleClearList={handleClearList}/>
      <Stats items={items}/>
    </div>
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
