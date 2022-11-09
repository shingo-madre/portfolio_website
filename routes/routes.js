const express = require('express')
const router = express.Router()
const Portfolio = require('../model/model')

router.post('/post', async (req, res) => {
    const data = new Portfolio({
        title: req.body.title,
        description: req.body.description,
        author: req.body.author,
        image: req.body.image,
        year: req.body.year,
        role: req.body.role,
        link: req.body.link
    })

    try {
        const dataToSave = await data.save()
        res.status(200).json(dataToSave)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
    
})

router.get('/getAll', (req, res) => {
    try {
        Portfolio.find({}, function(err, portfolios) {
            var portfolioMap = {}

            portfolios.forEach(function(portfolio) {
                portfolioMap[portfolio.title] = portfolio
            })

            res.status(200).json(portfolioMap)
        })
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

router.get('/getOne/:_id', async (req, res) => {
    try {
        const data = await Portfolio.findById(req.params._id)
    } catch (error) {
        
    }
}) 

router.get('/list/:author', async (req, res) => {
    try {
        const data = await Portfolio.find({ author: req.params.author})
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

router.patch('/update/:_id', async (req, res) => {
    try {
        const result = await Portfolio.findByIdAndUpdate(
            req.params._id, req.body, { new: true }
            )
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

router.delete('/delete/:_id', async (req, res) => {
    try {
        const dataToBeDeleted = await Portfolio.findByIdAndDelete(req.params._id)
        res.status(200).send(`Data with title ${dataToBeDeleted.title} has been deleted`)
    } catch (error) {
        res.status(400).json({message: error.message});
    }
})


module.exports = router;