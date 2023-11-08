import { Formik } from 'formik'
import { View } from 'react-native'
import SubmitButton from '../../components/form/SubmitButton'
import InputGroup from '../../components/form/InputGroup'
import * as yup from 'yup'
import * as SecureStore from 'expo-secure-store'
import { authenticateUser, authorizeUser } from '../../../api/auth'
import { useAuthUpdate } from "../../context/UserProvider"

const SignInForm = () => {
	const updateUserState = useAuthUpdate()
	const initialValues = { email: '', password: '' }
	const schema = yup.object({
		email: yup.string().email('Неверный email').required('Введите свой email'),
		password: yup.string().required('Введите свой пароль')
	})

	const handleSubmit = (values, onSubmitProps) => {
		authenticateUser('login', values)
			.then((response) => {
				SecureStore.setItemAsync('token', response.JWT)
				console.log(response)
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
			onSubmit={handleSubmit}
			validationSchema={schema}
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
					<SubmitButton title='Войти' onSubmit={handleSubmit} disabledProps={[isSubmitting, isValid, touched]} />
				</View>
			)}
		</Formik>
	)
}

export default SignInForm