// Rendering Lists
// http://localhost:3000/isolated/exercise/07.js

import * as React from 'react'

const allItems = [
  {id: 'apple', value: '🍎 apple'},
  {id: 'orange', value: '🍊 orange'},
  {id: 'grape', value: '🍇 grape'},
  {id: 'pear', value: '🍐 pear'},
]

function App() {
  window.fetchStyle('https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css')
  const [items, setItems] = React.useState(allItems)

  function addItem() {
    setItems([
      ...items,
      allItems.find(i => !items.map(({id}) => id).includes(i.id)),
    ])
  }

  function removeItem(item) {
    setItems(items.filter(i => i.id !== item.id))
  }

  return (
    <div className="keys">
      <button disabled={items.length >= allItems.length} onClick={addItem}>
        add item
      </button>
      <ul style={{listStyle: 'none', paddingLeft: 0}}>
        {items.map((item, index) => (
          // 🐨 add a key prop to the <li> below. Set it to item.id
          <li key={item.id}>
            <button className="border rounded p-2" onClick={() => removeItem(item)}>remove</button>{' '}
            <label className="border rounded p-2" htmlFor={`${item.id}-input`}>{item.value}</label>{' '}
            <input className="border rounded p-2" id={`${item.id}-input`} defaultValue={item.value} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
