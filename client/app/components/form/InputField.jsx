import EmailField from './EmailField'
import PasswordField from './PasswordField'
import TextField from './TextField'

const InputField = ({ type, error, ...props }) => {
	switch (type) {
		case 'text': return <TextField {...props} />
		case 'email': return <EmailField {...props} />
		case 'password': return <PasswordField {...props} />
		default: throw new Error('unknown field type')
	}
}

export default InputField