import React from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { BASE_URL } from '../../constants/urls'
import { HEADERS } from '../../constants/headers'
import { RemoveShoppingCartSharp } from '@material-ui/icons'
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

const ServiceDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    margin: 0.5rem;
    border: 0.5px solid black;
    width: 30vw;
    height: 30vh;
    border-radius: 50px; 
    box-shadow: 1px -1px 4px 1px;
    background-color: #bfb5e3;

    @media (min-width: 551px) and (max-width: 830px) {
        width: 45vw;
    }
    @media (max-width: 550px) {
        width: 80vw;
    }

    button {
        width: 9rem;
        margin: 0.1rem;
        height: 1.3rem;
        border: none;
        border-radius: 15px; 
        background-color: #7c67c4;
        opacity: 0.9;
        padding: 0.1rem;
        color: #fdedfd;
        &:hover{
            opacity: 1;
            cursor: pointer; 
            color: #7c67c4; 
            background-color: #fdedfd;
        }
    }
`

const ServiceList = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    text-align: center;
`

const FiltersDiv = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin: 5vh;

    input, span {
        margin: 0px 5px;
    }
`

export default class ServicePage extends React.Component {

    state = {
        serviceList: [],
        sort: "Sem ordenação",
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

    deleteService = (serviceId) => {
        axios.delete(`${BASE_URL}/jobs/${serviceId}`, HEADERS).then(() => {
            this.getAllServices();
        }).catch(err => {
            console.log(err.response);
        });
    }

    render() {
        const getFilteredAndSortedList = this.getFilteredAndSortedList()

        const services = getFilteredAndSortedList.map((service) => {

            const date = new Date(service.dueDate);
            const dateString = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()

            return (
                <ServiceDiv key={service.id}>
                    <div>
                        <h2>{service.title}</h2>
                        <h3>R$ {service.price}</h3>
                        <h4>{dateString}</h4>
                    </div>
                    <div>
                        <button onClick={() => this.props.detailsPage(service.id)}>Ver detalhes</button>
                        <button onClick={() => this.props.addServiceInCart(service)}>Adicionar no carrinho</button>
                        <button onClick={() => this.deleteService(service.id)}>Excluir serviço</button>
                    </div>
                </ServiceDiv>
            )
        })

        return (

            <div>
                <FiltersDiv>
                    <TextField
                        id={"outlined-basic"}
                        label={"Valor mínimo"}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                        }}
                        variant={"outlined"}
                        style={{ margin:5, width: 200 }}
                        type={"number"}
                        value={this.props.minValue}
                        onChange={this.props.onChangeMinValue}
                    />
                    <TextField
                        id={"outlined-basic"}
                        label={"Valor máximo"}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                        }}
                        variant={"outlined"}
                        style={{ margin:5, width: 200 }}
                        type={"number"}
                        value={this.props.maxValue}
                        onChange={this.props.onChangeMaxValue}
                    />
                    <TextField
                        id={"outlined-basic"}
                        label={"Título ou descrição"}
                        variant={"outlined"}
                        style={{ margin:5, width: 200 }}
                        value={this.props.query}
                        onChange={this.props.onChangeQuery}
                    />
                    <span>
                        <label for="sort">
                            <TextField
                                id="outlined-select-currency-native"
                                select
                                SelectProps={{
                                    native: true,
                                }}
                                label="Ordenação"
                                variant="outlined"
                                name="sort"
                                style={{ margin:5 }}
                                value={this.state.sort}
                                onChange={this.onChangeSort}
                            >
                                <option>Sem ordenação</option>
                                <option value="minValue">Menor Valor</option>
                                <option value="maxValue">Maior Valor</option>
                                <option value="title">Título</option>
                                <option value="dueDate">Prazo</option>
                            </TextField>
                        </label>
                    </span>
                </FiltersDiv>

                <ServiceList align={"center"}>
                    {this.state.serviceList.length ? services : "carregando..."}
                </ServiceList>
            </div>
        )
    }
}