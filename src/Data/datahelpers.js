import axios from 'axios'

const baseURL = 'https://w0ayb2ph1k.execute-api.us-west-2.amazonaws.com/production?moves='

// export async function getComputerPlay(moveArray) {
//     let newData
//     // axios.get(`${baseURL}[${moveArray.toString()}]`)
//     //     .then(res => {
//     //         console.log(res)
//     //         newData.Data = res.data
//     //         newData.Status = res.status
//     //     }).catch(err => {
//     //         newData.Data = err.response.data
//     //         newData.Status = err.response.status
//     //     })
//     try {
//         newData = axios.get(`${baseURL}[${moveArray.toString()}]`)
//     } catch (err) {
//         console.log(err.response)
//     }
//     console.log(newData)

//     return newData
// }

export const getComputerPlay = (arrayMove) => {
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