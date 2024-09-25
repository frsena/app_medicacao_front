
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Main from "../components/Main/Main";
import Menu from "../components/Menu/Menu";
import './Style.css'



export default function Home() {

    const links = [{"caminho":"/remedio", "titulo":"Cadastro de Remedio"}, 
                   {"caminho":"/medicacoes","titulo":"Controle da Medicação"},
                   {"caminho":"/localizacao","titulo":"Localizar Farmacia"}];


    return (
        <div className="content">
            <Header titulo="Home"></Header>
            <Main>
                <Menu itens={links} />
            </Main>

            <Footer></Footer>
        </div>


    )

}