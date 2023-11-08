import { TextInput, StyleSheet } from "react-native"

const TextField = ({ onChange, onBlur, name, value, error, style }) => {
	return (
		<TextInput
			style={style}
			onChangeText={onChange(name)}
			onBlur={onBlur(name)}
			value={value.replace(/\s\s/g, ' ')}
			inputMode="text"
		/>
	)
}

const styles = StyleSheet.create({
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
})

export default TextField