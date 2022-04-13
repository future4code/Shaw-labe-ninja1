import React from "react";
import { BASE_URL } from "../../constants/urls";
import { HEADERS } from "../../constants/headers";
import axios from "axios";

export default class ServiceDetails extends React.Component {
  state = {
    jobDetails: {},
  };

  componentDidMount() {
    this.getJobById();
  }

  getJobById = () => {
    axios
      .get(`${BASE_URL}/jobs/${this.props.serviceId}`, HEADERS)
      .then((res) => {
        this.setState({ jobDetails: res.data });
      })
      .catch((err) => {
        console.log("errou");
      });
  };

  render() {
    const renderizaPagamento =
      this.state.jobDetails.paymentMethods &&
      this.state.jobDetails.paymentMethods.map((pagamento) => {
        return <li key={pagamento}>{pagamento}</li>;
      });

    return (
      <div>
        {this.state.jobDetails.title && <h1>{this.state.jobDetails.title}</h1>}
        <br />
        <br />
        <br />
        <div>
          {this.state.jobDetails.price && (
            <h3>Preço:R$ {this.state.jobDetails.price}</h3>
          )}
          <h3>Prazo: {this.state.jobDetails.dueDate}</h3>
          {this.state.jobDetails.description && (
            <h3>Descrição: {this.state.jobDetails.description}</h3>
          )}
          <h3>Formas de Pagamento: {renderizaPagamento}</h3>
          <button onClick={this.props.goToServicePage}>
            Voltar para lista de serviços
          </button>
        </div>
      </div>
    );
  }
}
