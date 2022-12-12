const express = require('express')
const router = express.Router()
const dataCategory = require("../prize.json")

router.get('/', (req, res) => {
    res.render('index', { dataCategory })
}) 

router.get('/category', (req, res) => {
    res.render('category', { dataCategory })
})

router.get('/laureate', (req, res) => {
    res.render('add')
})

module.exports = router