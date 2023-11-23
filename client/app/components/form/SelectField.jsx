import React from 'react'
import DropDown from 'react-native-input-select'

const SelectField = (props) => {
	return (
		<DropDown options={props.options} onValueChange={props.onChange} {...props} />
	)
}

export default SelectField