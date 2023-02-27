import React, { useState, useEffect } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/items")
      .then((r) => r.json())
      .then((data) => {
        // console.log(data);
        setItems(data);
      });
  }, []);

  function handleDeleteItem(deleteItem) {
    // console.log("In ShoppingCart:", deleteItem);
    const updatedItems = items.filter((item) => item.id !== deleteItem.id);
    setItems(updatedItems);
  }

  function handleUpdateItem(updatedItem) {
    // console.log("In ShoppingCart:", updatedItem);
    const updatedItems = items.map((item) => {
      if (item.id === updatedItem.id) return updatedItem;
      else return item;
    });
    setItems(updatedItems);
  }

  function handleAddItem(newItem) {
    // console.log("In ShoppingList:", newItem)
    setItems([...items, newItem]);
  }

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;
    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={handleAddItem} />
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <div>
        <ul className="Items">
          {itemsToDisplay.map((item) => (
            <Item
              key={item.id}
              item={item}
              onUpdateItem={handleUpdateItem}
              onDeleteItem={handleDeleteItem}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ShoppingList;
