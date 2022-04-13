import React from 'react'
import axios from 'axios'
import { BASE_URL } from '../../constants/urls'
import { HEADERS } from '../../constants/headers'
// import { Card } from '@material-ui/core'




export default class ServicePage extends React.Component {

    state = {
        serviceList: [],
    }

    componentDidMount () {
        this.getAllServices()
    }

    getAllServices = () => {
        axios
            .get(`${BASE_URL}/jobs`, HEADERS)
            .then((res) => {
                this.setState({ serviceList: res.data.jobs })
            })
            .catch((err) => {
                console.log(err.response)
            })
    }

    render() {

        const services = this.state.serviceList.map((service) => {
            return (
                <div key={service.id}>
                    <h2>{service.title}</h2>
                    <h4>{service.price}</h4>
                    <h5>{service.dueDate}</h5>
                    <button onClick={() => this.props.detailsPage(service.id)}>Ver detalhes</button>
                    <button>Adicionar no carrinho</button>
                </div>
            )
        })

        return (
            <div align={"center"}>
                <br />
                <br />
                <br />
                {services}
                Service Page
                🪧
                🪧
                🪧
            </div>
        )
    }
}