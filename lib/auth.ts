// Simple authentication utilities
export const AUTH_CREDENTIALS = {
  username: "msharifulinfo",
  password: "16532Msia",
}

export function validateCredentials(username: string, password: string): boolean {
  return username === AUTH_CREDENTIALS.username && password === AUTH_CREDENTIALS.password
}

export function setAuthToken() {
  if (typeof window !== "undefined") {
    localStorage.setItem("notice-auth", "authenticated")
  }
}

export function removeAuthToken() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("notice-auth")
  }
}

export function isAuthenticated(): boolean {
  if (typeof window !== "undefined") {
    return localStorage.getItem("notice-auth") === "authenticated"
  }
  return false
}
