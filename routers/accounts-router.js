const express = require('express')

const db = require("../data/dbConfig.js");

const router = express.Router();
router.get('/', (req, res)=> {
    db.select('*').from('accounts')
    .then(accounts => {
        res.status(200).json({data: accounts})
    }).catch(error => {
        res.status(500).json({error: error.message})
    })
})

router.get('/:id', (req, res) => {
    db('accounts').where('id', '=', req.params.id)
    .then(accounts => {
        res.status(200).json(accounts)
    }).catch(error => {
        res.status(500).json({error: error.message})
    })
})

router.post('/', (req, res) => {
    const accountData = req.body

    db('accounts').insert(accountData, 'id')
    .then(newAccount => {
        res.status(201).json({data: newAccount})
    }).catch(error => {
        res.status(500).json({error: error.message})
    })
})

router.put('/:id', (req, res) => {
const changes = req.body;

    db('accounts').where({id: req.params.id})
    .update(changes)
    .then(account => {
        res.status(200).json(account)
    }).catch(error => {
        res.status(500).json({error: error.message})
    })
})

router.delete('/:id', (req,res) => {
    db('accounts').where({id: req.params.id})
    .delete()
    .then(account => {
        res.status(200).json(account)
    }).catch(error => {
        res.status(500).json({error: error.message})
    })
})

module.exports = router;