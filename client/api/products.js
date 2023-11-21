import { REACT_APP_DEV_BACKEND_URL as BACK_URL } from '@env'
import { getToken } from './auth'

const headers = { 'Content-Type': 'application/json' }

export const addProduct = async (productInfo) => {
	const userToken = await getToken() || ''
	const URL = `${BACK_URL}/products/add`
	const body = JSON.stringify(productInfo)
	return await fetch(URL, {
		method: 'POST',
		headers: { ...headers, 'Authorization': 'Bearer ' + userToken },
		body
	})
		.then(async (response) => {
			if (!response.ok) throw await response.json()
			return response.json()
		})
		.catch(error => { throw error })
}

export const getProducts = async () => {
	const URL = `${BACK_URL}/products/all`
	return await fetch(URL, {
		method: 'GET',
		headers
	})
		.then(async (response) => {
			if (!response.ok) throw await response.json()
			return response.json()
		})
		.catch(error => { throw error })
}