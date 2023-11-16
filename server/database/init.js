const { Sequelize, DataTypes } = require('sequelize')
const useBcrypt = require('sequelize-bcrypt')

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
	host: process.env.DB_HOST,
	dialect: 'mysql'
})

const User = sequelize.define('user', {
	id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true,
		unique: 'id'
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: 'email'
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false
	},
	isAdmin: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
		defaultValue: false
	},
	isBlocked: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
		defaultValue: false
	}
})

const Shop = sequelize.define('shop', {
	id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true,
		unique: 'id'
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: 'name'
	},
	owner: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	phone: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	address: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	remark: {
		type: DataTypes.TEXT,
	},
})

sequelize.sync({ alter: true }).then(() => {
	console.log('tables had been synchronised')
}).catch((err) => console.log('table sync error', err))

useBcrypt(User, {
	field: 'password',
	rounds: 12,
	compare: 'authenticate'
})

module.exports = { User, Shop }