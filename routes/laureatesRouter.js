const laureatesController = require('../controllers/laureates.controllers');
const express = require('express');
const router = express.Router();

router.get('/all', laureatesController.getAllLaureates);
/**
 * @swagger
 * /laureates/all:
 *   get:
 *      description: Used to get all laureates
 *      tags:
 *          - Get Laureates
 *      parameters:
 *          - in: query
 *            name: page
 *            type: integer
 *            required: false
 *            limit: limit
 *      responses:
 *          '200':
 *              description: Resource added successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 */

router.get('/:laureateId?', laureatesController.getLaureatesById);
/**
 * @swagger
 * /laureates/{laureateId}:
 *   get:
 *      description: Used to get a laureate by id
 *      tags:
 *          - Get Laureates
 *      parameters:
 *          - in: path
 *            name: laureateId
 *            type: integer
 *            required: false
 *            description: Numeric ID of the laureate to get (Optional)
 *      responses:
 *          '200':
 *              description: Resource added successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 */

router.get('/prizes/nblaureatesbyprize/', laureatesController.getNbLaureatesByPrize);
/**
 * @swagger
 * /laureates/prizes/nblaureatesbyprize/:
 *   get:
 *      description: Used to get the number of laureates by prize
 *      tags:
 *          - Get Laureates
 *      responses:
 *          '200':
 *              description: Resource added successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 */

router.get('/prizes/nblaureatesbymanyprizes/', laureatesController.getNbLaureatesManyPrizes);
/**
 * @swagger
 * /laureates/prizes/nblaureatesbymanyprizes/:
 *   get:
 *      description: Used to get the number of laureates by many Prize
 *      tags:
 *          - Get Laureates
 *      responses:
 *          '200':
 *              description: Resource added successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 */

router.get('/prizes/year', laureatesController.getLaureatesByYear);
/**
 * @swagger
 * /laureates/prizes/year:
 *   get:
 *      description: Used to get laureates by year
 *      tags:
 *          - Get Laureates
 *      responses:
 *          '200':
 *              description: Resource added successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 */

router.get('/laureates/filter/', laureatesController.filterLaureats);
/**
 * @swagger
 * /laureates/laureates/filter/:
 *   get:
 *      description: Used to get laureates by year
 *      tags:
 *          - Get Laureates
 *      parameters:
 *          - in: query
 *            name: firstname
 *            required: false
 *          - in: query
 *            name: surname
 *            required: false
 *          - in: query
 *            name: category
 *            required: false
 *      responses:
 *          '200':
 *              description: Resource added successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 */

router.get('/laureates/many', laureatesController.laureatesByCategoryAndYear);

router.delete("/delete/:id&:year&:category",laureatesController.deleteLaureate)
/**
 * @swagger
 * /laureates/delete/{id}&{year}&{category}:
 *   delete:
 *      description: Used to delete a laureates by id, year and category
 *      tags:
 *          - laureate
 *      parameters:
 *          - in: path
 *            name: id
 *            type: string
 *            description: Laureate id
 *            required: true
 *          - in: path
 *            name: year
 *            type: string
 *            description: Prize year
 *            required: true
 *          - in: path
 *            name: category
 *            type: string
 *            description: Prize category
 *            required: true
 *      responses:
 *          '200':
 *              description: Resource added successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 */

 router.put("/update/:id&:year&:category",laureatesController.updateMotivation)
 /**
  * @swagger
  * /laureates/update/{id}&{year}&{category}:
  *   put:
  *      description: Used to uptade laureates's motivation by id, year and category
  *      tags:
  *          - laureate
  *      parameters:
  *          - in: path
  *            name: id
  *            type: string
  *            description: Laureate id
  *            required: true
  *          - in: path
  *            name: year
  *            type: string
  *            description: Prize year
  *            required: true
  *          - in: path
  *            name: category
  *            type: string
  *            description: Prize category
  *            required: true
  *          - in: body
  *            name: motivation
  *            description: motivation to change
  *            schema:
  *                type: object
  *                required:
  *                    - motivation
  *                properties:
  *                    motivation:
  *                        type: string
  *                        minLength: 1
  *                        maxLength: 45
  *      responses:
  *          '200':
  *              description: Resource added successfully
  *          '500':
  *              description: Internal server error
  *          '400':
  *              description: Bad request
  */
 

router.post('/add', laureatesController.addLaureate);

router.post("/add/:year&:category",laureatesController.addLaureate)
/**
* @swagger
* /laureates/add/{year}&{category}:
*   post:
*      description: Used to delete a laureates by id, year and category
*      tags:
*          - laureate
*      parameters:
*          - in: path
*            name: year
*            type: string
*            description: Prize year
*            required: true
*          - in: path
*            name: category
*            type: string
*            description: Prize category
*            required: true
*          - in: body
*            name: data
*            description: data of a new laureate
*            schema:
*                type: object
*                required:
*                    - firstname
*                    - motivation
*                    - share
*                properties:
*                    firstname:
*                        type: string
*                        minLength: 1
*                        maxLength: 45
*                    surname:
*                        type: string
*                        minLength: 1
*                        maxLength: 45
*                    motivation:
*                        type: string
*                        minLength: 1
*                        maxLength: 255
*                    share:
*                        type: integer
* 
*      responses:
*          '200':
*              description: Resource added successfully
*          '500':
*              description: Internal server error
*          '400':
*              description: Bad request
*/

module.exports = router;

