import { View } from 'react-native'
import { Formik } from 'formik'
import * as yup from 'yup'
import SubmitButton from '../form/SubmitButton'
import InputGroup from '../form/InputGroup'
import { addShop } from '../../../api/shops'

const AddShopForm = ({ onModalClose = null }) => {
	const initialValues = { name: '', owner: '', phone: '', address: '', remark: '' }

	const schema = yup.object({
		name: yup.string().trim().required('Введите название магазина'),
		owner: yup.string().trim().required('Введите имя владельца'),
		phone: yup.number().required('Введите номер телефона'),
		address: yup.string().trim().required('Введите адрес')
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
				if (error.message) return alert(error)
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
						name='owner'
						label='Имя владельца'
						type='text'
						onChange={handleChange}
						onBlur={handleBlur}
						value={values.owner}
						error={errors.owner}
						touched={touched.owner}
					/>
					<InputGroup
						name='phone'
						label='Номер телефона'
						type='phone'
						onChange={handleChange}
						onBlur={handleBlur}
						value={values.phone}
						error={errors.phone}
						touched={touched.phone}
					/>
					<InputGroup
						name='address'
						label='Адрес'
						type='text'
						onChange={handleChange}
						onBlur={handleBlur}
						value={values.address}
						error={errors.address}
						touched={touched.address}
					/>
					<InputGroup
						name='remark'
						label='Примечание'
						type='textarea'
						onChange={handleChange}
						onBlur={handleBlur}
						value={values.remark}
						error={errors.remark}
						touched={touched.remark}
					/>
					<SubmitButton title='Создать' onSubmit={handleSubmit} disabledProps={[isSubmitting, isValid, touched]} />
				</View>
			)}
		</Formik>
	)
}

export default AddShopForm