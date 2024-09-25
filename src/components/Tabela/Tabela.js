import './Tabela.css';


export default function Tabela(props) {

    return (

        <table>
            <thead>
                <tr key={0}>
                    {
                        props.header.map((header, i) =>
                            <th key={i} width={header.tam}>{header.desc}</th>
                        )
                    }
                </tr>
            </thead>
            <tbody>
                {
                    props.lista.map( (row, i) => {
                        return <tr key={i}>
                           { 
                                Object.keys(row).map( (item, j) => (
                                        <td key={i+'-'+j}>{row[item]}</td>
                                    )
                                )
                            }
                            {
                                <td>
                                    <img src='/edit-text.png' width="20" height="20" onClick={() => props.iniciarAlteracao(row)}  alt='Editar'></img>
                                    <img src='/excluir.png' width="20" height="20" onClick={() => props.excluir(row)} alt='Excluir'></img>
                                </td>
                            }
                         </tr>   
                    })
                }
            </tbody>
        </table>

    )

}