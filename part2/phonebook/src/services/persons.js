import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  return axios.get(baseUrl)
}

const create = newObject => {
  return axios.post(baseUrl, newObject)
}

const deleteNumber = id => {
    return axios.delete(baseUrl + '/' + id)
}

const updateNumber = (id, name, number) => {
    return axios.put(baseUrl+ '/' + id, 
                    {number:`${number}`,
                    name:`${name}`
                     })
}

const exports = {getAll, create, deleteNumber, updateNumber}

export default exports

