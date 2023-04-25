import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(baseUrl).then(res => res.data)
}
const create = (newPerson) => {
    return axios.post(baseUrl, newPerson).then(res => res.data)
}
const update = (id, newObject) => {
    return axios.put(`${baseUrl}/${id}`, newObject).then(res => res.data)
}
const deleted = (id) => {
    axios.delete(`${baseUrl}/${id}`).then(res => res.data)
    return getAll()
}

const phoneBook = {getAll, create, update, deleted}

export default phoneBook