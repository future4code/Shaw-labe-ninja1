import React from 'react'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import CreateServicePage from './pages/CreateServicePage/CreateServicePage'
import ServicePage from './pages/ServicePage/ServicePage'

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
				<header>
					<h1>LabeNinjas</h1>
					<button onClick={this.onClickHomePage}>Home</button>
					<button onClick={this.onClickCartPage}>Carrinho</button>
				</header>	
				{this.selectPage()}
			</div>
		)
	}
}

export default App