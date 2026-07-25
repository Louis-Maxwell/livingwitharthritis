/**
 * Express.js API Routes for Articles & Pet Articles
 * File: src/api/routes/articles.js
 */

const express = require('express');
const router = express.Router();

// Mock database (replace with actual DB calls)
const articlesDB = require('../db/articles');
const petArticlesDB = require('../db/petArticles');

/**
 * GET /api/articles
 * Fetch human-focused arthritis articles with filtering
 */
router.get('/articles', async (req, res) => {
  try {
    const { category, keyword, author, limit = 20, offset = 0 } = req.query;

    // Build filter object
    const filters = {};
    if (category) filters.category = category;
    if (author) filters.author = author;

    // Query database
    let articles = await articlesDB.find(filters);

    // Keyword search (title + excerpt)
    if (keyword) {
      const lowerKeyword = keyword.toLowerCase();
      articles = articles.filter(
        (article) =>
          article.title.toLowerCase().includes(lowerKeyword) ||
          article.excerpt.toLowerCase().includes(lowerKeyword) ||
          (article.keyword && article.keyword.toLowerCase().includes(lowerKeyword))
      );
    }

    // Sort by date (newest first)
    articles.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Pagination
    const total = articles.length;
    const paginatedArticles = articles.slice(
      parseInt(offset),
      parseInt(offset) + parseInt(limit)
    );

    res.json({
      success: true,
      data: {
        articles: paginatedArticles,
        total,
        page: Math.floor(offset / limit) + 1,
        pageSize: parseInt(limit),
        hasMore: parseInt(offset) + parseInt(limit) < total,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

/**
 * GET /api/articles/:slug
 * Fetch single article by slug
 */
router.get('/articles/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const article = await articlesDB.findBySlug(slug);

    if (!article) {
      return res.status(404).json({
        success: false,
        error: 'Article not found',
      });
    }

    // Fetch related articles (same category, exclude current)
    const related = await articlesDB.find(
      { category: article.category },
      { limit: 3, exclude: slug }
    );

    res.json({
      success: true,
      data: {
        article,
        relatedArticles: related,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

/**
 * GET /api/pet-articles
 * Fetch pet-focused arthritis articles with filtering
 */
router.get('/pet-articles', async (req, res) => {
  try {
    const {
      petType,
      category,
      condition,
      author,
      limit = 20,
      offset = 0,
    } = req.query;

    // Build filter object
    const filters = {};
    if (petType && petType !== 'all') filters.petType = petType;
    if (category) filters.category = category;
    if (condition) filters.petCondition = condition;
    if (author) filters.author = author;

    // Query database
    let articles = await petArticlesDB.find(filters);

    // Sort by date (newest first)
    articles.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Pagination
    const total = articles.length;
    const paginatedArticles = articles.slice(
      parseInt(offset),
      parseInt(offset) + parseInt(limit)
    );

    res.json({
      success: true,
      data: {
        articles: paginatedArticles,
        total,
        page: Math.floor(offset / limit) + 1,
        pageSize: parseInt(limit),
        hasMore: parseInt(offset) + parseInt(limit) < total,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

/**
 * GET /api/pet-articles/:slug
 * Fetch single pet article by slug
 */
router.get('/pet-articles/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const article = await petArticlesDB.findBySlug(slug);

    if (!article) {
      return res.status(404).json({
        success: false,
        error: 'Pet article not found',
      });
    }

    // Fetch related articles (same pet type + category)
    const related = await petArticlesDB.find(
      {
        petType: article.petType,
        category: article.category,
      },
      { limit: 3, exclude: slug }
    );

    res.json({
      success: true,
      data: {
        article,
        relatedArticles: related,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

/**
 * GET /api/pet-articles/by-type/:type
 * Fetch all articles by pet type
 */
router.get('/pet-articles/by-type/:type', async (req, res) => {
  try {
    const { type } = req.params;
    const validTypes = ['dog', 'cat', 'equine', 'rabbit', 'other'];

    if (!validTypes.includes(type)) {
      return res.status(400).json({
        success: false,
        error: `Invalid pet type. Must be one of: ${validTypes.join(', ')}`,
      });
    }

    const articles = await petArticlesDB.find({ petType: type });

    // Group by category
    const grouped = articles.reduce((acc, article) => {
      if (!acc[article.category]) {
        acc[article.category] = [];
      }
      acc[article.category].push(article);
      return acc;
    }, {});

    res.json({
      success: true,
      data: {
        petType: type,
        byCategory: grouped,
        total: articles.length,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

/**
 * GET /api/search
 * Global search across both human and pet articles
 */
router.get('/search', async (req, res) => {
  try {
    const { q, type = 'all' } = req.query;

    if (!q || q.trim().length < 2) {
      return res.status(400).json({
        success: false,
        error: 'Search query must be at least 2 characters',
      });
    }

    const lowerQuery = q.toLowerCase();
    let results = {
      human: [],
      pets: [],
    };

    if (['all', 'human'].includes(type)) {
      const humanArticles = await articlesDB.find({});
      results.human = humanArticles.filter(
        (article) =>
          article.title.toLowerCase().includes(lowerQuery) ||
          article.excerpt.toLowerCase().includes(lowerQuery)
      );
    }

    if (['all', 'pets'].includes(type)) {
      const petArticles = await petArticlesDB.find({});
      results.pets = petArticles.filter(
        (article) =>
          article.title.toLowerCase().includes(lowerQuery) ||
          article.excerpt.toLowerCase().includes(lowerQuery)
      );
    }

    res.json({
      success: true,
      data: {
        query: q,
        results,
        total: results.human.length + results.pets.length,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

/**
 * GET /api/stats
 * Article statistics (for dashboard, etc.)
 */
router.get('/stats', async (req, res) => {
  try {
    const humanArticles = await articlesDB.find({});
    const petArticles = await petArticlesDB.find({});

    // Group pet articles by type
    const petsByType = petArticles.reduce((acc, article) => {
      acc[article.petType] = (acc[article.petType] || 0) + 1;
      return acc;
    }, {});

    // Group human articles by category
    const humanByCategory = humanArticles.reduce((acc, article) => {
      acc[article.category] = (acc[article.category] || 0) + 1;
      return acc;
    }, {});

    res.json({
      success: true,
      data: {
        totalArticles: humanArticles.length + petArticles.length,
        human: {
          total: humanArticles.length,
          byCategory: humanByCategory,
        },
        pets: {
          total: petArticles.length,
          byType: petsByType,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

module.exports = router;

/**
 * USAGE in main server file:
 *
 * // src/server.js
 * const express = require('express');
 * const articlesRouter = require('./api/routes/articles');
 *
 * const app = express();
 * app.use('/api', articlesRouter);
 * app.listen(3000, () => console.log('Server running'));
 */
