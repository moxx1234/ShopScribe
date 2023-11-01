import { View, StyleSheet } from 'react-native'
import AuthForm from './AuthForm'

const SignUpScreen = () => {
	return (
		<View style={styles.container}>
			<AuthForm title='Регистрация' formType='SignUp' />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingTop: 20,
		paddingHorizontal: 10,
	},
})

export default SignUpScreen