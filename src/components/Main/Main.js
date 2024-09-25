import './Main.css'

export default function Main(props){

    return (
        <main className="main">
            <div className="conteudo">
                {props.children}
            </div>
        </main>
    )
}