import { ScrollView, StyleSheet, Text, View } from "react-native"
import { useTheme } from '../../context/ThemeProvider'

const Shop = ({ route }) => {
	const { themeStyles } = useTheme()
	const market = route.params.market
	return (
		<ScrollView style={{ padding: 15 }}>
			{Object.entries(market).map(([key, value]) => (
				value && key !== 'id' && (
					<View key={key} style={styles.container}>
						<Text style={[themeStyles.text, styles.key]}>{`${key}:`}</Text>
						<Text style={[themeStyles.text, styles.value]}>{`${value}`}</Text>
					</View>
				)
			))}
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
	}
})

export default Shop