import { View, Text } from "react-native"

const Shop = ({ route }) => {
	const params = route.params
	console.log(params)
	return (
		<View>
			<Text>{params.marketName}</Text>
		</View>
	)
}

export default Shop