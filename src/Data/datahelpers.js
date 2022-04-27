import axios from 'axios'

const baseURL = 'https://w0ayb2ph1k.execute-api.us-west-2.amazonaws.com/production?moves='

export const getComputerPlay = (arrayMove) => {
    console.log(arrayMove)
    return new Promise((resolve, reject) => {
        try {
            axios.get(`${baseURL}[${arrayMove.toString()}]`)
                .then((response) => {
                    const newData = {
                        Data: response.data,
                        Status: response.status
                    }
                    resolve(newData)
                }).catch((err) => {
                    const ErrorData = {
                        Data: err.response.data,
                        Status: err.response.status
                    }
                    reject(ErrorData)
                })
        } catch (err) {
            console.log(err)
        }
    })
}