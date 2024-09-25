import './Header.css';

export default function Header(props) {

    return (
        <header>
            <div className="header">
                <h1>{props.titulo}</h1>
            </div>
        </header>
    )
}



        