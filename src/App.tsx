import { useEffect, useState } from 'react';
import './App.scss';
import Header from './components/Header/Header';
import "bootstrap-icons/font/bootstrap-icons.scss";

interface Image {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
  isLoved?: boolean;
}

function App() {
  const [images, setImages] = useState<Image[]>([]);
  const [loadingComponent, setLoadingComponent] = useState<boolean>(true);

  useEffect(() => {
    GetImages();
  }, []);

  async function GetImages() {
    try {
      let getData = await fetch("https://picsum.photos/v2/list", { method: "GET" });
      if (getData.ok) {
        let data: Image[] = await getData.json();
        data = data.map(img => ({ ...img, isLoved: false }));
        setImages(data);
        setLoadingComponent(false);
      } else {
        console.log("Erro ao receber os dados: " + getData.statusText);
      }
    } catch (error) {
      console.log("Erro: " + error);
    }
  }

  const adicionarAos = (id: string) => {
    setImages(prevImages =>
      prevImages.map(img =>
        img.id === id ? { ...img, isLoved: !img.isLoved } : img
      )
    );
  }

  return (
    <>
      <div>
        <Header path={0} className='header' />
        <div className="mainContainer">
          {
            loadingComponent ? (
              <div className="loading">
                <div className="spinner">
                  <div className="spinner2"></div>
                </div>
              </div>
            ):(
              images.length > 0 ? (
                images.map((img) => (
                  <div className="card" key={img.id}>
                    <div className="topCard"></div>
                    <div className="starCard">
                      <button
                        title='Adicionar aos favoritos...'
                        onClick={() => adicionarAos(img.id)}
                      >
                        {img.isLoved ? <i className='bi bi-heart-fill'></i> : <i className='bi bi-heart'></i>}
                      </button>
                      <a href={img.download_url} download target='blank'>
                        <button title='Fazer o Download da imagem...'>
                          <i className="bi bi-box-arrow-down"></i>
                        </button>
                      </a>
                      <a href={img.url} target="_blank" rel="noopener noreferrer">
                        <button title='Link da imagem'>
                          <i className="bi bi-link"></i>
                        </button>
                      </a>
                    </div>
                    <div className="imgCard">
                      <img src={img.download_url} alt="image" />
                    </div>
                    <div className="detailsImage">
                      <span><b>Autor: </b>{img.author}</span><br />
                    </div>
                  </div>
                ))
              ) : (
                <div className="emptyCard">
                  <span>Sem imagens...</span>
                </div>
              )
            )
          }
        </div>
      </div>
    </>
  );
}

export default App;
