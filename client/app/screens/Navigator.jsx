import { DrawerContentScrollView, createDrawerNavigator, DrawerItemList, DrawerItem } from '@react-navigation/drawer'
import Main from './main/Main'
import { useAuth, useAuthUpdate } from '../context/UserProvider'
import { endUserSession } from '../../api/auth'
import AdminControls from './admin/AdminControls'
import { useTheme } from '../context/ThemeProvider'
import { Icon } from 'react-native-paper'
import { TouchableOpacity, View, StyleSheet, Appearance, useColorScheme } from 'react-native'

const Drawer = createDrawerNavigator()

const ThemeIcon = ({ toggleTheme, isDark }) => {

	return (
		<View style={styles.icon}>
			<TouchableOpacity onPress={toggleTheme}>
				<Icon
					source={isDark ? 'white-balance-sunny' : 'moon-waning-crescent'}
					size={40}
					color=''
				/>
			</TouchableOpacity>
		</View>
	)
}

const CustomDrawerContent = (props) => {
	const updateUserState = useAuthUpdate()

	const logout = () => {
		endUserSession()
		updateUserState({ type: 'logout' })
	}

	return (
		<DrawerContentScrollView {...props}>
			<ThemeIcon {...props} />
			<DrawerItemList {...props} />
			<DrawerItem label="Выйти" onPress={() => logout()} />
		</DrawerContentScrollView>
	)
}

const Navigator = () => {
	const { isAdmin } = useAuth()
	const { themeStyles, ...rest } = useTheme()
	return (
		<Drawer.Navigator screenOptions={{ headerTintColor: themeStyles.text.color }} drawerContent={(props) => CustomDrawerContent({ ...props, ...rest })}>
			<Drawer.Screen name='Home' options={{ title: 'Главная' }} component={Main} />
			{
				isAdmin && <Drawer.Screen name='AdminPanel' options={{ title: 'Панель управления' }} component={AdminControls} />
			}
		</Drawer.Navigator>
	)
}

const styles = StyleSheet.create({
	icon: {
		margin: 10,
		flex: 1,
		alignItems: 'flex-end'
	}
})

export default Navigator