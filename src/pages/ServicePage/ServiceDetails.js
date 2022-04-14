import React from "react";
import styled from "styled-components"
import { BASE_URL } from "../../constants/urls";
import { HEADERS } from "../../constants/headers";
import axios from "axios";

const DetailsDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  margin: 10vh;

  h1 {
    margin-bottom: 3vh;
  }

  h2 {
    margin: 2vh;
    color: #1C1C1C;
  }

  button {
    padding: 5px;
  }
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

    return (
      <DetailsDiv>
        {this.state.jobDetails.title && <h1>{this.state.jobDetails.title}</h1>}
      
        <div>
          {this.state.jobDetails.price && (<h2>Preço: R$ {this.state.jobDetails.price}</h2>)}

          <h2>Prazo: {this.state.jobDetails.dueDate}</h2>
          
          {this.state.jobDetails.description && (<h2>Descrição: {this.state.jobDetails.description}</h2>)}
          
          <h2>Formas de Pagamento: {renderizaPagamento}</h2>
        </div>

        <button onClick={this.props.goToServicePage}> Voltar para lista de serviços </button>
      </DetailsDiv>
    );
  }
}