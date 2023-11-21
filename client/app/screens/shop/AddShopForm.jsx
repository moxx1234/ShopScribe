import { View } from 'react-native'
import { Formik } from 'formik'
import * as yup from 'yup'
import SubmitButton from '../../components/form/SubmitButton'
import InputGroup from '../../components/form/InputGroup'
import { addShop } from '../../../api/shops'

const AddShopForm = ({ onSubmit }) => {
	const initialValues = { name: '', owner: '', phone: '', address: '', remark: '' }

	const schema = yup.object({
		name: yup.string().trim().required('Введите название магазина'),
		owner: yup.string().trim().required('Введите имя владельца'),
		phone: yup.string().required('Введите номер телефона'),
		address: yup.string().trim().required('Введите адрес')
	})


	return (
		<Formik
			initialValues={initialValues}
			onSubmit={onSubmit}
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