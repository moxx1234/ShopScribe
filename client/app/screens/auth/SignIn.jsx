import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import SignInForm from './SignInForm'

const SignInScreen = ({ navigation }) => {
	const navigate = (page) => {
		navigation.navigate(page)
	}
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Войдите, чтобы продолжить!</Text>
			<SignInForm />
			<View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginTop: 30 }}>
				<Text style={{ fontSize: 18 }}>Нет аккаунта?</Text>
				<TouchableOpacity onPress={() => navigate('SignUp')}>
					<Text style={styles.link}>Зарегестрируйтесь!</Text>
				</TouchableOpacity>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingTop: 20,
		paddingHorizontal: 10
	},
	title: {
		fontSize: 36,
		fontWeight: 'bold',
		marginBottom: 20,
	},
	link: {
		color: 'blue',
		textDecorationLine: 'underline',
		fontSize: 18
	}
})

export default SignInScreen