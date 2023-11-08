import { View } from 'react-native'
import { Formik } from 'formik'
import * as yup from 'yup'
import SubmitButton from '../form/SubmitButton'
import InputGroup from '../form/InputGroup'
import { addShop } from '../../../api/shops'

const AddShopForm = ({ onModalClose = null }) => {
	const initialValues = { name: '', category: '' }

	const schema = yup.object({
		name: yup.string().trim().required('Введите название магазина')
	})

	const handleSubmit = (values, onSubmitProps) => {
		const trimmedValues = Object.entries(values).reduce((result, [field, value]) => result = ({ ...result, [field]: value.trim() }), {})
		addShop(trimmedValues)
			.then(response => {
				alert(response.message)
				if (onModalClose) onModalClose()
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
			{({ handleChange, handleBlur, handleSubmit, values, errors, isSubmitting, isValid, touched }) => (
				<View>
					<InputGroup
						name='name'
						label='Название'
						type='text'
						onChange={handleChange}
						onBlur={handleBlur}
						value={values.name}
						error={errors.name}
						touched={touched.name}
					/>
					<InputGroup
						name='category'
						label='Категория'
						type='text'
						onChange={handleChange}
						onBlur={handleBlur}
						value={values.category}
						error={errors.category}
						touched={touched.category}
					/>
					<SubmitButton title='Создать' onSubmit={handleSubmit} disabledProps={[isSubmitting, isValid, touched]} />
				</View>
			)}
		</Formik>
	)
}

export default AddShopForm