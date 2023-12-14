import { useEffect } from "react"
import { StyleSheet, Text, View } from "react-native"
import { useTheme } from "../../context/ThemeProvider"
import { getFullDate } from "../../helpers/formatDate"

const ProductSales = ({ navigation, route }) => {
	const sale = route.params.saleInfo

	useEffect(() => {
		navigation.setOptions({
			title: `Продажа от ${sale.date}`
		})
	}, [])

	const { themeStyles } = useTheme()
	return (
		<View style={styles.container}>
			<Text style={[themeStyles.text, styles.title]}>Магазин: {sale.shop}</Text>
			<Text style={[themeStyles.text, styles.title]}>Дата: {getFullDate(new Date(sale.createdAt))}</Text>
			<View style={styles.section}>
				<Text style={[themeStyles.text, styles.title]}>Товары:</Text>
				{sale.product_sales.map((product, index) => (
					<Text style={[themeStyles.text, styles.row]} key={index}>{product.product.name} - {product.product.price} * {product.productQty} = {product.total}</Text>
				)
				)}
			</View>
			<Text style={[themeStyles.text, styles.title, styles.right]}>Итого: {sale.total}</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		padding: 10
	},
	title: {
		fontSize: 20,
		marginBottom: 10
	},
	section: {
		marginVertical: 20,
		alignSelf: 'center'
	},
	row: {
		fontSize: 18,
		marginBottom: 5,
	},
	right: {
		alignSelf: 'flex-end'
	}
})

export default ProductSales