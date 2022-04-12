import React from 'react'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'

class App extends React.Component {

	state = {
		currentScreen: "Home" 
	}

	onClickHomePage = () => {
		this.setState({ currentScreen: "Home" })
	}

	onClickCartPage = () => {
		this.setState({ currentScreen: "Cart" })
	}

	selectPage = () => {
		switch(this.state.currentScreen){
			case "Home":
				return <Home />
			case "Cart":
				return <Cart />
			default:
				return <Home />
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