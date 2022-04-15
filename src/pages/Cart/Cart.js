import React from 'react'
import styled from 'styled-components'
import { ThemeProvider } from '@material-ui/styles';
import { theme } from "../../constants/theme"
import Button from '@material-ui/core/Button';

const CartDiv = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px;
    padding: 5px;
    border: 1px solid black;
    height: 10vh;
    border-radius: 5%; 
  box-shadow: 1px -1px 4px 1px;
  background-color: #bfb5e3;
    
    button {
        padding: 5px;
        width: 25px;
        border-radius: 40%;
        border: transparent;
        background-color: #bfb5e3;
        &:hover{
            opacity: 1;
            cursor: pointer; 
            color: #7c67c4; 
            background-color: #fdedfd;
    }
`

const EndPushed = styled.div`
    display: flex;
    flex-direction: column;
    margin: 10px;

    p {
        font-size: 1.3em;
        margin-bottom: 10px;
    }

    button {
        width: 8vw;
        margin-bottom: 5px;
    }
`

export default class Cart extends React.Component {

    render() {

        const services = this.props.cart.map((service) => {
            return (
                <CartDiv>
                    <h2> {service.title} </h2>
                    <p> R${service.price},00 </p>
                    <button onClick={() => this.props.deleteServiceFromCart(service.id)}>🗑️</button>
                </CartDiv>
            )
        })

        let soma = 0
        const cartSum = this.props.cart.map((service) => {
            return (soma += service.price)
        })

        return (
            <ThemeProvider theme={theme}>
            <div>
                {services}

                <EndPushed>
                    <p><b>Valor total:</b> R$ {soma},00</p>
                    <Button variant="contained" color="primary" onClick={this.props.purchaseEnd}>Finalizar a compra</Button>
                    <Button variant="contained" color="primary" onClick={this.props.goToServicePage}>Lista de serviços</Button>
                </EndPushed>
            </div>
            </ThemeProvider>
        )
    }
}