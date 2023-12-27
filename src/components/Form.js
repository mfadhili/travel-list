import {useState} from "react";

export default function Form({onAddItems}) {
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
                {Array.from({length: 20}, (_, i) => i + 1).map((num) => (
                    <option value={num} key={num}>
                        {num}
                    </option>
                ))}
            </select>
            <input type={"text"} placeholder={"Item..."} value={description}
                   onChange={(e) => {
                       console.log(e.target);
                       setDescription(e.target.value);
                   }}
            />
            <button>Add</button>
        </form>
    );
}