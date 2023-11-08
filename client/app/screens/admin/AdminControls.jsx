import { Text } from 'react-native'
import { authorizeUser } from '../../../api/auth'
import { useAuthUpdate } from '../../context/UserProvider'
import { useEffect } from 'react'

export const authorizeAdmin = async () => {
	return await authorizeUser()
		.then(response => {
			if (!response.isAdmin) {
				throw { message: 'Unauthorized attempt to control panel!' }
			}
		})
		.catch(error => error.message || error)
}

const AdminControls = ({ navigation }) => {
	const updateUser = useAuthUpdate()

	useEffect(() => {
		authorizeAdmin().catch(error => {
			console.error(error)
			navigation.navigate('Home')
			updateUser({ type: 'checkAdmin', setAdmin: false })
		})
	}, [])

	return (
		<Text>Admin Controls</Text>
	)
}

export default AdminControls