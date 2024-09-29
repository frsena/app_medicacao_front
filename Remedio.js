import { useState, useEffect } from "react";
import Header from "../components/Header/Header";
import Tabela from "../components/Tabela/Tabela";
import Input from "../components/Input/Input";
import Modal from "../components/Modal/Modal";
import Main from "../components/Main/Main";
import Footer from "../components/Footer/Footer";
import Pesquisa from "../components/Pesquisa/Pesquisa";
import './Remedio.css'
import './Style.css'
import api from "../service/Api";



export default function Remedio() {

    const listaOpcoesPesquisa = [
        { 
            "id" : "TD",
            "nome": "Todos",
            "type": "text",
            "readOnly":true
        },
        { 
            "id" : "ID",
            "nome": "Código",
            "type": "number",
            "readOnly":false
        },
        { 
            "id" : "DESC",
            "nome": "Descrição",
            "type": "text",
            "readOnly":false
        }
    ]

    const remedio = {"id" : "", "nome": ""};
    

    const header = [{"tam":"10px", "desc":"Código"}, {"tam":"300px","desc":"Nome"},{"tam":"10px","desc":"Ações"}];

    const [remedios, setRemedios] = useState([])
    const [formData, setFormData] = useState(remedio)

    const [showBotaoAtualizar, setShowBotaoAtualizar] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [loading, setLoading] = useState(true);



    const mostrarBotaoAtualizar = (mostrar) => setShowBotaoAtualizar(mostrar)

    useEffect(() => {
        console.log("Iniciando Lista da tabela")
        api.get('/remedios')
          .then(response => {
            setRemedios(response.data);
            setLoading(false)
          })
          .catch(error => {
            console.error('Erro ao buscar dados:', error);
            setLoading(false)
          });
      }, []);

    const pesquisar = (opcaoPesquisa, conteudoPesquisa) =>{

        let params = remedio;
        setLoading(true);
        if(opcaoPesquisa === "ID"){
            params.id = conteudoPesquisa;
        }else
            if(opcaoPesquisa === "DESC"){
                params.nome = conteudoPesquisa;
                params.id = 0;
            }else{
                params = {};  
            }

        api.get('/pesquisarRemedios', {params})
            .then(response => {
              console.log(response.data);
              setRemedios(response.data);
              setLoading(false);
            })
            .catch(error => {
                setLoading(false);
                console.error('Erro ao buscar dados:', error);
                alert(error.response.data.mesage);
            });            
    }

    const iniciarAlteracao = (remedioAlterado) =>{
        setFormData(remedioAlterado)
        mostrarBotaoAtualizar(true);
        setIsOpen(true);
        
    }

    const iniciarIncluir = () =>{
        setFormData(remedio)
        mostrarBotaoAtualizar(false);
        setIsOpen(true);
    }

    const excluir = (remedioExcluido) =>{
        //api.delete(`/deletarRemedio/${remedioExcluido.id}`)
        let params = {id:remedioExcluido.id};
        setLoading(true);
        api.delete('/deletarRemedio',{params})
        .then(response => {
          console.log(response.data);
          setRemedios(remedios.filter(m => m.id !== remedioExcluido.id));
          setLoading(false);
          alert("Excluido com sucesso!!")
        })
        .catch(error => {
            setLoading(false); 
          console.error('Erro ao buscar dados:', error);
          alert(error.response.data.mesage);
        }); 
        
    }

    const incluir =  (evento) =>{
       
        evento.preventDefault();
        const data = new FormData();
        data.append('nome', formData.nome);
        setLoading(true);
        api.post('/incluirRemedio', data)
        .then(response => {
            console.log(response)
            // const {id, nome} = response.data;
            if(response.status = 200){
                setRemedios([...remedios,response.data]);
                setIsOpen(false);
                setLoading(false);
                alert("Incluido com sucesso!!")
            }
        })
        .catch(error => {
          console.log('Erro ao buscar dados:', error);
          setLoading(false);
          alert(error.response.data.mesage);
        });     
    }

    const alterar = async (evento) =>{
        
        evento.preventDefault();
        
        const data = new FormData();
        data.append('id', formData.id);
        data.append('nome', formData.nome);
        setLoading(true);
        api.put('/atualizarRemedio',data)
        .then(response => {
            if(response.status ==200){
                setLoading(false);
                let lista = remedios.map(element => {
                    
                    if(element.id === formData.id){
                        return formData;
                    }else{
                        return element
                    }
                });
                setRemedios(lista);
                mostrarBotaoAtualizar(false);
                setIsOpen(false);
                alert("Alterado com sucesso!!")
            }
        })
        .catch(error => {
            setLoading(false);
          console.error('Erro ao buscar dados:', error);
          alert(error.response.data.mesage);
        });       
    }
    
    //if (loading) {
    //    return <div>Carregando...</div>;
    //  }

    return (
        <div className="content">
            
            <Header titulo='Remédio'></Header>
            {loading ? 
                <div>
                    Carregando...
                </div>: <div></div>}
            <Main>
                <Pesquisa iniciarIncluir={iniciarIncluir} pesquisar={pesquisar} listaOpcoesPesquisa={listaOpcoesPesquisa}></Pesquisa>
                <Tabela lista={remedios} header={header} iniciarAlteracao={iniciarAlteracao} excluir={excluir}></Tabela>
            </Main>
            <Footer></Footer>            
            <Modal titulo="Cadastro de Remédio" isOpen={isOpen} onClose={() => setIsOpen(false)} showBotaoAtualizar={showBotaoAtualizar} incluir={incluir} alterar={alterar}>
                <form className="form" >
                    <Input 
                        type="text"
                        id="id"
                        name="id"
                        label="Código:"
                        //readOnly
                        onChange =  {(e) => setFormData({...formData, id: e.target.value})}
                        value={formData.id}
                    />
                    <Input 
                        onChange =  {(e) => setFormData({...formData, nome: e.target.value})}
                        type="text"
                        id="nome"
                        name="nome"
                        label="Nome:"
                        size="40"
                        required
                        value={formData.nome}
                    />
                </form>
            </Modal>
            
        </div>
    )
}