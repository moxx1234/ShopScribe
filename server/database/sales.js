const { Op } = require('sequelize')
const { sequelize, ProductSale, Product } = require('./init')

const createSale = async (dealInfo) => {
	const [shopId, products] = Object.entries(dealInfo)[0]

	products.forEach(product => { product.shopId = shopId })

	try {
		const productsFromTable = await Product.findAll({
			where: {
				id: {
					[Op.or]: products.map(product => product.productId)
				}
			}
		}).then(response => response.map((product) => product.dataValues))

		productsFromTable.forEach(product => {
			const productLeft = product.quantity - products.find(item => item.productId === product.id).productQty
			product.quantity = productLeft
			product.updatedAt = new Date()
		})

		await sequelize.transaction(async (transaction) => {
			await ProductSale.bulkCreate(products, { transaction })
			await Product.bulkCreate(productsFromTable, {
				updateOnDuplicate: ['quantity', 'updatedAt'],
				transaction
			})
		})

		return { status: 200, message: 'Продажа успешно создана' }
	}
	catch (error) {
		console.log(error)
		throw { status: 500, message: 'Something went wrong' }
	}

}

module.exports = { createSale }