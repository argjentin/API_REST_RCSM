const prizesController = require('../controllers/prizes.controllers');
const express = require('express');
const router = express.Router();

router.get('/nbprizes', prizesController.getNbPrizes);
/**
 * @swagger
 * /prizes/nbprizes/:
 *   get:
 *      description: Used to get the number of prizes
 *      tags:
 *          - Get Prizes
 *      responses:
 *          '200':
 *              description: Resource added successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 */

router.get('/categories/', prizesController.getCategories);
/**
 * @swagger
 * /prizes/categories/:
 *   get:
 *      description: Used to get the prizes categories
 *      tags:
 *          - Get Categories
 *      responses:
 *          '200':
 *              description: Resource added successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 */

router.get('/categories/:category', prizesController.getLaureatesFromListe);

router.get('/categories/m/mostlaureates', prizesController.getMostLaureatesCategory);
/**
 * @swagger
 * /prizes/categories/m/mostlaureates/:
 *   get:
 *      description: Used to get the most granted category
 *      tags:
 *          - Get Categories
 *      responses:
 *          '200':
 *              description: Resource added successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 */

router.get('/laureates/:laureateId', prizesController.getPrizesByLaureateId);
/**
 * @swagger
 * /prizes/laureates/{laureateId}:
 *   get:
 *      description: Used to get prizes by laureate id
 *      tags:
 *          - Get Prizes
 *      parameters:
 *          - in: path
 *            name: laureateId
 *            required: true
 *      responses:
 *          '200':
 *              description: Resource added successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 */

router.get('/years/noprizes', prizesController.getNoPrizes);
/**
 * @swagger
 * /prizes/years/noprizes:
 *   get:
 *      description: Used to get the years with no prizes
 *      tags:
 *          - Get Years
 *      responses:
 *          '200':
 *              description: Resource added successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 */

router.get('/years/triyears', prizesController.getLaureatesByYearAscDesc);
/**
 * @swagger
 * /prizes/years/triyears:
 *   get:
 *      description: Used to get prizes by laureate ascending or descending
 *      tags:
 *          - Get Prizes Ascending or Descending
 *      parameters: 
 *          - in: query
 *            name: sort
 *            required: false
 *            example: asc or desc
 *      responses:
 *          '200':
 *              description: Resource added successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 */

module.exports = router;