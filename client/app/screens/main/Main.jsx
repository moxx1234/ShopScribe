import { View, Text, StyleSheet } from "react-native"
import IconButton from "../../components/IconButton"
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import CustomModal from "../../components/CustomModal"
import AddShopForm from "../../components/shops/AddShopForm"
import { useState } from "react"
import ShopsList from "../../components/shops/ShopsList"

const Main = () => {
	const [modalOpen, setModalOpen] = useState(false)

	const handlePress = () => {
		setModalOpen(true)
	}
	const handleClose = () => {
		setModalOpen(false)
	}
	return (
		<View style={{ flex: 1 }}>
			<CustomModal
				isOpen={modalOpen}
				onClose={handleClose}
				title='Добавить магазин'
			>
				<AddShopForm onModalClose={handleClose} />
			</CustomModal>
			<ShopsList />
			<IconButton
				Icon={MaterialIcons}
				size={50}
				name='add-shopping-cart'
				style={{ ...styles.buttonWrapper, ...styles.buttonIcon }}
				onPress={handlePress}
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
		color: '#fff',
	}
}
const styles = StyleSheet.create({
	...addButtonStyle
})

export default Main