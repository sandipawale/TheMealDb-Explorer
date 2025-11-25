import React, { useEffect, useState } from 'react';
import {
  fetchCategories,
  searchMeals,
  fetchMealsByCategory,
  fetchRandomMeal,
  fetchMealById
} from './api/client';
import SearchBar from './components/SearchBar';
import CategoryList from './components/CategoryList';
import MealGrid from './components/MealGrid';
import MealDetail from './components/MealDetail';

function App() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [meals, setMeals] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);

  const [loadingSearch, setLoadingSearch] = useState(false);
  const [loadingRandom, setLoadingRandom] = useState(false);
  const [loadingCategory, setLoadingCategory] = useState(false);

  const [error, setError] = useState(null);

  useEffect(() => {
    // Load categories on first render
    (async () => {
      try {
        const cats = await fetchCategories();
        setCategories(cats);
      } catch (err) {
        console.error(err);
        setError('Failed to load categories');
      }
    })();
  }, []);

  const handleSearch = async (query) => {
    setError(null);
    setLoadingSearch(true);
    setSelectedCategory(null);
    setSelectedMeal(null);
    try {
      const results = await searchMeals(query);
      setMeals(results);
      if (results.length === 0) {
        setError('No meals found for that search.');
      }
    } catch (err) {
      console.error(err);
      setError('Error while searching meals.');
    } finally {
      setLoadingSearch(false);
    }
  };

  const handleSelectCategory = async (category) => {
    setError(null);
    setSelectedCategory(category);
    setMeals([]);
    setSelectedMeal(null);
    setLoadingCategory(true);
    try {
      const categoryMeals = await fetchMealsByCategory(category);
      setMeals(categoryMeals);
      if (categoryMeals.length === 0) {
        setError('No meals found for this category.');
      }
    } catch (err) {
      console.error(err);
      setError('Error while loading category meals.');
    } finally {
      setLoadingCategory(false);
    }
  };

  const handleRandom = async () => {
    setError(null);
    setLoadingRandom(true);
    try {
      const meal = await fetchRandomMeal();
      setSelectedMeal(meal);
      setMeals([]);
      setSelectedCategory(null);
    } catch (err) {
      console.error(err);
      setError('Error while fetching random meal.');
    } finally {
      setLoadingRandom(false);
    }
  };

  const handleSelectMeal = async (mealId) => {
    setError(null);
    try {
      const meal = await fetchMealById(mealId);
      setSelectedMeal(meal);
    } catch (err) {
      console.error(err);
      setError('Error while loading meal details.');
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-left">
          <h1>TheMealDB Explorer</h1>
          <p>Search, browse, and explore delicious recipes.</p>
        </div>
        <div className="header-right">
          <button
            className="random-btn"
            onClick={handleRandom}
            disabled={loadingRandom}
          >
            {loadingRandom ? "Loading..." : "I'm feeling hungry 🍽️"}
          </button>
        </div>
      </header>

      <main className="app-main">
        <section className="top-controls">
          <SearchBar onSearch={handleSearch} loading={loadingSearch} />
          <CategoryList
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={handleSelectCategory}
          />
        </section>

        {error && <div className="error-banner">{error}</div>}

        <MealGrid
          meals={meals}
          onSelectMeal={handleSelectMeal}
          title={
            selectedCategory
              ? `Meals in "${selectedCategory}" category`
              : meals.length > 0
              ? 'Search Results'
              : ''
          }
        />

        <MealDetail meal={selectedMeal} />
      </main>

      <footer className="app-footer">
        <p>
          Powered by{' '}
          <a href="https://www.themealdb.com/" target="_blank" rel="noreferrer">
            TheMealDB
          </a>{' '}
          • Built for local demo
        </p>
      </footer>
    </div>
  );
}

export default App;
