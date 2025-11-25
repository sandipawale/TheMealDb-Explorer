import React from 'react';

function MealCard({ meal, onClick }) {
  return (
    <div className="meal-card" onClick={() => onClick(meal.idMeal)}>
      <img src={meal.strMealThumb} alt={meal.strMeal} />
      <div className="meal-card-body">
        <h3>{meal.strMeal}</h3>
        <p className="meal-meta">
          {meal.strCategory && <span>{meal.strCategory}</span>}
          {meal.strArea && <span>{meal.strArea}</span>}
        </p>
      </div>
    </div>
  );
}

export default MealCard;
