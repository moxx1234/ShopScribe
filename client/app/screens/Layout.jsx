import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StatusBar } from 'react-native'
import { PaperProvider } from 'react-native-paper'
import { useTheme } from '../context/ThemeProvider'
import { useAuth } from '../context/UserProvider'
import Loading from './Loading'
import Navigator from './Navigator'
import SignInScreen from './auth/SignIn'
import SignUpScreen from './auth/SignUp'
import Shop from './shop/Shop'

const Stack = createNativeStackNavigator()

const Layout = () => {
	const { isLoading, isSignedIn } = useAuth()
	const { theme } = useTheme()

	return (
		<>
			<StatusBar />
			<PaperProvider theme={theme}>
				<NavigationContainer theme={theme}>
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
			</PaperProvider>
		</>
	)
}

export default Layout