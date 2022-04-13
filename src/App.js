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
	border: 5px solid black;
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

	purchaseEnd = () => {
		this.setState({ cart: [] })
		alert("Obrigado pela sua compra!")
	}


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


	detailsPage = (serviceId) => {
		this.setState({
			serviceId: serviceId,
			screen: "DetailsPage"
		})
	}

	addServiceInCart = (service) => {
		const newService = [...this.state.cart, service]
		this.setState({ cart: newService })
	}

	deleteServiceFromCart = (serviceId) => {
		let array = this.state.cart
		array.splice(serviceId, 1)
		this.setState({ cart: array })
	}

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

	onChangeMinValue = (e) => {
		this.setState({ minValue: e.target.value })
	}

	onChangeMaxValue = (e) => {
		this.setState({ maxValue: e.target.value })
	}

	onChangeQuery = (e) => {
		this.setState({ query: e.target.value })
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
		// console.log(this.state.cart);
		// comprovação do id certo sendo chamado
		return (
			<div>
				<GlobalStyled />
				<HeaderDiv>
					<h1>LabeNinjas</h1>
					<button onClick={this.onClickHomePage}>Home</button>
					<button onClick={this.onClickCartPage}>Carrinho</button>
				</HeaderDiv>
				{this.selectPage()}
			</div>
		)
	}
}

export default App