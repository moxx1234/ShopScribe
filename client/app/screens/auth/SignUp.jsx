import { View, StyleSheet } from 'react-native'
import SignUpForm from './SignUpForm'

const SignUpScreen = () => {
	return (
		<View style={styles.container}>
			<SignUpForm />
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