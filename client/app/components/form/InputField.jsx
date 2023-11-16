import EmailField from './EmailField'
import MultilineField from './MultilineField'
import PasswordField from './PasswordField'
import PhoneField from './PhoneField'
import TextField from './TextField'

const InputField = ({ type, error, ...props }) => {
	switch (type) {
		case 'text': return <TextField {...props} />
		case 'email': return <EmailField {...props} />
		case 'password': return <PasswordField {...props} />
		case 'phone': return <PhoneField {...props} />
		case 'textarea': return <MultilineField {...props} />
		default: throw new Error('unknown field type')
	}
}

export default InputField