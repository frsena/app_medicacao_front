import { useRef, useState } from "react";
import { useNavigate  } from "react-router-dom";
import Button from "../Button/Button";
import Input from "../Input/Input";
import Select from "../Select/Select";


export default function Pesquisa(props){

   
    const [opcoesPesquisa, setOpcoesPesquisa] =  useState(props.listaOpcoesPesquisa[0].codigo); 
    const [inputPesquisa, setInputPesquisa] = useState('');
    const [placeholder, setPlaceholder] = useState(props.listaOpcoesPesquisa[0].descricao);
    const inputRef = useRef(null);
    const navigate = useNavigate();

    const voltar = () => {
        navigate('/');
    };

    const trocaOpcaoPesquisa = (valor) => {

        setOpcoesPesquisa(valor.value);
        setPlaceholder(valor.selectedOptions[0].label);
        setInputPesquisa("");

        const elemento = inputRef.current;
        if (elemento) {

            props.listaOpcoesPesquisa.map( opcao =>{
                if(valor.value === opcao.id){
        
                    elemento.readOnly = opcao.readOnly;
                    elemento.type=opcao.type;
                    return;
                }
            })
        }
    }

   
    return (
        <section>
           <Select  
                itens={props.listaOpcoesPesquisa}
                valor={opcoesPesquisa}
                aoAlterado={trocaOpcaoPesquisa}
            />

            <Input 
                ref={inputRef}
                type="text"
                id="pesquisa"
                name="pesquisa"
                placeholder={placeholder}
                readOnly = {true}
                value={inputPesquisa}
                onChange =  {valor => setInputPesquisa(valor.target.value)}
            />


            <Button onClick={() => props.pesquisar(opcoesPesquisa, inputPesquisa)} >Pequisar</Button>  
            <Button onClick={props.iniciarIncluir}>Incluir</Button>
            <Button onClick={voltar}>Voltar</Button>
        </section>  
    )
}