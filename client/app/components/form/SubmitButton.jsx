import { TouchableOpacity, Text, StyleSheet } from 'react-native'

const SubmitButton = ({ title, onSubmit, disabledProps }) => {
	const [isSubmitting, isValid, touched] = disabledProps
	const disabled = isSubmitting || (Object.values(touched).some(value => value === true) && !isValid)
	return (
		<TouchableOpacity disabled={disabled} onPress={onSubmit} style={[styles.button, disabled && styles.disabled]}>
			<Text style={styles.text}>{title}</Text>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	button: {
		backgroundColor: 'rgb(0,122,255)',
		padding: 10,
		borderRadius: 10,
	},
	disabled: {
		opacity: 0.5,
	},
	text: {
		color: 'white',
		fontWeight: 'bold',
		fontSize: 20
	},
})

export default SubmitButton