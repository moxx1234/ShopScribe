import { Modal, View, Text, StyleSheet } from "react-native"
import IconButton from "./IconButton"
import Entypo from 'react-native-vector-icons/Entypo'

const CustomModal = ({ title, children, isOpen, onClose }) => {

	return (
		<Modal
			visible={isOpen}
			onRequestClose={onClose}
			animationType="fade"
			transparent={true}
		>
			<View style={styles.modalView}>
				{title && <View style={styles.header}>
					<Text style={styles.title}>{title}</Text>
					<IconButton
						Icon={Entypo}
						name='cross'
						size={30}
						onPress={onClose}
					/>
				</View>}
				<View style={styles.body}>{children}</View>
			</View>
		</Modal>
	)
}

const styles = StyleSheet.create({
	modalView: {
		flex: 1,
		margin: 20,
		backgroundColor: 'white',
		borderRadius: 20,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 10,
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		borderBottomColor: '#000',
		borderBottomWidth: 1,
		padding: 10,
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold'
	},
	body: {
		padding: 10,
		flex: 1,
	}
})

export default CustomModal