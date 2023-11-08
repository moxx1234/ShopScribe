import { REACT_APP_DEV_BACKEND_URL as BACK_URL } from '@env'
import * as SecureStore from 'expo-secure-store'

const headers = { 'Content-Type': 'application/json' }

export const authenticateUser = async (action, userData) => {
	const URL = `${BACK_URL}/auth/${action}`
	const body = JSON.stringify({
		email: userData.email,
		password: userData.password
	})
	return await fetch(URL, {
		method: 'POST',
		headers,
		body
	})
		.then(async (response) => {
			if (!response.ok) throw await response.json()
			return response.json()
		})
		.catch(error => { throw error })
}

export const getToken = async () => {
	return await SecureStore.getItemAsync('token')
		.catch(() => {
			alert('Something went wrong while authorization!')
			return null
		})
}
export const authorizeUser = async () => {
	const token = await getToken() || ''
	const URL = `${BACK_URL}/auth/login`
	return await fetch(URL, {
		method: 'GET',
		headers: { ...headers, 'Authorization': 'Bearer ' + token }
	})
		.then(async (response) => {
			if (!response.ok) { throw await response.json() }
			return response.json()
		})
		.catch(error => {
			throw error
		})
}
export const endUserSession = () => {
	SecureStore.deleteItemAsync('token')
}