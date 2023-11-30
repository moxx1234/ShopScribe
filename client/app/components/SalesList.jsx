import Table from './table/Table'

const getFormattedDate = (date) => {
	const year = date.getFullYear(),
		month = date.getMonth(),
		day = date.getDay()
	return `${day < 10 ? `0${day}` : day}.${month < 10 ? `0${month}` : month}.${year}`
}

const SalesList = ({ sales }) => {
	const data = sales.map(sale => {
		const { createdAt, shop, product_sales, ...rest } = sale
		const date = getFormattedDate(new Date(createdAt))
		return { date, ...rest }
	})

	const tableData = {
		titles: Object.keys(data[0]).filter(title => title !== 'id'),
		body: data
	}

	const handleRowPress = (rowId) => {
		console.log(rowId)
	}

	return (
		<Table data={tableData} onRowPress={handleRowPress} />
	)
}

export default SalesList