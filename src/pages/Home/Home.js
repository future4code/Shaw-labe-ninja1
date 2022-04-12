import React from 'react'
import axios from 'axios'
import { BASE_URL } from '../../constants/urls'
import { HEADERS } from '../../constants/headers'

export default class Home extends React.Component {
    state = {
        cart: [],
        idServiceClick: ""
    }

    getJobById = (id) => {
        const url = `${BASE_URL}/jobs/${id}`

        axios.get(url,{ HEADERS })
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err.response))
    }

    render() {
        return (
            <div>
                <h1>LabeNinjas</h1>
                <button onClick={this.props.goToCreateServicePage}>Cadastrar um serviço</button>
                <button onClick={this.props.goToServicePage}>Contratar um serviço</button>
            </div>
        )
    }
}