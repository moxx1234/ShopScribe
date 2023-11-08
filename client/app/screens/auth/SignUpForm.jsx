import { Formik } from "formik"
import * as yup from 'yup'
import * as SecureStore from 'expo-secure-store'
import InputGroup from "../../components/form/InputGroup"
import SubmitButton from "../../components/form/SubmitButton"
import { View } from "react-native"
import { useAuthUpdate } from "../../context/UserProvider"
import { authenticateUser, authorizeUser } from "../../../api/auth"

const SignUpForm = () => {
	const updateUserState = useAuthUpdate()
	const initialValues = { email: '', password: '', passwordRepeat: '' }
	const schema = yup.object({
		email: yup.string().email('Неверный email').required('Введите свой email'),
		password: yup.string().required('Введите свой пароль'),
		passwordRepeat: yup.string().oneOf([yup.ref('password'), ''], 'Пароли не совпадают!').required('Введите свой пароль')
	})

	const handleSubmit = (values, onSubmitProps) => {
		authenticateUser('register', values)
			.then((response) => {
				SecureStore.setItemAsync('token', response.JWT)
				authorizeUser(response.JWT).then(response => {
					updateUserState({ type: 'login', setAdmin: response.isAdmin })
				})
			})
			.catch(error => {
				if (error.field) return onSubmitProps.setErrors({ [error.field]: [error.message] })
				alert(error)
			})
			.finally(() => { onSubmitProps.setSubmitting(false) })
	}

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={schema}
			onSubmit={handleSubmit}
		>
			{({ handleChange, handleBlur, handleSubmit, values, errors, isSubmitting, touched, isValid }) => (
				<View>
					<InputGroup
						name='email'
						label='Email'
						type='email'
						onChange={handleChange}
						onBlur={handleBlur}
						value={values.email}
						error={errors.email}
						touched={touched.email}
					/>
					<InputGroup
						name='password'
						label='Пароль'
						type='password'
						onChange={handleChange}
						onBlur={handleBlur}
						value={values.password}
						error={errors.password}
						touched={touched.password}
					/>
					<InputGroup
						name='passwordRepeat'
						label='Повторите пароль'
						type='password'
						onChange={handleChange}
						onBlur={handleBlur}
						value={values.passwordRepeat}
						error={errors.passwordRepeat}
						touched={touched.passwordRepeat}
					/>
					<SubmitButton title='Зарегистрироваться' onSubmit={handleSubmit} disabledProps={[isSubmitting, isValid, touched]} />
				</View>
			)}
		</Formik>
	)
}

export default SignUpForm