import React from 'react'
import { TextInput, StyleSheet, Text } from 'react-native'

const inputTypes = {
	email: {
		textContentType: 'emailAddress',
		keyboardType: 'email-address',
	},
	password: {
		textContentType: 'password',
		secureTextEntry: true,
	},
}

const AuthInput = ({ type, name, placeholder = name, onChange, error, ...rest }) => {
	const inputParams = inputTypes[type]
	return (
		<>
			<TextInput
				placeholder={placeholder}
				autoCapitalize='none'
				autoCorrect={false}
				onChangeText={text => onChange(text.replace(/\s/g, ''), name)}
				{...inputParams}
				{...rest}
				style={[styles.input, { borderColor: error ? 'red' : styles.input.borderColor }]}
			/>
			{error && <Text style={styles.errorMessage}>{error}</Text>
			}
		</>
	)
}

const styles = StyleSheet.create({
	input: {
		borderColor: 'black',
		borderWidth: 2,
		paddingHorizontal: 10,
		paddingVertical: 5,
		marginTop: 10
	},
	errorMessage: {
		color: 'red',
		marginVertical: 5
	}
})

export default AuthInput