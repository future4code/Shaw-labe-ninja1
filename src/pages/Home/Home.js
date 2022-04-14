import React from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { BASE_URL } from '../../constants/urls'
import { HEADERS } from '../../constants/headers'

const HomeDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    margin: 10vh;

    h1 {
        padding: 5vh;
        text-decoration: underline;
    }

    p {
        padding: 2vh 0 0 0;
    }

    button {
        padding: 1vh 1vw;
        margin: 1vw;
    }
`

export default class Home extends React.Component {
    state = {
        idServiceClick: ""
    }

    getJobById = (id) => {
        const url = `${BASE_URL}/jobs/${id}`

        axios.get(url, { HEADERS })
            .then((res) => console.log(res.data))
            .catch((err) => console.log(err.response))
    }

    render() {
        return (
            <HomeDiv>
                <h1>LabeNinjas</h1>
                <p> Escolha o seu caminho Ninja </p>
                <div>
                    <button onClick={this.props.goToCreateServicePage}>Cadastrar um serviço</button>
                    <button onClick={this.props.goToServicePage}>Contratar um serviço</button>
                </div>
            </HomeDiv>
        )
    }
}