export const getToken = async () => localStorage.getItem('token')

export const tokenFormated = async () => `Bearer ${await getToken()}`

export const saveToken = async val => localStorage.setItem('token', val);

export const tokenExists = async () => getToken().then(v => v ? Promise.resolve() : Promise.reject).catch(Promise.reject)
