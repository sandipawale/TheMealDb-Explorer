import React from 'react';
import MealCard from './MealCard';

function MealGrid({ meals, onSelectMeal, title }) {
  if (!meals || meals.length === 0) {
    return null;
  }

  return (
    <section className="meal-grid-section">
      {title && <h2>{title}</h2>}
      <div className="meal-grid">
        {meals.map((meal) => (
          <MealCard key={meal.idMeal} meal={meal} onClick={onSelectMeal} />
        ))}
      </div>
    </section>
  );
}

export default MealGrid;
