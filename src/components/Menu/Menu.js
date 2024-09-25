import { Link } from "react-router-dom";
import './Menu.css'

export default function Menu(props){
    
    return (
        <nav>
            <ul className="ul">
                {
                props.itens.map((v, i) =>
                    <li>
                        <Link to={v.caminho}>{v.titulo}</Link>
                    </li>
                )
            }
            </ul>
        </nav>
    )
}