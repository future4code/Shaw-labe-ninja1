import React from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { HEADERS } from '../../constants/headers'
import { BASE_URL } from '../../constants/urls'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const DivCreateService = styled.div`
    display: flex; 
    flex-direction: column;
    align-items:center;
    margin: 5vh;

    h1 {
        text-decoration: underline;
        text-align: center;
        margin-bottom: 5vh;
        color: #494949;
    }

    Button {
        margin: 5px;
    }
`

const ButtonMethod = styled.button`
    background: none;
    border: none;
    &:hover{
        cursor: pointer;
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
        this.setState({ inputPaymentMethod: this.state.inputPaymentMethod.includes(e.target.value) ? this.state.inputPaymentMethod : addPaymentMethod })
    }

    onChangeDueDate = (e) => {
        this.setState({ inputDueDate: e.target.value })
    }

    onClickDeleteMethod = (method) => {
        let array = this.state.inputPaymentMethod.filter((service) => service !== method);
		this.setState({ inputPaymentMethod: array })
    }

    render() {

        const PaymentMethodsUnique = this.state.inputPaymentMethod.map((method) => {
            return (
                <p> {method} <ButtonMethod onClick={() => this.onClickDeleteMethod(method)}>🗑️</ButtonMethod> </p>
            )
        })

        return (

            <DivCreateService>
                <h1>Cadastre o seu serviço</h1>

                <TextField  
                    id={"outlined-basic"} 
                    label={"Título"} 
                    variant={"outlined"} 
                    onChange={this.onChangeTitle}
                    value={this.state.inputTitle}
                    style={{  margin: 10, width: 300 }}
                />
                <TextField 
                    id={"outlined-multiline-static"}
                    label={"Descrição"}
                    multiline
                    rows={2}
                    variant={"outlined"}
                    onChange={this.onChangeDescription}
                    value={this.state.inputDescription}
                    style={{ margin: 10, width: 300 }}
                />
                <TextField
                    id={"outlined-number"}
                    label={"R$"}
                    type={"number"}
                    variant={"outlined"}
                    onChange={this.onChangePrice}
                    value={this.state.inputPrice}
                    style={{  margin: 10, width: 300 }}
                />
                <TextField
                    id="outlined-select-currency-native"
                    select
                    SelectProps={{
                        native: true,
                    }}
                    label="Formas de Pagamento"
                    variant="outlined" 
                    onChange={this.onChangePaymentMethod}
                    style={{ margin: 10, width: 300 }}
                >
                    <option value={" Cartão de débito "}>Cartão de débito</option>
                    <option value={" Cartão de crédito "}>Cartão de crédito</option>
                    <option value={" Paypal "}>Paypal</option>
                    <option value={" Boleto "}>Boleto</option>
                    <option value={" Pix "}>Pix</option>
                </TextField>
                
                {PaymentMethodsUnique}

                <TextField
                    id={"date"}
                    label={"Data de vencimento"}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={this.onChangeDueDate}
                    value={this.state.inputDueDate}
                    type={"date"}
                    variant="outlined" 
                    style={{ margin: 10, width: 300 }}
                />

                <Button 
                    onClick={this.createService}
                    variant="contained"
        			color="primary"
                >
                    Cadastrar
                </Button>
            </DivCreateService>
        )
    }
}
