const express = require('express')
const { createSale } = require('../database/sales')

const sales = express.Router()

sales.post('/create', async (req, res) => {
	const { status, ...rest } = await createSale(req.body).catch(error => error)
	res.status(status).json(rest)
})

module.exports = sales