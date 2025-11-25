import React from 'react';

function CategoryList({ categories, selectedCategory, onSelectCategory }) {
  return (
    <div className="category-section">
      <h2>Browse by Category</h2>
      <div className="category-list">
        {categories.map((cat) => (
          <button
            key={cat.idCategory}
            className={
              'category-pill' +
              (selectedCategory === cat.strCategory ? ' active' : '')
            }
            onClick={() => onSelectCategory(cat.strCategory)}
          >
            {cat.strCategory}
          </button>
        ))}
      </div>
    </div>
  );
}

export default CategoryList;
