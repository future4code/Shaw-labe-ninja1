import React from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { BASE_URL } from '../../constants/urls'
import { HEADERS } from '../../constants/headers'
import { ThemeProvider } from '@material-ui/styles';
import { theme } from "../../constants/theme"
import Button from '@material-ui/core/Button';
import imghome from "../../img/home1.png";

const HomeDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;

    h2 {
        padding-top: 5vh;
        color: #494949;
        font-size: 2.1rem;
        font-family: 'Permanent Marker', cursive;
    }

    img{
        width: 35%;
        padding-top: 2vh;
    }

    Button {
        padding: 1vh 1vw;
        margin: 1vw;
        width: 30vw;
        height: 8vh;
        font-size: 1.36rem;
    }

    @media (min-width: 551px) and (max-width: 830px) {
        Button{
            font-size: 1rem;
        }
    }
    @media (max-width: 551px){
        Button{
            font-size: 0.7rem;
        }
        h2{
            font-size: 1.5rem;
            text-align: center;
        }
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
            <ThemeProvider theme={theme}>
                <HomeDiv>    
                    <h2> O talento certo, no momento certo! </h2>
                    <img src={imghome} alt="desenho de um jovem fazendo o 2 com a mão, mexendo no computador feliz"/>
                    <div>
                        <Button  variant="contained" color="primary" onClick={this.props.goToCreateServicePage}>Quero ser um ninja</Button>
                        <Button  variant="contained" color="primary" onClick={this.props.goToServicePage}>Quero contratar um ninja</Button>
                    </div>
                </HomeDiv>
            </ThemeProvider>
        )
    }
}