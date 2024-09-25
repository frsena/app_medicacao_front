import React, { useState } from 'react';
import { useNavigate  } from "react-router-dom";
import Input from "../components/Input/Input";

import api from "../service/Api";
import Button from '../components/Button/Button';
import Header from '../components/Header/Header';
import Main from '../components/Main/Main';
import Footer from '../components/Footer/Footer';




export default function Localizacao() {

  const [cep, setCep] = useState('');
  const [farmacias, setFarmacias] = useState([]);
  const navigate = useNavigate();

  const buscarFarmacias = async () => {
 
        api.get('/localizacao', {params:{cep}})
          .then(response => {
            console.log(response.data);
            let dados = response.data;
            setFarmacias(dados);
          })
          .catch(error => {
            console.error('Erro ao buscar farmácias:', error);
            alert(error.response.data.mesage);
            setFarmacias([]);
          });
  }

  const voltar = () => {
    navigate('/');
};

  return (
    <div className="content">
      <Header titulo='Localizar Farmácias Próximas'></Header>
      <Main>
        <div>
          <Input
            type="text"
            value={cep}
            onChange={(e) => setCep(e.target.value)}
            placeholder="Digite o CEP"
            className="inputDialog"
          />
          <Button onClick={buscarFarmacias}>Localizar</Button>
          <Button onClick={voltar}>Voltar</Button>
          <ul>
            {farmacias.map((farmacia) => (
              <li >
                <h2>{farmacia.nome}</h2>
                <p>{farmacia.endereco}</p>
                <p>{farmacia.telefone}</p>
              </li>
            ))}
          </ul>
        </div>
      </Main>
      <Footer></Footer>
    </div>
  );
}