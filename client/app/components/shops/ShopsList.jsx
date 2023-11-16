import { useNavigation } from '@react-navigation/native'
import { useEffect, useState } from "react"
import { Text } from "react-native"
import { getShops } from "../../../api/shops"
import Table from "../table/Table"

const ShopsList = () => {
	const [shops, setShops] = useState()
	const navigation = useNavigation()

	useEffect(() => {
		getShops()
			.then(response => setShops(response.shops))
			.catch(error => console.error(error))
	}, [])

	const tableData = {
		titles: shops?.length && Object.keys(shops[0]).filter(title => title === 'name' || title === 'phone' || title === 'address'),
		body: shops
	}

	const handleMarketChoice = (id) => {
		const marketInfo = shops.find(market => market.id === id)
		navigation.navigate('Market', { market: marketInfo })
	}

	return (
		shops ?
			shops.length ?
				<Table data={tableData} onRowPress={handleMarketChoice} />
				:
				<Text>В списке нет магазинов!</Text>
			: <Text>Loading...</Text>
	)
}

export default ShopsList