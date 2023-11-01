import 'react-native-gesture-handler'
import React from 'react'
import UserProvider from './app/context/UserProvider'

import Layout from './app/screens/Layout'

const App = () => {

	return (
		<UserProvider>
			<Layout />
		</UserProvider>
	)
}

export default App