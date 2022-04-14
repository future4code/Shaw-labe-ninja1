import React from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { HEADERS } from '../../constants/headers'
import { BASE_URL } from '../../constants/urls'

const DivCreateService = styled.div`
    display: flex; 
    flex-direction: column;
    align-items:center;
    margin: 10vh;

    h1 {
        text-decoration: underline;
        margin-bottom: 5vh;
    }

    input, select, button {
        padding: 0.5vh 0.5vw;
        margin: 1vh;
        width: 200px;
    } 
`


export default class CreateServicePage extends React.Component {

    state = {
        inputTitle: "",
        inputDescription: "",
        inputPrice: "",
        inputPaymentMethod: [],
        inputDueDate: ""
    }

    createService = () => {
        const body = {
            title: this.state.inputTitle,
            description: this.state.inputDescription,
            price: Number(this.state.inputPrice),
            paymentMethods: this.state.inputPaymentMethod,
            dueDate: this.state.inputDueDate
        }

        axios.post(`${BASE_URL}/jobs`, body, HEADERS)
        .then((res) => {
            alert("Serviço cadastrado com sucesso!")
            this.setState({
                inputTitle: "",
                inputDescription: "",
                inputPrice: "",
                inputPaymentMethod: [],
                inputDueDate: ""
            })
        })
        .catch((err) => {
            alert("Não foi possível registrar o serviço.")
        })
    }

    onChangeTitle = (e) => {
        this.setState({ inputTitle: e.target.value })
    }

    onChangeDescription = (e) => {
        this.setState({ inputDescription: e.target.value })
    }

    onChangePrice = (e) => {
        this.setState({ inputPrice: e.target.value })
    }

    onChangePaymentMethod = (e) => {
        const addPaymentMethod = [...this.state.inputPaymentMethod, e.target.value]
        this.setState({ inputPaymentMethod: addPaymentMethod })
    }

    onChangeDueDate = (e) => {
        this.setState({ inputDueDate: e.target.value })
    }

    render() {

        const PaymentMethodsUnique = new Map();

        this.state.inputPaymentMethod.forEach((method) => {
            if (!PaymentMethodsUnique.has(method)) {
                PaymentMethodsUnique.set(method)
            }
            return (
                <div>
                    <p>{method}</p>
                </div>
            )
        })

        return (

            <DivCreateService>
                <h1>Cadastre o seu serviço</h1>

                <input
                    onChange={this.onChangeTitle}
                    value={this.state.inputTitle}
                    placeholder='Título'
                />
                <input
                    onChange={this.onChangeDescription}
                    value={this.state.inputDescription}
                    placeholder='Descrição'
                />
                <input
                    onChange={this.onChangePrice}
                    value={this.state.inputPrice}
                    placeholder='R$'
                    type={'number'}
                />
                <select onChange={this.onChangePaymentMethod}>
                    <option value={" Cartão de débito "}>Cartão de débito</option>
                    <option value={" Cartão de crédito "}>Cartão de crédito</option>
                    <option value={" Paypal "}>Paypal</option>
                    <option value={" Boleto "}>Boleto</option>
                    <option value={" Pix "}>Pix</option>
                </select>
                
                {PaymentMethodsUnique}
                
                <input
                    onChange={this.onChangeDueDate}
                    value={this.state.inputDueDate}
                    type={'date'}
                />

                <button onClick={this.createService}>
                    Cadastrar
                </button>
            </DivCreateService>
        )
    }
}
