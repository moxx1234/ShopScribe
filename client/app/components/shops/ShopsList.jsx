import { useEffect, useState } from "react"
import { StyleSheet, Text, FlatList } from "react-native"
import { getShops } from "../../../api/shops"
import ShopItem from "./ShopItem"
import { useNavigation } from '@react-navigation/native'

const ShopsList = () => {
	const [shops, setShops] = useState([])
	const navigation = useNavigation()

	useEffect(() => {
		getShops()
			.then(response => setShops(response.shops))
			.catch(error => console.error(error))
	}, [])

	return (
		shops.length ? <FlatList
			data={shops}
			renderItem={({ item }) => <ShopItem onChoice={() => navigation.navigate('Market', { marketName: item.name })} name={item.name} category={item.category} />}
		/>
			: <Text>Loading...</Text>
	)
}



export default ShopsList