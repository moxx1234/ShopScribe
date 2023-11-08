import { Text, StyleSheet, View } from "react-native"
import InputField from "./InputField"

const InputGroup = ({ label, error, touched, ...props }) => {
	const style = [styles.input, (error && touched) && styles.errorInput]
	return (
		<View>
			<Text style={styles.label}>{label}</Text>
			<InputField error={error} style={style} {...props} />
			{(error && touched) && <Text style={styles.errorMessage}>{error}</Text>}
		</View>
	)
}

const styles = StyleSheet.create({
	label: {
		fontSize: 20,
		marginBottom: 5,
	},
	input: {
		paddingVertical: 5,
		paddingHorizontal: 10,
		borderWidth: 1,
		borderColor: 'black',
		marginBottom: 10,
	},
	errorInput: {
		borderColor: 'red',
		marginBottom: 5,
	},
	errorMessage: {
		marginBottom: 10,
		color: 'red'
	},
})

export default InputGroup