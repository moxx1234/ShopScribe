import { Text, View, Pressable, StyleSheet } from 'react-native'

const ShopItem = ({ onChoice, name, category }) => {

	return (
		<Pressable onPress={onChoice}>
			<View style={styles.row}>
				<View style={styles.column}>
					<Text style={[styles.text, styles.name]}>{name}</Text>
				</View>
				<View style={styles.column}>
					<Text style={styles.text}>{category}</Text>
				</View>
			</View>
		</Pressable>
	)
}

const styles = StyleSheet.create({
	row: {
		padding: 5,
		marginBottom: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
		borderWidth: 1
	},
	column: {
		flexBasis: '50%',
	},
	text: {
		fontSize: 18,
		textAlign: 'center',
	},
	name: {
		fontWeight: 'bold'
	}
})

export default ShopItem