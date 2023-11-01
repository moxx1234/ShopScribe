import { Text, TouchableOpacity, StyleSheet, View } from "react-native"
import AuthInput from "../../components/AuthInput"
import { useState } from "react"
import { authenticateUser, authorizeUser } from "../../../api/auth"
import * as SecureStore from 'expo-secure-store'
import { useAuthUpdate } from "../../context/UserProvider"

const rules = {
	'SignIn': {
		email: {
			required: {
				message: 'Пожалуйста, введите свой email'
			},
			isEmail: {
				message: 'Неверный email адрес'
			}
		},
		password: {
			required: {
				message: 'Пожалуйста, введите пароль'
			}
		}
	},
	'SignUp': {
		email: {
			required: {
				message: 'Пожалуйста, введите свой email'
			},
			isEmail: {
				message: 'Неверный email адрес'
			}
		},
		password: {
			required: {
				message: 'Пожалуйста, введите пароль'
			},
			passwordMatch: {
				message: 'Пароли не совпадают'
			}
		},
		passwordRepeat: {
			passwordMatch: {
				message: 'Пароли не совпадают'
			}
		}
	}
}

const AuthForm = ({ title, formType }) => {
	const initialValues = formType === 'SignIn' ? { email: '', password: '' } : { email: '', password: '', passwordRepeat: '' }
	const [inputs, setInputs] = useState(initialValues)
	const [errors, setErrors] = useState(initialValues)
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [formSubmitted, setFormSubmitted] = useState(false)
	const updateUserState = useAuthUpdate()

	const validateField = (value, fieldName) => {
		let valid = true
		setErrors(prevState => ({ ...prevState, [fieldName]: '' }))
		const fieldRules = rules[formType][fieldName]
		if (fieldRules.required && !value) {
			setErrors((prevState) => ({ ...prevState, [fieldName]: fieldRules.required.message }))
			return valid = false
		}
		if (fieldRules.isEmail && !value.match(/.+@.+\..+/g)) {
			setErrors(prevState => ({ ...prevState, [fieldName]: fieldRules.isEmail.message }))
			return valid = false
		}
		if (fieldRules.passwordMatch) {
			const vehicle = fieldName === 'password' ? 'passwordRepeat' : 'password'
			setErrors(prevState => ({ ...prevState, [vehicle]: '' }))
			if (value !== inputs[vehicle]) {
				setErrors(prevState => ({ ...prevState, [fieldName]: fieldRules.passwordMatch.message, [vehicle]: fieldRules.passwordMatch.message }))
				return valid = false
			}
		}
		return valid
	}
	const validateForm = () => {
		const isValid = Object.entries(inputs).map(([name, value]) => validateField(value, name)).every(validField => validField)
		return isValid
	}

	const handleChange = (value, fieldName) => {
		setInputs(prevState => ({ ...prevState, [fieldName]: value }))
		if (formSubmitted) validateField(value, fieldName)
	}
	const handleSubmit = (action) => {
		const isValid = validateForm()
		setFormSubmitted(true)
		if (!isValid) return

		sendData(action)
	}

	const sendData = async (action) => {
		setIsSubmitting(true)
		const userData = { email: inputs.email, password: inputs.password }
		return await authenticateUser(action, userData)
			.then((response) => {
				SecureStore.setItemAsync('token', response.JWT)
				authorizeUser(response.JWT).then(response => {
					updateUserState({ type: 'login', setAdmin: response.isAdmin })
				})
			})
			.catch(error => {
				if (error.field) return setErrors(prevState => ({ ...prevState, [error.field]: [error.message] }))
				alert('something went wrond!')
				throw error
			})
			.finally(() => { setIsSubmitting(false) })
	}

	return formType === 'SignIn' ? (
		<>
			<Text style={styles.title}>{title}</Text>
			<View style={styles.form}>
				<View style={styles.inputsContainer}>
					<AuthInput name='email' type='email' value={inputs.email} error={errors.email} onChange={handleChange} />
					<AuthInput name='password' type='password' value={inputs.password} error={errors.password} onChange={handleChange} />
				</View>
				<TouchableOpacity
					disabled={isSubmitting}
					style={isSubmitting ? { ...styles.button, ...styles.disabled } : styles.button}
					onPress={() => handleSubmit('login')}
				>
					<Text style={styles.buttonText}>Войти</Text>
				</TouchableOpacity>
			</View>
		</>
	) : (
		<>
			<Text style={styles.title}>{title}</Text>
			<View style={styles.form}>
				<View style={styles.inputsContainer}>
					<AuthInput name='email' type='email' value={inputs.email} error={errors.email} onChange={handleChange} />
					<AuthInput name='password' type='password' value={inputs.password} error={errors.password} textContentType='newPassword' onChange={handleChange} />
					<AuthInput name='passwordRepeat' type='password' value={inputs.passwordRepeat} error={errors.passwordRepeat} placeholder='Повторите пароль' onChange={handleChange} />
				</View>
				<TouchableOpacity
					disabled={isSubmitting}
					style={isSubmitting ? { ...styles.button, ...styles.disabled } : styles.button}
					onPress={() => handleSubmit('register')}
				>
					<Text style={styles.buttonText}>Зарегистрироваться</Text>
				</TouchableOpacity>
			</View>
		</>
	)
}

const styles = StyleSheet.create({
	title: {
		fontSize: 36,
		fontWeight: 'bold',
	},
	form: {
		marginTop: 30
	},
	inputsContainer: {
		marginBottom: 10
	},
	button: {
		padding: 10,
		backgroundColor: 'blue',
		opacity: 1
	},
	disabled: {
		opacity: 0.5,
		backgroundColor: '#77a8f7'
	},
	buttonText: {
		color: 'white',
		fontSize: 18,
		fontWeight: 'bold'
	},
})

export default AuthForm