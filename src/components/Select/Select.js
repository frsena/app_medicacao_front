import "./Select.css"

export default function Select(props){
    return (
        <>
            {props.label && <label>{props.label}</label>}
            <select onChange={props.aoAlterado? evento => props.aoAlterado(evento.target) : props.onChange}
              value={props.valor} className={props.className}>
                props.labelOption && <option key={0} value={0}>{props.labelOption}</option>
                {props.itens.map(item => {
                    return <option key={item.id} value={item.id}>{item.nome}</option>
                })}
            </select>
        </>

    )
}