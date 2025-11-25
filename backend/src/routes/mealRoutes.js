const express = require('express');
const router = express.Router();
const mealService = require('../services/mealService');

// Health check
router.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'TheMealDB Explorer API' });
});

// GET /api/meals/search?name=chicken
router.get('/meals/search', async (req, res, next) => {
  try {
    const { name } = req.query;
    if (!name) {
      return res.status(400).json({ error: 'Query parameter "name" is required' });
    }
    const meals = await mealService.searchMealsByName(name);
    res.json({ meals });
  } catch (err) {
    next(err);
  }
});

// GET /api/categories
router.get('/categories', async (req, res, next) => {
  try {
    const categories = await mealService.listCategories();
    res.json({ categories });
  } catch (err) {
    next(err);
  }
});

// GET /api/categories/:category/meals
router.get('/categories/:category/meals', async (req, res, next) => {
  try {
    const { category } = req.params;
    const meals = await mealService.getMealsByCategory(category);
    res.json({ meals });
  } catch (err) {
    next(err);
  }
});

// GET /api/meals/random
router.get('/meals/random', async (req, res, next) => {
  try {
    const meal = await mealService.getRandomMeal();
    if (!meal) {
      return res.status(404).json({ error: 'No random meal found' });
    }
    res.json({ meal });
  } catch (err) {
    next(err);
  }
});

// GET /api/meals/:id
router.get('/meals/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const meal = await mealService.getMealById(id);
    if (!meal) {
      return res.status(404).json({ error: 'Meal not found' });
    }
    res.json({ meal });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
