import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import CreateServicePage from './pages/CreateServicePage/CreateServicePage'
import ServicePage from './pages/ServicePage/ServicePage'
import ServiceDetails from './pages/ServicePage/ServiceDetails'

const GlobalStyled = createGlobalStyle`
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}
`

const HeaderDiv = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;	
	border: 1px solid black;
	background-color: grey;
	padding: 10px;

	button {
		padding: 3px 20px;
		border-radius: 10%;
	}
`

class App extends React.Component {

	state = {
		screen: "Home",
		serviceId: "",
		minValue: 0,
		maxValue: 100,
		query: "",
		cart: []
	}


	// Métodos de Ciclo de Vida

	componentDidUpdate() {
		localStorage.setItem(this.state.serviceId, JSON.stringify(this.state.cart))
	};

	componentDidMount() {
		const services = localStorage.getItem(this.state.serviceId)
		if (services) {
			const newServices = JSON.parse(services)
			this.setState({ cart: newServices })
		}
	};

	// Outras funções
	
	detailsPage = (serviceId) => {
		this.setState({
			serviceId: serviceId,
			screen: "DetailsPage"
		})
	}

	addServiceInCart = (service) => {
		alert("Serviço adicionado no carrinho!")
		const newService = [...this.state.cart, service]
		this.setState({ cart: newService })
	}

	deleteServiceFromCart = (serviceId) => {
		let array = this.state.cart.filter((service) => service.id !== serviceId);
		this.setState({ cart: array })
	}

	purchaseEnd = () => {
		this.setState({ cart: [] })
		alert("Obrigado pela sua compra!")
	}

	// Funções para os filtros

	onChangeMinValue = (e) => {
		this.setState({ minValue: e.target.value })
	}

	onChangeMaxValue = (e) => {
		this.setState({ maxValue: e.target.value })
	}

	onChangeQuery = (e) => {
		this.setState({ query: e.target.value })
	}

	// Funções para trocar de página

	onClickHomePage = () => {
		this.setState({ screen: "Home" })
	}

	onClickCartPage = () => {
		this.setState({ screen: "Cart" })
	}

	goToCreateServicePage = () => {
		this.setState({ screen: "CreateServicePage" })
	}

	goToServicePage = () => {
		this.setState({ screen: "ServicePage" })
	}

	selectPage = () => {
		switch (this.state.screen) {
			case "Home":
				return <Home
					goToCreateServicePage={this.goToCreateServicePage}
					goToServicePage={this.goToServicePage}
				/>
			case "Cart":
				return <Cart
					purchaseEnd={this.purchaseEnd}
					goToServicePage={this.goToServicePage}
					deleteServiceFromCart={this.deleteServiceFromCart}
					serviceId={this.state.serviceId}
					cart={this.state.cart}
				/>
			case "CreateServicePage":
				return <CreateServicePage />
			case "DetailsPage":
				return <ServiceDetails
					serviceId={this.state.serviceId}
					goToServicePage={this.goToServicePage}
				/>
			default:
				return <ServicePage
					addServiceInCart={this.addServiceInCart}
					detailsPage={this.detailsPage}
					minValue={this.state.minValue}
					maxValue={this.state.maxValue}
					query={this.state.query}
					onChangeMinValue={this.onChangeMinValue}
					onChangeMaxValue={this.onChangeMaxValue}
					onChangeQuery={this.onChangeQuery}
				/>
		}
	}

	render() {
		return (
			<div>
				<GlobalStyled />
				<HeaderDiv>
					<h1>LabeNinjas</h1>
					<div>
						<button onClick={this.onClickHomePage}>🏠</button>
						<button onClick={this.onClickCartPage}>🛒</button>
					</div>
				</HeaderDiv>
				{this.selectPage()}
			</div>
		)
	}
}

export default App