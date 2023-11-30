import { REACT_APP_DEV_BACKEND_URL as BACK_URL } from '@env'

const headers = { 'Content-Type': 'application/json' }

export const getDeal = async (shopId) => {
	const URL = `${BACK_URL}/sales?${new URLSearchParams({ shopId })}`
	return await fetch(URL, {
		headers
	})
		.then(async (response) => {
			if (!response.ok) throw await response.json()
			return response.json()
		})
		.catch(error => { throw error })
}

export const createDeal = async (shopId, productsInfo) => {
	const URL = `${BACK_URL}/sales/create`
	const body = JSON.stringify({
		[shopId]: productsInfo
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