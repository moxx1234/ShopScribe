const express = require('express')
const jwt = require('jsonwebtoken')
const { register, login } = require('../database/auth')
const ACCESS_TOKEN = process.env.ACCESS_TOKEN

const auth = express.Router()

const authenticateToken = (req, res, next) => {
	const authHeader = req.headers['authorization']
	const token = authHeader && authHeader.split(' ')[1]
	if (!token) return res.status(401).json({ message: 'no token' })
	jwt.verify(token, ACCESS_TOKEN, (err, user) => {
		console.log(err)
		if (err) return res.sendStatus(403).json({ message: 'invalid secret' })
		req.user = user
		next()
	})
}

auth.get('/login', authenticateToken, (req, res) => {
	res.json(req.user)
})

const actions = ['register', 'login']
actions.forEach(action => {
	auth.post((`/${action}`), async (req, res) => {
		const dbFunction = action === 'register' ? register : login
		const { status, ...rest } = await dbFunction(req.body).catch(error => error)
		const token = createJWT(rest)
		res.status(status).json({ JWT: token })
	})
})

const createJWT = (userData) => {
	const { email, isAdmin } = userData
	return jwt.sign(({ email, isAdmin }), ACCESS_TOKEN)
}

module.exports = auth