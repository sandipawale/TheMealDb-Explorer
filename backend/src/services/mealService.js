const axios = require('axios');
const { getCache, setCache } = require('../utils/cache');

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

async function fetchFromApiWithCache(cacheKey, url, params = {}) {
  const cached = getCache(cacheKey);
  if (cached) {
    return cached;
  }

  const response = await axios.get(url, { params });
  const data = response.data;
  setCache(cacheKey, data, CACHE_TTL_MS);
  return data;
}

async function searchMealsByName(name) {
  const cacheKey = `search:${name.toLowerCase()}`;
  const url = `${BASE_URL}/search.php`;
  const data = await fetchFromApiWithCache(cacheKey, url, { s: name });
  // TheMealDB returns { meals: [...] } or { meals: null }
  return data.meals || [];
}

async function listCategories() {
  const cacheKey = 'categories';
  const url = `${BASE_URL}/categories.php`;
  const data = await fetchFromApiWithCache(cacheKey, url);
  return data.categories || [];
}

async function getMealsByCategory(category) {
  const cacheKey = `category:${category.toLowerCase()}`;
  const url = `${BASE_URL}/filter.php`;
  const data = await fetchFromApiWithCache(cacheKey, url, { c: category });
  return data.meals || [];
}
// here we are not caching the random meal
async function getRandomMeal() {
  const url = `${BASE_URL}/random.php`;
  const response = await axios.get(url);
  return response.data.meals ? response.data.meals[0] : null;
}

async function getMealById(id) {
  const cacheKey = `meal:${id}`;
  const url = `${BASE_URL}/lookup.php`;
  const data = await fetchFromApiWithCache(cacheKey, url, { i: id });
  return (data.meals && data.meals[0]) || null;
}

module.exports = {
  searchMealsByName,
  listCategories,
  getMealsByCategory,
  getRandomMeal,
  getMealById
};
