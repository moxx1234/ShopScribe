import { Text, StyleSheet, View } from "react-native"
import InputField from "./InputField"
import { useTheme } from "../../context/ThemeProvider"

const InputGroup = ({ label, error, touched, ...props }) => {
	const { themeStyles } = useTheme()
	const inputStyle = [styles.input, themeStyles.border, themeStyles.text, (error && touched) && styles.errorInput]
	return (
		<View>
			<Text style={[styles.label, themeStyles.text]}>{label}</Text>
			<InputField error={error} style={inputStyle} {...props} />
			{(error && touched) && <Text style={styles.errorMessage}>{error}</Text>}
		</View>
	)
}

const styles = StyleSheet.create({
	label: {
		fontSize: 20,
		marginBottom: 5
	},
	input: {
		paddingVertical: 5,
		paddingHorizontal: 10,
		borderWidth: 1,
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