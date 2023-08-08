import React, { useState, useEffect } from 'react';
function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const loadMoreItems = () => {
    setLoading(true);
    // Simulate fetching more items from an API
    setTimeout(() => {
      const newItems = [...items, ...Array.from({ length: 10 }, (_, index) => items.length + index + 1)];
      setItems(newItems);
      setLoading(false);
    }, 1000);
  };

  const handleScroll = () => {
    const scrollPosition = window.innerHeight + window.scrollY;
    const bodyHeight = document.body.offsetHeight;

    if (scrollPosition >= bodyHeight - 200) {
      loadMoreItems();
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [items]);

  return (
    <div className="App">
      <h1>Infinite Scroll Example</h1>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      {loading && <p>Loading more items...</p>}
    </div>
  );
}

export default App;
