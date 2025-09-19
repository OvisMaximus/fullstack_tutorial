const extractLogin = () => {
    const userJson = window.localStorage.getItem('loggedUser')
    return userJson ? JSON.parse(userJson) : null
}

const storeLogin = (user) =>
    window.localStorage.setItem('loggedUser', JSON.stringify(user))

export default { extractLogin, storeLogin }
