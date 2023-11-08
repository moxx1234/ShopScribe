import { NavigationContainer } from '@react-navigation/native'
import SignInScreen from './auth/SignIn'
import SignUpScreen from './auth/SignUp'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useAuth } from '../context/UserProvider'
import Loading from './Loading'
import Navigator from './Navigator'
import Shop from './shop/Shop'

const Stack = createNativeStackNavigator()

const Layout = () => {
	const { isLoading, isSignedIn } = useAuth()
	return (
		<NavigationContainer>
			<Stack.Navigator>
				{
					!isLoading ?
						(
							isSignedIn ?
								<>
									<Stack.Screen name='Navigator' options={{ headerShown: false }} component={Navigator} />
									<Stack.Screen name='Market' options={{ title: 'Магазин' }} component={Shop} />
								</>
								:
								<>
									<Stack.Screen name='SignIn' component={SignInScreen} options={{ title: 'Вход' }} />
									<Stack.Screen name='SignUp' component={SignUpScreen} options={{ title: 'Регистрация' }} />
								</>
						)
						:
						<Stack.Screen name='Loading' component={Loading} options={{ headerShown: false }} />
				}
			</Stack.Navigator>
		</NavigationContainer>
	)
}

export default Layout