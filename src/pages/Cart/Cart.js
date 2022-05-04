import React from 'react'
import styled from 'styled-components'
import { ThemeProvider } from '@material-ui/styles';
import { theme } from "../../constants/theme"
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

const ContainerCard = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1%;
    width: 100%;
    justify-content: center;
    padding-top: 2.5%;
`

const CartDiv = styled.div`
    display: flex;
    align-items: center;
    border: 1px solid black;
    height: 10vh;
    border-radius: 5%; 
    box-shadow: 1px -1px 4px 1px;
    background-color: #bfb5e3;
    width: 95%;
    margin-left: 2.5%;

    div{
        display: flex;
        width: 50%;
        padding: 1%;
    }
`
const Price = styled.div`
    display: flex;
    justify-content: space-between;
    width: 66%;
    align-items: center;
`
const EndPushed = styled.div`
    display: flex;
    margin-left: 3.4%;
    margin-top: 2%;
    align-items: center;

    p {
        font-size: 1.3em;
    }

    button{
        margin: 0 1% 0 1%;
    }
`
export default class Cart extends React.Component {

    render() {

        const services = this.props.cart.map((service) => {
            return (
                <ContainerCard>
                    <CartDiv>
                        <div>
                            <h2> {service.title} </h2>
                        </div>
                        <Price>
                            <p> R${service.price},00 </p>
                            <IconButton onClick={() => this.props.deleteServiceFromCart(service.id)}>
                                <DeleteIcon/>
                            </IconButton>
                        </Price>
                    </CartDiv>
                </ContainerCard>
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