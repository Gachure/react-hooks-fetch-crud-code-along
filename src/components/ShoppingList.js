import React, { useState, useEffect } from 'react';
import ItemForm from './ItemForm';
import Filter from './Filter';
import Item from './Item';

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]); // This state setter should be used to update the items

  useEffect(() => {
    fetch("http://localhost:4000/items")
      .then((r) => r.json())
      .then((data) => setItems(data)); // Ensure you're updating the state with fetched data
  }, []);

  function handleCategoryChange(category) {
    setSelectedCategory(category); // This setter is used to update the category state
  }

  // You should add the callback for updating items when creating a new item
  function handleAddItem(newItem) {
    setItems([...items, newItem]); // This should add a new item to the existing state
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={handleAddItem} /> 
      <Filter category={selectedCategory} onCategoryChange={handleCategoryChange} />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
