const TokenKey = 'access_token'
const ExpiresToken = 'expires_token'

export function getToken() {
  return localStorage.getItem(TokenKey)
}

export function setToken(token) {
  localStorage.setItem(ExpiresToken, `${token.expires_in}`)
  localStorage.setItem(TokenKey, `${token.token_type} ${token.access_token}`)
}

export function removeToken() {
  return localStorage.removeItem(TokenKey)
}

// Expires Token
export function getExpiresToken() {
  return localStorage.getItem(ExpiresToken)
}