import React from 'react'

export default class Cart extends React.Component {




    render() {


        const services = this.props.cart.map((service) => {
            return (
                <div>
                    <h1> {service.title} </h1>
                    <p> R${service.price} </p>
                    <button onClick={() => this.props.deleteServiceFromCart(this.props.serviceId)}>Remover</button>
                </div>)
        })

        let soma = 0
        const cartSum = this.props.cart.map((service) => {
            return soma += service.price
        })

        return (

            <div align={"center"}>
                <br />
                {services}
                <br />
                <p>Valor total: R${soma} </p>
                <br />
                <button onClick={this.props.purchaseEnd}>Finalizar a compra</button>
                <br />
                <br />
                <button onClick={this.props.goToServicePage}>Lista de serviços</button>
            </div>
        )
    }
}