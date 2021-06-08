import { useState, useCallback } from 'react'

const useHttp = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const acceleratorId = process.env.REACT_APP_ACCELERATOR_ID

  const request = useCallback(async (endpoint, method = 'GET', body = null, headers = {}) => {
    setLoading(true)
    const authData = JSON.parse(localStorage.getItem('userData') || sessionStorage.getItem('userData'))

    try {

      headers['Accelerator-Id'] = acceleratorId

      if (body) {
        body = JSON.stringify(body)
        headers['Content-Type'] = 'application/json'
      }

      if (authData) {
        headers['Authorization'] = `Bearer ${authData.auth_token}`
      }

      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}${endpoint}`, { method, body, headers })
      const data = await response.json()

      if (!response.ok) {
        throw { body: data, status: response.status }
      }

      setLoading(false)
      return data

    } catch (err) {
      setLoading(false)
      setError(err.message)
      throw err
    }
  }, [])

  return { loading, request, error }
}

export default useHttp
