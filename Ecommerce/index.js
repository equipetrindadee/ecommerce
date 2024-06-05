import React, { useState } from "react";
import '../Ecommerce/Ecommerce.css';

export const Ecommerce = () => {

  const [currentSlide, setCurrentSlide] = useState(0);
  const images = ["talento1.png", "talento2.png", "talento3.png"];

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === images.length - 1 ? 0 : prevSlide + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? images.length - 1 : prevSlide - 1));
  };

  return (
    <div>

      <nav className="navbar nav-cart navbar-expand-lg bg-body-tertiary myGrid">

        <div className="container-fluid">

          <button className="navbar-toggler navChoco d-block d-sm-none menuResponsi" type="button" data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar" aria-controls="offcanvasDarkNavbar"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>



          <i className='bx bx-menu navbar-toggler' type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation"></i>
          <div className="offcanvas offcanvas-end myGridChild1" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">

            <div class="offcanvas-header">
              <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Menu</h5>
              <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body body-Cart">

              <ul className="nav navChocoDoce">

                <li className="nav-item nav-ChocoItem">
                  <a className="nav-link nav-chocoLink nav-alpha" href="#">Home</a>
                </li>
                {/*                 <li className="nav-item nav-ChocoItem">
                  <a className="nav-link nav-chocoLink nav-alpha" href="#">Store</a>
                </li> */}
                <li className="nav-item nav-ChocoItem">
                  <a className="nav-link nav-chocoLink nav-alpha" href="#">Quem Somos</a>
                </li>
              </ul>

            </div>

          </div>

        </div>
        <div className="alphaBrand myGridChild2">

          <img className="chocoRosa" src="/img/logoChocola.svg" alt="Bootstrap" />

        </div>

        <div className="input-group myGridChild3">
          <div className="pesquisarChoco">
            <i className="bi bi-search"></i>
            <input type="text" className="form-control" />
          </div>
          <i className="bi bi-cart2 carrinho"></i>
          <i className="bi bi-person-circle"></i>
        </div>

      </nav>

      <section className="orange-container">
        <div className="row">
          <div className="col-md-12  space-above">
            <h2 className="pattaya-text">Shop now</h2>
            <p className="montserrat-text">Entre e mergulhe em um mundo de delícias! Bem-vindo ao paraíso dos chocolates, onde cada pedaço é uma tentação irresistível.</p>
          </div>
        </div>
        <img src="menina-chocolate.png" alt="Sua Imagem" className="image-menina" />
      </section>

      <section className="colorful-background">
        <div className="overlay-content">
          <h2 className="overlay-title-righteous">  Descubra Quem Somos!</h2>
          {/* <p className="overlay-text-montserrat">Desde combinações clássicas até criações surpreendentes, cada mordida é uma experiência única de prazer e indulgência. <br></br> Corra para a nossa loja e mergulhe nessa tentação de sabores!</p> */}
          <p className="overlay-text-montserrat">A equipe Alpha Develop está ansiosa para revelar os resultados de seu esforço conjunto. Eles ressaltam a contribuição de cada membro e expressam orgulho pelo progresso alcançado. Venha conferir mais detalhes sobre nossa equipe!</p>
          <div class="buttons">
            <button class="saiba-mais-button">Saiba mais</button>
            {/*             <button class="comprar-button">Comprar</button> */}
          </div>
        </div>
      </section>



      <section className="centered-image">
        <img src="menino-comendo.png" alt="Sua Imagem" className="image-menino" />
        <div className="carousel-section">
          <div className="carousel">
            <button className="prev" onClick={prevSlide}><i class='bx bx-chevron-left'></i></button>
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Slide ${index}`}
                className={index === currentSlide ? "slide active" : "slide"}
              />
            ))}

            <button className="next" onClick={nextSlide}><i class='bx bx-chevron-right'></i></button>
          </div>
        </div>
      </section>

      <footer id="footer" >
        <div class="container">
          <div class="row ">
            <div class="col-md-3 WIDTH logoDiv">
              <div className="logoHome">
                <a href="index.html"><img src="alpha.svg" alt="" class="img-fluid logo-footer" width={130} /></a>
                <div class="footer-about">
                  <p>   </p>
                </div>
              </div>

            </div>
            <div class="col-md-3 faleConosco WIDTH">
              <div class="useful-link">
                <h2>Useful Links</h2>
                <img src="./assets/images/about/home_line.png" alt="" class="img-fluid" />
                <div class="use-links">
                  <li><a href="index.html"><i class="bi bi-caret-right-fill"></i> FALE CONOSCO</a></li>
                  <li><a href="about.html"><i class="bi bi-caret-right-fill"></i> FEEDBACK</a></li>
                  <li><a href="gallery.html"><i class="bi bi-caret-right-fill"></i> SUPORTE</a></li>
                  <li><a href="contact.html"><i class="bi bi-caret-right-fill"></i> REGULAMENTOS</a></li>
                </div>
              </div>

            </div>
            <div class="col-md-3 linksHome WIDTH">
              <div class="social-links">
                <h2>Follow Us</h2>
                <img src="./assets/images/about/home_line.png" alt="" />
                <div class="social-icons">
                  <li><a href=""><i class="bi bi-facebook"></i> Facebook</a></li>
                  <li><a href=""><i class="bi bi-instagram"></i> Instagram</a></li>
                  <li><a href=""><i class="bi bi-linkedin"></i> Linkedin</a></li>
                </div>
              </div>


            </div>
            <div class="col-md-3 localHome">
              <div class="address">
                <h2>Address</h2>
                <img src="./assets/images/about/home_line.png" alt="" class="img-fluid" />
                <div class="address-links">
                  <li class="address1"><i class="bi bi-geo-alt-fill"></i> Kolathur ramankulam-
                    Malappuram Dt
                    Kerala 679338</li>
                  <li><a href=""><i class="bi bi-telephone-fill"></i> +91 90904500112</a></li>
                  <li><a href=""><i class="bi bi-envelope-fill"></i> mail@1234567.com</a></li>
                </div>
              </div>
            </div>

          </div>
        </div>

      </footer>
      <section id="copy-right">
        <div class="copy-right-sec">
          <div className="itemsCopy">
            <i class="bi bi-c-circle"></i>
            <p>2021 Chobani, LCC,  All Rights Reserved</p>
            <a href="#">Privacy Policy</a>
          </div>
        </div>

      </section>

    </div>
  );
}

export default Ecommerce