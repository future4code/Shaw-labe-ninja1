import React from 'react'
import axios from 'axios'
import CreateServicePage from '../CreateServicePage/CreateServicePage'
import ServicePage from '../ServicePage/ServicePage'
import { BASE_URL } from '../../constants/urls'
import { HEADERS } from '../../constants/headers'

export default class Home extends React.Component {
    state = {
        screen: "Home",
        cart: [],
        idServiceClick: ""
    }

    goToCreateServicePage = () => {
        this.setState({ screen: "CreateServicePage" })
    }

    goToServicePage = () => {
        this.setState({ screen: "ServicePage" })
    }

    getJobById = (id) => {
        const url = `${BASE_URL}/jobs/${id}`
        axios.get(url,
            { HEADERS }
        ).then()
            .catch()
    }

    selectScreen = () => {
        switch (this.state.screen) {
            case "CreateServicePage":
                return <CreateServicePage />
            case "ServicePage":
                return <ServicePage />
            default:
                return <Home />
        }
    }

    render() {
        return (
            <div>
                <h1>LabeNinjas</h1>
                <button onClick={this.goToCreateServicePage}>Cadastrar um serviço</button>
                <button onClick={this.goToServicePage}>Contratar um serviço</button>
                {this.selectScreen()}
            </div>
        )
    }
}