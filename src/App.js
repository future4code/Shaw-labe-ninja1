import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import CreateServicePage from './pages/CreateServicePage/CreateServicePage'
import ServicePage from './pages/ServicePage/ServicePage'
import ServiceDetails from './pages/ServicePage/ServiceDetails'
import logo1 from './img/logo1.png'
import logo3 from './img/logo3.png'
import { ThemeProvider } from '@material-ui/styles';
import { theme } from "../src/constants/theme"
import Button from '@material-ui/core/Button';
import HomeIcon from '@material-ui/icons/Home';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

const GlobalStyled = createGlobalStyle`
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	body {
		background-color: #fdedfd;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
	}
`

const HeaderDiv = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: #bfb5e3;
	padding: 10px;

	Button {
		margin: 10px;
		padding: 3px 10px;
		margin-top: 55px;
	}

	img {
		margin-left: 10px;
		height: 100px
	}
`

class App extends React.Component {

	state = {
		screen: "Home",
		serviceId: "",
		minValue: -Infinity,
		maxValue: Infinity,
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
		this.setState({ maxValue: e.target.value > null ? e.target.value : Infinity })
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
			<ThemeProvider theme={theme}>
				<GlobalStyled />
				<HeaderDiv>
					<div>
						<img src={logo1} />
						<img src={logo3} />
					</div>
					<div>
						<Button 
							onClick={this.onClickHomePage}
							variant="contained"
        					color="primary"
        					startIcon={<HomeIcon />}
						> 
						Home
						</Button>
						<Button 
							onClick={this.onClickCartPage}
							variant="contained"
        					color="primary"
        					startIcon={<ShoppingCartIcon />}
						> 
						carrinho
						</Button>
					</div>
				</HeaderDiv>
				{this.selectPage()}
			</ThemeProvider>
		)
	}
}

export default App