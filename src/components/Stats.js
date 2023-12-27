export default function Stats({items}) {
    const numItems = items.length;
    const numPacked = items.filter((item) => item.packed).length
    const numPackedPercent = Math.floor((numPacked / numItems) * 100);


    return (
        <footer className={"stats"}>
            {numItems === 0 ?
                <em>
                    Start adding items to your packing list 🚀
                </em>
                :
                numPackedPercent === 100 ?
                    <em>
                        You got everything! Ready to go ✈️
                    </em>
                    :
                    <em>
                        {`You have ${numItems} ${numItems > 1 ? `items` : `item`} on your list, and you already packed ${numPacked} (${numPackedPercent}%)`}
                    </em>
            }

        </footer>
    );
}