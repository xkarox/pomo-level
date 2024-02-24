export const API_URL = "http://localhost:8000/"

export var USERNAME = ""

export function SetUsername(username: string) {
  USERNAME = username
  localStorage.setItem("username", username)
}
