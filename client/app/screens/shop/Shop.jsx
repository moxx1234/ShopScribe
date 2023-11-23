import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useTheme } from '../../context/ThemeProvider'
import { useState } from "react"
import CustomModal from "../../components/CustomModal"
import Form from "../../components/form/Form"
import * as yup from 'yup'
import InputGroup from "../../components/form/InputGroup"
import SubmitButton from '../../components/form/SubmitButton'

const Shop = ({ route }) => {
	const { themeStyles } = useTheme()
	const [modalOpen, setModalOpen] = useState(false)
	const initialValues = { product: '', quantity: '' }

	const market = route.params.market

	const schema = yup.object({
		product: yup.string().required('Выберите товар!')
	})

	const handleSubmit = (values, onSubmitProps) => {

	}
	return (
		<ScrollView style={{ padding: 15 }}>
			{Object.entries(market).map(([key, value]) => (
				value && key !== 'id' && (
					<View key={key} style={styles.container}>
						<Text style={[themeStyles.text, styles.key]}>{`${key}:`}</Text>
						<Text style={[themeStyles.text, styles.value]}>{`${value}`}</Text>
					</View>
				)
			))}
			<View style={styles.section}>
				<CustomModal isOpen={modalOpen} onClose={() => setModalOpen(false)} title='Создать продажу'>
					<ScrollView>
						<Form initialValues={initialValues} schema={schema} onSubmit={handleSubmit}>
							<InputGroup name='product' label='Выберите товар' type='text' />
							<InputGroup name='quantity' label='Количество' type='text' />
							<SubmitButton title='Создать' />
						</Form>
					</ScrollView>
				</CustomModal>
				<View style={[styles.container, styles.sectionHeader]}>
					<Text style={[themeStyles.text, styles.title]}>Продажи</Text>
					<TouchableOpacity style={styles.buttonContainer} onPress={() => setModalOpen(true)}>
						<Text style={styles.buttonText}>Создать продажу +</Text>
					</TouchableOpacity>
				</View>
			</View>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		flexWrap: 'wrap'
	},
	key: {
		fontSize: 18,
		marginRight: 10,
	},
	value: {
		fontSize: 20,
		fontWeight: 'bold'
	},
	section: {
		paddingTop: 20,
	},
	sectionHeader: {
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
	},
	buttonContainer: {
		backgroundColor: 'rgb(0,122,255)',
		borderRadius: 5,
		padding: 5,
	},
	buttonText: {
		color: '#fff'
	},
})

export default Shop