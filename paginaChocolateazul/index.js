import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import "../paginaChocolateazul/chocolateAzul.css"

    export const ChocolateAzul = () => {
        return (
            <body>
                <div className="container-azul">
                    <div className="text-talento">
                        <h1>
                            Chocolate Talento recheado
                        </h1>
                        <h2>
                            Cookies e Cream 85g
                        </h2>
                    </div>

                    <div className="retanguloAzul"></div>

                        <p class="precoTalento">R$ 9,00</p>
                        <div class="rating">
                            <input type="radio" id="star5" name="rate" value="5" />
                            <label for="star5" title="text"></label>
                            <input type="radio" id="star4" name="rate" value="4" />
                            <label for="star4" title="text"></label>
                            <input type="radio" id="star3" name="rate" value="3" />
                            <label for="star3" title="text"></label>
                            <input type="radio" id="star2" name="rate" value="2" />
                            <label for="star2" title="text"></label>
                            <input checked="" type="radio" id="star1" name="rate" value="1" />
                            <label for="star1" title="text"></label>
                        </div>

                    <div class="description-talentoAzul">DESCRIÇÃO</div>
                        <p class="productdescription-talentoAzul">
                            O Talento recheado dá água na boca, com sabor e <br></br> cremosidade irresistível,
                            a combinação do chocolate ao <br></br> leite Talento® com recheio de creme e biscoito sabor <br></br>chocolate.
                        </p>
                    <button class="buy-button">COMPRAR</button>

                    <div className="quadrado-talenzul"></div>
                        <div className="img-talentoAzul">
                            <img src="../img/imgTalentoazul.png" alt=""/>
                        </div>

                        <div className="bolaCarro"></div>
                            <div className="icon-talentoAzul" >
                        <i class='bx bx-cart'></i>
                    </div>

                </div>
            </body>
        )
    }

    export default ChocolateAzul