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
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
	padding: 0.6em;

	Button {
		margin: 0.6em;
		padding: 0.2em 0.6em;
		margin-top: 4em;
		@media (max-width: 380px) {
			margin: 0 2.85em;
			padding: 0.2rem 0.5rem;
			margin-top: 0;
    	}
	}

	img {
		margin-left: 2.8em;
		height: 6em;
		@media (max-width: 380px) {
			display: none
   		}
	}
`

toast.configure()

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
		const serviceOnCart = this.state.cart.filter((item) => {
			if (item.id === service.id) {
				return item;
			} else {
				return false
			}
		});
		if (serviceOnCart.length === 0) {
			const newCart = [service, ...this.state.cart];
			this.setState({
				cart: newCart,
			});
			toast.dark(`Serviço ${service.title} foi adicionado ao carrinho`, {position: "top-center"})
		} else {
			toast.dark("Este serviço já está no carrinho", {position: "top-center"})
			const newCart = this.state.carrinho.map((item) => {
				if (service.id === item.id) {
					return item;
				}
			});
			this.setState({ cart: newCart })
		}
	}

	deleteServiceFromCart = (serviceId) => {
		let array = this.state.cart.filter((service) => service.id !== serviceId);
		this.setState({ cart: array })
	}

	purchaseEnd = () => {
		this.setState({ cart: [] })
		toast.dark("Obrigado pela sua compra!", {position: "top-center"})
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
						<img src={logo1} alt="logo de um ninja apenas os traços"/>
						<img src={logo3} alt="escrita do nome da loja LabeNinjas"/>
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