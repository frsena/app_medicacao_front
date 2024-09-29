import { useState, useEffect } from "react";
import Header from "../components/Header/Header";
import Tabela from "../components/Tabela/Tabela";
import Pesquisa from "../components/Pesquisa/Pesquisa";
import Main from "../components/Main/Main";
import Footer from "../components/Footer/Footer";
import Modal from "../components/Modal/Modal";
import Input from "../components/Input/Input";
import Select from "../components/Select/Select";
import './Medicacao.css'
import './Style.css'
import api from "../service/Api";


export default function Medicacao() {

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

    const medicacao = { 
        "id" : "",
        "remedio": "",
        "descricao": "",
        "qtdVezesDias": "",
        "qtdDias": "",
        "dataInicio": "",
        "obs":""
    };

    const header = [{"tam":"10px", "desc":"Código"}, {"tam":"300px","desc":"Remédio"},{"tam":"300px","desc":"Descrição"},{"tam":"10px","desc":"Quantidade vezes ao dia"},
                    {"tam":"10px", "desc":"Quantidade de dias"}, {"tam":"170px","desc":"Data inicio"},{"tam":"300px","desc":"Observação"},{"tam":"10px","desc":"Ações"}];

               
    const [medicacoes, setMedicacoes] = useState([]);
    const [remedios,setRemedios] =  useState([]);; 
    const [formData, setFormData] = useState(medicacao);
                
    const [showBotaoAtualizar, setShowBotaoAtualizar] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [loading, setLoading] = useState(true);
   const mostrarBotaoAtualizar = (mostrar) => setShowBotaoAtualizar(mostrar)


    useEffect(() => {
        console.log("Iniciando Lista da tabela")
        obterListaRemedios();
        buscarMedicacoes();
        
        

      }, []);


    const buscarMedicacoes = (params) =>{
        api.get('/pesquisarMedicamentos', {params})
        .then(response => {
          console.log(response.data);
          let dados = response.data;
         
          setMedicacoes(dados.map(m => {
            return  {"id": m.id,
              "remedio": m.remedio,
              "descricao": m.descricao,
              "qtdVezesDias": m.quantidade_vezes_dia,
              "qtdDias": m.quantidade_dia,
              "dataInicio": m.data_inicio_medicacao.split('-').reverse().join('-'),
              "obs": m.observacao}
          }))
          setLoading(false);
        })
        .catch(error => {
          console.error('Erro ao buscar dados:', error);
          alert(error.response.data.mesage);
          setLoading(false);
        });
    }  

    const pesquisar = (opcaoPesquisa, conteudoPesquisa) =>{
        setLoading(true)
        let params = {id:0, descricao:""};
        if(opcaoPesquisa === "ID"){
            params.id = conteudoPesquisa;
        }else
            if(opcaoPesquisa === "DESC"){
                params.descricao = conteudoPesquisa;
                params.id = 0;
            }else{
                params = {};  
            }
        console.log(params)
        buscarMedicacoes(params); 
        
    }

    const obterListaRemedios = () =>{
        
        api.get('/remedios')
        .then(response => {
            console.log(response.data);
            setRemedios(response.data);
            
        })
        .catch(error => {
            console.error('Erro ao buscar dados:', error);
            
          });
    }

    const iniciarIncluir = () =>{
       
        setFormData(medicacao)
        mostrarBotaoAtualizar(false);
        setIsOpen(true);
    }               

    const iniciarAlteracao = (medicacaoAterar) =>{

        let params = {id:medicacaoAterar.id};
        setLoading(true)
        api.get('/medicamento', {params})
        .then(response => {
            console.log(response.data);
            let dados = response.data;
         
            medicacao.id= dados.id;
            medicacao.remedio= dados.remedio_id;
            medicacao.descricao= dados.descricao;
            medicacao.qtdVezesDias= dados.quantidade_vezes_dia;
            medicacao.qtdDias= dados.quantidade_dia;
            medicacao.dataInicio= dados.data_inicio_medicacao;
            medicacao.obs= dados.observacao;

            setFormData(medicacao);
            
            mostrarBotaoAtualizar(true);
            setIsOpen(true);
            setLoading(false)
          
        })
        .catch(error => {
          console.error('Erro ao buscar dados:', error);
          alert(error.response.data.mesage);
          setLoading(false)
        });       
        
    }


    const excluir = (medicacaoExcluir) =>{
        setLoading(true)
         let params = {id:medicacaoExcluir.id};
         api.delete('/deletarMedicamento',{params})
         .then(response => {
           console.log(response.data);
           setMedicacoes(medicacoes.filter(m => m.id !== medicacaoExcluir.id));
           alert("Excluido com sucesso!!")
           setLoading(false)
         })
         .catch(error => {
           console.error('Erro ao buscar dados:', error);
           alert(error.response.data.mesage);
           setLoading(false)
         }); 
    }

    const obterDadosFormulario = (alterar) =>{
        const data = new FormData();
        if(alterar){
            data.append('id', formData.id);
        }
        data.append('descricao', formData.descricao);
        data.append('quantidade_vezes_dia', formData.qtdVezesDias);
        data.append('remedio_id', formData.remedio);
        data.append('data_inicio_medicacao', formData.dataInicio);
        data.append('quantidade_dia', formData.qtdDias);
        data.append('observacao', formData.obs);

        return data;
    }

    const incluir = (evento) =>{
       
        evento.preventDefault();
        setLoading(true)
        api.post('/incluirMedicamento', obterDadosFormulario(false))
        .then(response => {
            console.log(response)
            let dados = response.data;
            if(response.status === 200){
                setMedicacoes([...medicacoes, {
                        "id": dados.id,
                        "remedio": dados.remedio,
                        "descricao": dados.descricao,
                        "qtdVezesDias": dados.quantidade_vezes_dia,
                        "qtdDias": dados.quantidade_dia,
                        "dataInicio": dados.data_inicio_medicacao,
                        "obs": dados.observacao}
                  ]);
                setIsOpen(false);
                alert("Incluido com sucesso!!")
                setLoading(false)
            }
        })
        .catch(error => {
          console.log('Erro ao incluir medicamento:', error);
          alert(error.response.data.mesage);
          setLoading(false)
        });     

    }

    const alterar = (evento) =>{
        evento.preventDefault();
        setLoading(true)
        api.put('/atualizarMedicamento', obterDadosFormulario(true))
        .then(response => {
            console.log(response)
            let dados = response.data;
            
            if(response.status === 200){
                let lista = medicacoes.map(element => {
                    if(element.id === formData.id){
                        return {
                            "id": dados.id,
                            "remedio": dados.remedio,
                            "descricao": dados.descricao,
                            "qtdVezesDias": dados.quantidade_vezes_dia,
                            "qtdDias": dados.quantidade_dia,
                            "dataInicio": dados.data_inicio_medicacao.split('-').reverse().join('-'),
                            "obs": dados.observacao
                        };
                    }else{
                        return element
                    }
                });
              
                setMedicacoes(lista);
                                
                mostrarBotaoAtualizar(false);
                setIsOpen(false);
                alert("Alterado com sucesso!!")
                setLoading(false)
            }
        })
        .catch(error => {
          console.log('Erro ao atualizar medicamento:', error);
          alert(error.response.data.mesage);
          setLoading(false)
        });   
  
    }

    return (
        <div className="content">
            <Header titulo='Controle da Medicação'></Header>
            {loading ? 
                <div>
                    Carregando...
                </div>: <div></div>}
            <Main>
                <Pesquisa iniciarIncluir={iniciarIncluir} pesquisar={pesquisar} listaOpcoesPesquisa={listaOpcoesPesquisa}></Pesquisa>
                <Tabela lista={medicacoes} header={header} iniciarAlteracao={iniciarAlteracao} excluir={excluir}></Tabela>
            </Main>
            <Footer></Footer>
            <Modal titulo="Cadastro da Medicação" isOpen={isOpen} onClose={() => setIsOpen(false)} showBotaoAtualizar={showBotaoAtualizar} incluir={incluir} alterar={alterar}>
                <form className="form">
                    <div className="divLinha">
                        <div className="divIdentificador">
                            <Input 
                            type="text"
                            label="Código:"
                            //readOnly
                            onChange =  {(e) => setFormData({...formData, id: e.target.value})}
                            value={formData.id}
                            className="inputDialog"
                            />
                        </div>
                        <div className="divRemedio" >
                            <Select  label='Remedio:'
                                itens={remedios}
                                valor={formData.remedio}
                                className="inputDialog"
                                labelOption="Selecione Remedio"
                                onChange={(e) => setFormData({...formData, remedio: e.target.value })}
                            />
                        </div>
                        <div className="divDataInicio">                       
                            <Input 
                                onChange =  {(e) => setFormData({...formData, dataInicio: e.target.value})}
                                type="date"
                                label="Data de inicio:"
                                required
                                value={formData.dataInicio}
                                className="inputDialog"
                            />
                        </div>
                    </div>
                    <div className="divDescricao">
                        <Input 
                            onChange =  {(e) => setFormData({...formData, descricao: e.target.value})}
                            type="text"
                            label="Descrição:"
                            size="40"
                            required
                            value={formData.descricao}
                            className="inputDescricao"
                        />
                    </div>
                    <div className="divLinha">
                        <div className="divQuantidadeVezes">
                            <Input 
                                onChange =  {(e) => setFormData({...formData, qtdVezesDias: e.target.value})}
                                type="number"
                                label="Quantidade de vezes ao dia:"
                                required
                                value={formData.qtdVezesDias}
                                className="inputQuantidade"
                            />
                        </div>
                        <div className="divQuantidadeDias">
                            <Input 
                                onChange =  {(e) => setFormData({...formData, qtdDias: e.target.value})}
                                type="number"
                                label="Quantidade de dias:"
                                required
                                value={formData.qtdDias}
                                className="inputQuantidade" 
                            />
                        </div>
                    </div>
                    <div className="divDescricao">
                        <Input 
                            onChange =  {(e) => setFormData({...formData, obs: e.target.value})}
                            type="text"
                            label="Observação:"
                            required
                            value={formData.obs}
                            className="inputDescricao"
                        />
                    </div>
                </form>
            </Modal>
        </div>
 


    )


}