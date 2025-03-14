import { useState } from "react";
import "../styles/Perfil.css"; 
import logo from '../assets/logo.svg'; 
import btndenuncia from '../assets/denunciabutton.svg'; 
import btnongg from '../assets/onggbutton.svg'; 
import btnvet from '../assets/vet.svg'; 
import btnadt from '../assets/Adoção.svg'; 
import btnQuemsomos from "../assets/quemsomos.svg";
import iconPerfil from "../assets/icon_perfil.svg";
import animal1 from "../assets/animal1.svg";
import animal2 from "../assets/animal2.svg";
import localizacao from "../assets/localizacao.svg";
import contato from "../assets/contato.svg";
import redessociais from "../assets/redessociais.svg";
import AtualizarItem from "../components/AtualizarItem";
import AnimalCard from "../components/AnimalCard";


const Perfil = () => {
  const [nome, setNome] = useState("Nome da ONG");
  const [descricao, setDescricao] = useState("Descrição da ONG");
  const [imagem, setImagem] = useState(null);
  const [fotos, setFotos] = useState([null, null, null]);
  const [dados, setDados] = useState(["", "", ""]); 

  const handleImagemChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagem(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleFotoChange = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const novasFotos = [...fotos];
        novasFotos[index] = reader.result;
        setFotos(novasFotos);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClick = (index) => {
    const novoTexto = window.prompt("Digite o novo dado:");
    if (novoTexto !== null) {
      setDados((prevDados) => {
        const novoArray = [...prevDados];
        novoArray[index] = novoTexto;
        return novoArray;
      });
    }
  };

  return (
    <>
      <div className="App">
        <header className="App-header">
          <img src={logo} alt="Logo" className="logo" />
          <nav className="navbar">
            <ul>
              <li>
                <a href="#denuncia">
                  <img src={btndenuncia} alt="Denuncie Aqui" className="nav-btn" />
                </a>
              </li>
              <li>
                <a href="#ong">
                  <img src={btnongg} alt="Encontre Uma Ong" className="nav-btn" />
                </a>
              </li>
              <li>
                <a href="#nos">
                  <img src={btnQuemsomos} alt="Quem somos" className="nav-btn" />
                </a>
              </li>
              <li>
                <a href="#adt">
                  <img src={btnadt} alt="Adoção" className="nav-btn" />
                </a>
              </li>
              <li>
                <a href="#vet">
                  <img src={btnvet} alt="Atendimento veterinario" className="nav-btn" />
                </a>
              </li>
              <li>
                <a href="#icon">
                  <img src={iconPerfil} alt="Icon" className="nav-btn" />
                </a>
              </li>
            </ul>
          </nav>
        </header>
      </div>

      <div className="perfil-container">
        <section className="sobre">
          <div className="sobre-text">
            <h1
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => setNome(e.target.innerText)}
            >
              {nome}
            </h1>
            <p
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => setDescricao(e.target.innerText)}
            >
              {descricao}
            </p>
          </div>
          <div className="sobre-imagem">
            {imagem ? (
              <img src={imagem} alt="Foto da ONG" />
            ) : (
              <input
                type="file"
                accept="image/*"
                onChange={handleImagemChange}
                className="input-file"
              />
            )}
          </div>
        </section>

        <section className="dados">
          <h1>Atualize seus dados:</h1>
          <p>(Clique no ícone para editar os dados)</p>
          <div className="dados-container">
            {[
              { src: localizacao, alt: "Localização" },
              { src: contato, alt: "Contato" },
              { src: redessociais, alt: "Rede Social" },
            ].map((item, index) => (
              <div className="dados-item" key={index} onClick={() => handleClick(index)}>
                <img src={item.src} alt={item.alt} />
                <p>{dados[index]}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="fotos-perfil">
          <div>
            <h1>Fotos de perfil</h1>
            <p>Adicione fotos da sua instituição para os usuários avaliarem</p>
          </div>
          <div className="fotos-container">
            {fotos.map((foto, index) => (
              <div key={index} className="foto-box">
                {foto ? (
                  <img src={foto} alt={`Foto ${index + 1}`} />
                ) : (
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFotoChange(index, e)}
                    className="input-file"
                  />
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="filtro-denuncias">
          <div className="filtro-categorias">
            <h2>Filtros</h2>
            <div className="filtro-item" onClick={() => console.log("N. Chamado selecionado")}>
              <span>N. Chamado</span>
            </div>
            <div className="filtro-item" onClick={() => console.log("Animal selecionado")}>
              <span>Animal</span>
            </div>
            <div className="filtro-item" onClick={() => console.log("Categoria selecionada")}>
              <span>Categoria</span>
            </div>
          </div>
          <div className="atualizar-denuncias">
            <h2>Atualize as Denúncias</h2>
            <p>Envie os arquivos relacionados às denúncias (Word, JPEG, PNG, MP4).</p>
            <div className="atualizar-itens">
              <AtualizarItem />
            </div>
          </div>
        </section>
      </div>

      <section className="animais-adocao">
        <h1>Animais para adoção</h1>
        <p>Adicione animais para adoção ou acompanhe o status dos seus animais.</p>
        <div className="disponiveis-info">
          <span>Disponíveis:</span>
          <span className="alterar-info">Clique nos ícones ou nas fotos para alterar.</span>
        </div>

        <div className="container-animais">
          <AnimalCard imgSrc={animal1} nome="Bob" localizacao="SP" sexo="Macho" vermifugado="Sim" idade="2 anos" />
          <AnimalCard imgSrc={animal2} nome="Luna" localizacao="RJ" sexo="Fêmea" vermifugado="Sim" idade="1 ano" />
          <AnimalCard imgSrc={animal2} nome="Luna" localizacao="RJ" sexo="Fêmea" vermifugado="Sim" idade="1 ano" />

        </div>
      </section>
    </>
  );
};

export default Perfil;
