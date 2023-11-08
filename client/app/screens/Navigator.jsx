import { DrawerContentScrollView, createDrawerNavigator, DrawerItemList, DrawerItem } from '@react-navigation/drawer'
import Main from './main/Main'
import { useAuth, useAuthUpdate } from '../context/UserProvider'
import { authorizeUser, endUserSession } from '../../api/auth'
import AdminControls from './admin/AdminControls'

const Drawer = createDrawerNavigator()

const CustomDrawerContent = (props) => {
	const updateUserState = useAuthUpdate()

	const logout = () => {
		endUserSession()
		updateUserState({ type: 'logout' })
	}

	return (
		<DrawerContentScrollView {...props}>
			<DrawerItemList {...props} />
			<DrawerItem label="Выйти" onPress={() => logout()} />
		</DrawerContentScrollView>
	)
}

const Navigator = ({ navigation }) => {
	const { isAdmin } = useAuth()
	return (
		<Drawer.Navigator drawerContent={(props) => CustomDrawerContent(props)}>
			<Drawer.Screen name='Home' options={{ title: 'Главная' }} component={Main} />
			{
				isAdmin && <Drawer.Screen name='AdminPanel' options={{ title: 'Панель управления' }} component={AdminControls} />
			}
		</Drawer.Navigator>
	)
}

export default Navigator