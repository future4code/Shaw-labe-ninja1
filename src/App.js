import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import CreateServicePage from './pages/CreateServicePage/CreateServicePage'
import ServicePage from './pages/ServicePage/ServicePage'

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

	selectPage = () => {
		switch(this.state.screen){
			case "Home":
				return <Home goToCreateServicePage={this.goToCreateServicePage} goToServicePage={this.goToServicePage} />
			case "Cart":
				return <Cart />
			case "CreateServicePage":
				return <CreateServicePage />
			default:
				return <ServicePage />
		}
	}

	render(){
		return(
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