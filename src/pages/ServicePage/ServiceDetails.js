import React from "react";
import styled from "styled-components"
import { BASE_URL } from "../../constants/urls";
import { HEADERS } from "../../constants/headers";
import axios from "axios";
import { ThemeProvider } from '@material-ui/styles';
import { theme } from "../../constants/theme"
import Button from '@material-ui/core/Button';

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  margin: 10vh;
  border: 1px solid black;
  border-radius: 10%;
  height: auto;
`

export default class ServiceDetails extends React.Component {
  state = {
    jobDetails: {},
  };

  componentDidMount() {
    this.getJobById();
  }

  getJobById = () => {
    axios.get(`${BASE_URL}/jobs/${this.props.serviceId}`, HEADERS)
    .then((res) => {
      this.setState({ jobDetails: res.data });
    })
    .catch((err) => {
      console.log("errou");
    });
  };

  render() {
    const renderizaPagamento = this.state.jobDetails.paymentMethods && this.state.jobDetails.paymentMethods.map((pagamento) => {
      return(<li key={pagamento}> {pagamento} </li>)
    });

    const date = new Date();
    const dateString = date.getDate()  + "/" + (date.getMonth()+1) + "/" + date.getFullYear()

    return (
      <ThemeProvider theme={theme}>
        <CardContainer>
        
          <div>
            {this.state.jobDetails.title && <h1>{this.state.jobDetails.title}</h1>}
            {this.state.jobDetails.price && (<h2>Preço: R$ {this.state.jobDetails.price}</h2>)}

            <h2>Prazo: {dateString}</h2>
            
            {this.state.jobDetails.description && (<h2>Descrição: {this.state.jobDetails.description}</h2>)}
            
            <h2>Formas de Pagamento: {renderizaPagamento}</h2>
           
          </div>
        </CardContainer>
        <Button variant="contained" color="primary" onClick={this.props.goToServicePage}> Voltar </Button>
      </ThemeProvider>
    );
  }
}