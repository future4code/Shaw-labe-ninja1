import React from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { BASE_URL } from '../../constants/urls'
import { HEADERS } from '../../constants/headers'
import { RemoveShoppingCartSharp } from '@material-ui/icons'

const ServiceDiv = styled.div`
    display: grid;
    margin: 10px;
    border: 1px solid black;
    width: 25vw;
    height: 30vh;
`

const FiltersDiv = styled.div`
    display: flex;
    justify-content: center;
    margin: 5vh;

    input, span {
        margin: 0px 5px;
    }
`

export default class ServicePage extends React.Component {

    state = {
        serviceList: [],
        sort: "title",
    }

    componentDidMount() {
        this.getAllServices()
    }

    getAllServices = () => {
        axios.get(`${BASE_URL}/jobs`, HEADERS)
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
                    default:
                        return this.state.sort
                        
                }
            })
    }

    onChangeSort = (e) => {
        this.setState({ sort: e.target.value })
    }

    render() {
        const getFilteredAndSortedList = this.getFilteredAndSortedList()

        const services = getFilteredAndSortedList.map((service) => {

        const date = new Date();
        const dateString = date.getDate()  + "/" + (date.getMonth()+1) + "/" + date.getFullYear()

            return (
                <ServiceDiv key={service.id}>
                    <h2>{service.title}</h2>
                    <h3>R$ {service.price}</h3>
                    <h4>{dateString}</h4>
                    <button onClick={() => this.props.detailsPage(service.id)}>Ver detalhes</button>
                    <button onClick={() => this.props.addServiceInCart(service)}>Adicionar no carrinho</button>
                </ServiceDiv>
            )
        })

        return (

            <div>
                <FiltersDiv>
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
                </FiltersDiv>

                <div align={"center"}>
                    {this.state.serviceList.length ? services : "carregando..."}
                </div>
            </div>
        )
    }
}