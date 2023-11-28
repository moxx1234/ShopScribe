import { useEffect, useState } from "react"
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { getProducts } from '../../../api/products'
import CustomModal from "../../components/CustomModal"
import { useTheme } from '../../context/ThemeProvider'
import CreateOrder from "./CreateOrder"
import { createDeal } from "../../../api/sales"

const Shop = ({ route }) => {
	const shop = route.params.shop

	const { themeStyles } = useTheme()
	const [modalOpen, setModalOpen] = useState(false)
	const [products, setProducts] = useState([])

	useEffect(() => {
		getProducts()
			.then(response => setProducts(response.products))
			.catch(error => console.error(error))
	}, [])

	const handleDealCreate = (addedProducts) => {
		const addedProductsInfo = addedProducts.map(({ id, quantity }) => ({ productId: id, productQty: quantity }))
		createDeal(shop.id, addedProductsInfo)
			.then(response => {
				if (response.message) {
					setModalOpen(false)
					return alert(response.message)
				}
				console.log(response)
			})
			.catch(error => console.error(error))
	}

	return (
		<ScrollView style={{ padding: 15 }}>
			{Object.entries(shop).map(([key, value]) => (
				value && key !== 'id' && (
					<View key={key} style={styles.container}>
						<Text style={[themeStyles.text, styles.key]}>{`${key}:`}</Text>
						<Text style={[themeStyles.text, styles.value]}>{`${value}`}</Text>
					</View>
				)
			))}
			<View style={styles.section}>
				{!!products.length && (
					<CustomModal isOpen={modalOpen} onClose={() => setModalOpen(false)} title='Создать продажу'>
						<CreateOrder products={products} onDealCreate={handleDealCreate} />
					</CustomModal>
				)}
				<View style={[styles.container, styles.sectionHeader]}>
					<Text style={[themeStyles.text, styles.title]}>Продажи</Text>
					<TouchableOpacity style={styles.buttonContainer} onPress={() => setModalOpen(true)}>
						<Text style={styles.buttonText}>Создать продажу +</Text>
					</TouchableOpacity>
				</View>
			</View>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		flexWrap: 'wrap'
	},
	key: {
		fontSize: 18,
		marginRight: 10,
	},
	value: {
		fontSize: 20,
		fontWeight: 'bold'
	},
	section: {
		paddingTop: 20,
	},
	sectionHeader: {
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
	},
	buttonContainer: {
		backgroundColor: 'rgb(0,122,255)',
		borderRadius: 5,
		padding: 5,
	},
	buttonText: {
		color: '#fff'
	},
})

export default Shop