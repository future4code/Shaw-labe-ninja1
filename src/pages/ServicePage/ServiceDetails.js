import React from "react";

export default class ServiceDetails extends React.Component {



    render() {
        return (
            <div>
                {/* o id está sendo recebido por props - user o getJobById para renderizar o job aqui! NÓS ACHAMOS */}
                <br />
                <br />
                <br />
                <button onClick={this.props.goToServicePage}>Voltar para lista de serviços</button>
            </div>
        )
    }
}