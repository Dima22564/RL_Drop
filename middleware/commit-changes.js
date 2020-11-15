import axios from 'axios'
export default async function ({ store, redirect, route }) {
  const formData = {}
  formData.token = route.params.token
  try {
    const result = await axios.post('http://localhost:8000/api/password-update', formData)
    if (!result.data.success) {
      redirect('/')
    }
  } catch (e) {
    redirect('/')
  }
}
