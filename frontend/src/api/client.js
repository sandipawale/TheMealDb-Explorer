import axios from 'axios';

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export async function fetchCategories() {
  const res = await axios.get(`${API_BASE_URL}/categories`);
  return res.data.categories || [];
}

export async function searchMeals(query) {
  const res = await axios.get(`${API_BASE_URL}/meals/search`, {
    params: { name: query }
  });
  return res.data.meals || [];
}

export async function fetchMealsByCategory(category) {
  const res = await axios.get(
    `${API_BASE_URL}/categories/${encodeURIComponent(category)}/meals`
  );
  return res.data.meals || [];
}

export async function fetchRandomMeal() {
  const res = await axios.get(`${API_BASE_URL}/meals/random`);
  return res.data.meal || null;
}

export async function fetchMealById(id) {
  const res = await axios.get(`${API_BASE_URL}/meals/${id}`);
  return res.data.meal || null;
}
