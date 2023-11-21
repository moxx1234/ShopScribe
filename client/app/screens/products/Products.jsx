import { useEffect, useState } from 'react'
import { RefreshControl, StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { addProduct, getProducts } from '../../../api/products'
import CustomModal from '../../components/CustomModal'
import IconButton from '../../components/IconButton'
import { useTheme } from '../../context/ThemeProvider'
import AddProductForm from './AddProductForm'
import Table from '../../components/table/Table'

const Products = () => {
	const { themeStyles } = useTheme()
	const [modalOpen, setModalOpen] = useState(false)
	const [isRefreshing, setIsRefreshing] = useState(false)
	const [products, setProducts] = useState()

	useEffect(() => {
		getProducts()
			.then(response => setProducts(response.products))
			.catch(error => console.error(error))
	}, [])

	const handleSubmit = (values, onSubmitProps) => {
		const trimmedValues = Object.entries(values).reduce((result, [field, value]) => result = ({ ...result, [field]: value.trim() }), {})
		addProduct(trimmedValues)
			.then(response => {
				alert(response.message)
				setModalOpen(false)
				handleRefresh()
			})
			.catch(error => {
				if (error.field) return onSubmitProps.setErrors({ [error.field]: [error.message] })
				if (error.message) return alert(error.message)
				alert(error)
			})
			.finally(() => { onSubmitProps.setSubmitting(false) })
	}
	const handleClose = () => {
		setModalOpen(false)
	}
	const handleRefresh = () => {
		setIsRefreshing(true)
		getProducts()
			.then(response => {
				setProducts(response.products)
			})
			.catch(error => console.error(error))
			.finally(() => setIsRefreshing(false))
	}

	const tableData = {
		titles: products?.length && Object.keys(products[0]).filter(title => title === 'name' || title === 'quantity' || title === 'price' || title === 'units'),
		body: products
	}

	return (
		<View style={{ flex: 1 }}>
			<CustomModal
				isOpen={modalOpen}
				onClose={handleClose}
				title='Добавить товар'
			>
				<AddProductForm onSubmit={handleSubmit} />
			</CustomModal>
			<ScrollView
				refreshControl={<RefreshControl onRefresh={handleRefresh} refreshing={isRefreshing} />}
			>
				{products && <Table data={tableData} />}
			</ScrollView>
			<IconButton
				Icon={Ionicons}
				size={50}
				name='add-sharp'
				style={[styles.buttonWrapper, styles.buttonIcon]}
				onPress={() => setModalOpen(true)}
			/>
		</View>
	)
}

const addButtonStyle = {
	buttonWrapper: {
		backgroundColor: 'rgb(0,122,255)',
		borderRadius: 50,
		padding: 10,
		position: 'absolute',
		bottom: 50,
		right: 30,
	},
	buttonIcon: {
		color: '#fff'
	}
}
const styles = StyleSheet.create({
	...addButtonStyle
})

export default Products