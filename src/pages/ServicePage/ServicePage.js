import React from 'react'
import axios from 'axios'
import { BASE_URL } from '../../constants/urls'
import { HEADERS } from '../../constants/headers'
// import { Card } from '@material-ui/core'




export default class ServicePage extends React.Component {

    state = {
        serviceList: [],
        sort: "title",
    }

    componentDidMount() {
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

    getFilteredAndSortedList = () => {
        return this.state.serviceList
            .filter(service => service.price <= this.props.maxValue)
            .filter(service => service.price >= this.props.minValue)
            .filter(service => (service.title.toLowerCase() || service.description.toLowerCase()).includes(this.props.query.toLowerCase()))
            .sort((a, b) => {
                switch (this.state.sort) {
                    case "title":
                        return a.title.localeCompare(b.title)
                    case "dueDate":
                        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
                    case "minValue":
                        return a.price - b.price
                        case "maxValue":
                            return b.price - a.price
                }
            })
    }


    onChangeSort = (e) => {
        this.setState({ sort: e.target.value })
    }

    render() {
        const getFilteredAndSortedList = this.getFilteredAndSortedList()


        const services = getFilteredAndSortedList.map((service) => {
        //const services = this.state.serviceList.map((service) => {

            return (
                <div key={service.id}>
                    <h2>{service.title}</h2>
                    <h4>{service.price}</h4>
                    <h5>{service.dueDate}</h5>
                    <button onClick={() => this.props.detailsPage(service.id)}>Ver detalhes</button>
                    <button onClick={() => this.props.addServiceInCart(service)}>Adicionar no carrinho</button>
                </div>
            )
        })

        return (

            <div>
                <input
                    placeholder="Valor mínimo"
                    type={"number"}
                    value={this.props.minValue}
                    onChange={this.props.onChangeMinValue}
                />
                <input
                    placeholder="Valor máximo"
                    type={"number"}
                    value={this.props.maxValue}
                    onChange={this.props.onChangeMaxValue}
                />
                <input
                    placeholder="Título ou descrição"
                    value={this.props.query}
                    onChange={this.props.onChangeQuery}
                />
                <span>
                    <label for="sort">
                        <select name="sort"
                            value={this.state.sort}
                            onChange={this.onChangeSort}
                        >
                            <option>Sem ordenação</option>
                            <option value="minValue">Menor Valor</option>
                            <option value="maxValue">Maior Valor</option>
                            <option value="title">Título</option>
                            <option value="dueDate">Prazo</option>
                        </select>
                    </label>
                </span>

            <div align={"center"}>
                <br />
                {this.state.serviceList.length ? services : "carregando..."}
            </div>
        )
    }
}