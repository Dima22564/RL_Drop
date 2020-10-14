import jwt from 'jsonwebtoken'

export default function ({ store, redirect }) {
  if (!isJWTAdmin(store.getters.getToken)) {
    return redirect('/admin/sign-in')
  }
}

function isJWTAdmin (token) {
  if (!token) {
    return false
  }

  const jwtData = jwt.decode(token) || {}
  const expires = jwtData.exp || 0
  const role = jwtData.role

  if (role === 'admin' && (new Date().getTime() / 1000) < expires) {
    return true
  }
  return false
}
