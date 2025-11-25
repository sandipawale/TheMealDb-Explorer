import React from 'react';

function getIngredientsList(meal) {
  const items = [];
  for (let i = 1; i <= 20; i += 1) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim() !== '') {
      items.push({
        ingredient: ingredient.trim(),
        measure: (measure || '').trim()
      });
    }
  }
  return items;
}

function getYouTubeEmbedUrl(strYoutube) {
  if (!strYoutube) return null;
  try {
    const url = new URL(strYoutube);
    const v = url.searchParams.get('v');
    if (v) {
      return `https://www.youtube.com/embed/${v}`;
    }
    return strYoutube.replace('watch?v=', 'embed/');
  } catch (e) {
    return null;
  }
}

function MealDetail({ meal }) {
  if (!meal) {
    return (
      <section className="meal-detail-section empty">
        <p>Select a meal to see full details here.</p>
      </section>
    );
  }

  const ingredients = getIngredientsList(meal);
  const youtubeEmbed = getYouTubeEmbedUrl(meal.strYoutube);

  return (
    <section className="meal-detail-section">
      <h2>{meal.strMeal}</h2>
      <div className="meal-detail-layout">
        <div className="meal-detail-main">
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className="meal-detail-image"
          />
          <div className="meal-detail-meta">
            <p>
              <strong>Category:</strong> {meal.strCategory || 'N/A'}
            </p>
            <p>
              <strong>Area:</strong> {meal.strArea || 'N/A'}
            </p>
            {meal.strTags && (
              <p>
                <strong>Tags:</strong> {meal.strTags}
              </p>
            )}
          </div>
          <div className="meal-instructions">
            <h3>Instructions</h3>
            <p>{meal.strInstructions}</p>
          </div>
        </div>

        <aside className="meal-detail-sidebar">
          <div className="ingredients-box">
            <h3>Ingredients</h3>
            <ul>
              {ingredients.map((item, idx) => (
                <li key={idx}>
                  <span>{item.ingredient}</span>
                  {item.measure && <span className="measure">{item.measure}</span>}
                </li>
              ))}
            </ul>
          </div>

          {youtubeEmbed && (
            <div className="video-box">
              <h3>Video</h3>
              <div className="video-container">
                <iframe
                  src={youtubeEmbed}
                  title={meal.strMeal}
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}
        </aside>
      </div>
    </section>
  );
}

export default MealDetail;
