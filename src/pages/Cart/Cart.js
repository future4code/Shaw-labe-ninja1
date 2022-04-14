import React from 'react'
import styled from 'styled-components'

const CartDiv = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px;
    padding: 5px;
    border: 1px solid black;
    height: 10vh;
    
    button {
        padding: 5px;
        width: 50px;
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
        width: 10vw;
        margin-bottom: 5px;
    }
`

export default class Cart extends React.Component {

    render() {

        const services = this.props.cart.map((service) => {
            return (
                <CartDiv>
                    <h1> {service.title} </h1>
                    <p> R${service.price} </p>
                    <button onClick={() => this.props.deleteServiceFromCart(service.id)}>🗑️</button>
                </CartDiv>
            )
        })

        let soma = 0
        const cartSum = this.props.cart.map((service) => {
            return (soma += service.price)
        })

        return (
            <div>
                {services}

                <EndPushed>
                    <p>Valor total: R$ {soma}</p>
                    <button onClick={this.props.purchaseEnd}>Finalizar a compra</button>
                    <button onClick={this.props.goToServicePage}>Lista de serviços</button>
                </EndPushed>
            </div>
            
        )
    }
}