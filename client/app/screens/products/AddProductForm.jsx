import { Formik } from 'formik'
import React from 'react'
import { View } from 'react-native'
import * as yup from 'yup'
import InputGroup from '../../components/form/InputGroup'
import SubmitButton from '../../components/form/SubmitButton'

const AddProductForm = ({ onSubmit }) => {
	const initialValues = { name: '', category: '', units: '', price: '', quantity: '' }

	const schema = yup.object({
		name: yup.string().required('Заполните имя!'),
		category: yup.string().required('Заполните это поле!'),
		units: yup.string().required('Укажите единицу измерения!'),
		price: yup.number().required('Укажите цену за единицу товара!'),
		quantity: yup.number().required('Укажите количество товара!')
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
						name='category'
						label='Категория'
						type='text'
						onChange={handleChange}
						onBlur={handleBlur}
						value={values.category}
						error={errors.category}
						touched={touched.category}
					/>
					<InputGroup
						name='units'
						label='Единицы измерения'
						type='text'
						onChange={handleChange}
						onBlur={handleBlur}
						value={values.units}
						error={errors.units}
						touched={touched.units}
					/>
					<InputGroup
						name='price'
						label='Цена'
						type='number'
						onChange={handleChange}
						onBlur={handleBlur}
						value={values.price}
						error={errors.price}
						touched={touched.price}
					/>
					<InputGroup
						name='quantity'
						label='Количество'
						type='number'
						onChange={handleChange}
						onBlur={handleBlur}
						value={values.quantity}
						error={errors.quantity}
						touched={touched.quantity}
					/>
					<SubmitButton title='Создать' onSubmit={handleSubmit} disabledProps={[isSubmitting, isValid, touched]} />
				</View>
			)}
		</Formik>
	)
}

export default AddProductForm