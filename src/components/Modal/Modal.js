import { useEffect, useRef } from "react";
import "./Modal.css"
import Button from "../Button/Button";

export default function Modal(props) {

    const modalRef = useRef(null);
   

      useEffect(() => {
        const modalElement = modalRef.current;
        if (modalElement) {
          if (props.isOpen) {
            modalElement.showModal();
          } else {
            modalElement.close();
          }
        }
      }, [props.isOpen]);
      
    

    return (

        <dialog ref={modalRef}>
            
            <div className="titulo">
                <h3 id="tituloDialog">{props.titulo}</h3>
            </div>
            <section className="dialogConteudo">
              {props.children}
              <section className="dialogBotoes">
                {!props.showBotaoAtualizar && <Button  onClick={props.incluir} >Salvar</Button>}
                {props.showBotaoAtualizar && <Button onClick={props.alterar} >Alterar</Button>}
                <Button onClick={props.onClose}>Fechar</Button> 
              </section>
            </section>
        </dialog>
    )
}