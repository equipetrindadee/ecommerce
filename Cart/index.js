import React, { useState, useEffect } from 'react';

import api from "../../config/configApi";

import "./carrinho.css";

export const Carrinho = () => {



    // Estado para armazenar todos os produtos disponíveis 

    const [allProducts, setAllProducts] = useState([]);

    // Estado para armazenar os produtos no carrinho 

    const [cart, setCart] = useState([]);

    // Estado para armazenar o valor total dos produtos no carrinho 

    const [total, setTotal] = useState(0);

    // Estado para armazenar possíveis erros 

    const [error, setError] = useState('');

    // Estado para armazenar a quantidade selecionada pelo usuário para cada produto 

    const [selectedQuantities, setSelectedQuantities] = useState({});



    // Função para buscar todos os produtos do servidor 

    const fetchAllProducts = async () => {

        try {

            const response = await api.get('/produtos');

            console.log('Resposta da API:', response.data);

            setAllProducts(response.data.products);

        } catch (error) {

            console.error('Erro ao buscar os produtos:', error);

            setError('Erro ao buscar os produtos');

        }

    };



    // Função para adicionar um produto ao carrinho 

    // Função para adicionar um produto ao carrinho 

    const addToCart = (product) => {

        const quantity = selectedQuantities[product.id] || 0;

        const finalQuantity = quantity === 0 ? 1 : quantity; // Se a quantidade for zero, adiciona apenas 1 item 

        setCart((prevCart) => {

            const existingProductIndex = prevCart.findIndex((item) => item.id === product.id);

            if (existingProductIndex !== -1) {

                // Se o produto já estiver no carrinho, atualiza a quantidade 

                const updatedCart = [...prevCart];

                updatedCart[existingProductIndex].quantity += finalQuantity;

                return updatedCart;

            } else {

                // Se o produto não estiver no carrinho, adiciona ao carrinho com a quantidade selecionada 

                return [...prevCart, { ...product, quantity: finalQuantity }];

            }

        });

        // Limpar a quantidade selecionada após adicionar ao carrinho 

        setSelectedQuantities((prev) => ({ ...prev, [product.id]: 0 }));

    };





    // Função para calcular o valor total dos produtos no carrinho 

    const calculateTotal = () => {

        const totalValue = cart.reduce((acc, product) => acc + product.price * product.quantity, 0);

        setTotal(totalValue);

    };

    // Função para finalizar a compra 

    const finalizePurchase = async () => {

        try {

            let purchaseAllowed = true; // Flag para verificar se a compra é permitida 



            // Para cada produto no carrinho, verifica se há quantidade suficiente em estoque 

            for (const product of cart) {

                const updatedAmount = product.amount - product.quantity; // Atualiza o estoque subtraindo a quantidade comprada 



                // Verifica se há quantidade suficiente em estoque para o produto 

                if (updatedAmount < 0) {

                    purchaseAllowed = false;

                    break; // Para a iteração se algum produto não tiver quantidade suficiente em estoque 

                }

            }



            // Se a compra for permitida, atualiza o estoque e as vendas de cada produto 

            if (purchaseAllowed) {

                for (const product of cart) {

                    const updatedAmount = product.amount - product.quantity; // Atualiza o estoque subtraindo a quantidade comprada 

                    const updatedSold = product.sold + product.quantity; // Atualiza as vendas adicionando a quantidade comprada 



                    // Envia uma solicitação PUT para atualizar o produto no banco de dados 

                    await api.put(`/produtos/${product.id}`, { amount: updatedAmount, sold: updatedSold });

                }



                // Limpa o carrinho após a compra 

                setCart([]);

                // Exibe uma mensagem de sucesso após finalizar a compra 

                console.log('Compra finalizada com sucesso!');

            } else {

                // Exibe uma mensagem informando que a compra não pode ser realizada devido à quantidade insuficiente em estoque 

                alert('Não foi possível realizar a compra. Quantidade insuficiente em estoque.');

            }

        } catch (error) {

            console.error('Erro ao finalizar a compra:', error);

            // Exibe uma mensagem de erro se houver algum problema ao finalizar a compra 

        }

    };

    // Atualizar a quantidade selecionada para um produto 

    const updateQuantity = (productId, quantity) => {

        setSelectedQuantities((prev) => ({ ...prev, [productId]: quantity }));

    };

    // UseEffect para buscar todos os produtos quando o componente for montado 

    useEffect(() => {

        fetchAllProducts();

    }, []);

    // UseEffect para recalcular o valor total quando o carrinho é atualizado 

    useEffect(() => {

        calculateTotal();

    }, [cart]);

    return (
        <div>
            <body>
                <header>
                    <nav className="navbar nav-cart navbar-expand-lg myGrid">
                        <div className="container-fluid">

                            <button className="navbar-toggler navChoco d-block d-sm-none menuResponsi" type="button" data-bs-toggle="offcanvas"

                                data-bs-target="#offcanvasNavbar" aria-controls="offcanvasDarkNavbar"

                                aria-label="Toggle navigation">

                                <i className="bi bi-list"></i>

                            </button>

                            <div className="offcanvas offcanvas-end myGridChild1" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">

                                <div className="offcanvas-header">

                                    <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Menu</h5>

                                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>

                                </div>

                                <div className="offcanvas-body body-Cart col-6">

                                    <ul className="nav navChocola">

                                        <li className="nav-item nav-ChocoItem">

                                            <a className="nav-link nav-chocoLink nav-alpha" href="#">Home</a>

                                        </li>

                                        <li className="nav-item nav-ChocoItem">

                                            <a classNameName="nav-link nav-chocoLink nav-alpha" href="#">Store</a>

                                        </li>

                                        <li className="nav-item nav-ChocoItem">

                                            <a className="nav-link nav-chocoLink nav-alpha" href="#">Quem somos</a>

                                        </li>

                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="alphaBrand myGridChild2">

                            <img src="../../img/logo_Chocolate.svg" alt="Logo Eccommerce" />

                        </div>

                        <div className="input-group myGridChild3">

                            <div className="pesquisarChoco">

                                <i className="bi bi-search icon-search"></i>

                                <input type="text" classNameName="form-control" />

                            </div>

                            <i className="bi bi-cart bi-cart2"></i>

                            <i className="bi bi-person-circle person-circle"></i>

                        </div>
                    </nav>
                </header>

                <div className="container-fluid">
                    <div className="row">
                        
                        {/* parte dos cards */}
                        <div className="container">
                            <div className='unidades-product'>
                                <div className="card-product">
                                    <div className=" parte1-product">
                                        <img src="talento1.png" alt="chocolate" />
                                        <div className=' textos'>
                                                <h5>Chocolate Talento recheado Cookies e Cream 85g</h5>
                                                <p>Codigo do Produto</p>
                                        </div>
                                    </div>
                                    
                                    <div className='parte2-product'>
                                        <div className="price-product">
                                            <h5>Total</h5>
                                            <p style={{color:'orange'}}>R$ 19,00</p>
                                        </div>
                                        <div className="deletar-product">
                                        <button className="btn ">X</button>
                                        </div>
                                    </div>
                                
                                </div>
                                <div className="card-product">
                                    <div className=" parte1-product">
                                        <img src="talento1.png" alt="chocolate" />
                                        <div className=' textos'>
                                                <h5>Chocolate Talento recheado Cookies e Cream 85g</h5>
                                                <p>Codigo do Produto</p>
                                        </div>
                                    </div>
                                    
                                    <div className='parte2-product'>
                                        <div className="price-product">
                                            <h5>Total</h5>
                                            <p style={{color:'orange'}}>R$ 19,00</p>
                                        </div>
                                        <div className="deletar-product">
                                        <button className="btn ">X</button>
                                        </div>
                                    </div>
                                
                                </div>
                                <div className="card-product">
                                    <div className=" parte1-product">
                                        <img src="talento1.png" alt="chocolate" />
                                        <div className=' textos'>
                                                <h5>Chocolate Talento recheado Cookies e Cream 85g</h5>
                                                <p>Codigo do Produto</p>
                                        </div>
                                    </div>
                                    
                                    <div className='parte2-product'>
                                        <div className="price-product">
                                            <h5>Total</h5>
                                            <p style={{color:'orange'}}>R$ 19,00</p>
                                        </div>
                                        <div className="deletar-product">
                                        <button className="btn ">X</button>
                                        </div>
                                    </div>
                                
                                </div>
                                <button className="btn limpar-cart" style={{color:'orange'}}>Limpar Carrinho</button>
                            </div>
                       

                        {/* Parte do Pagamento */}
                        {/* <div className="col-md-5 right-side">

                            <div className="summary-card p-3">

                                <img src="../../img/pagarPIX (3).svg" alt="Resumo" className="img-fluid mb-4" />


                                <div className="summary-info">

                                    <h3>Total</h3>

                                    <p>Total: </p>

                                    <p>$19,99</p>



                                    <div className="btn-group delivery">

                                        <button type="button" className="btn  delivery-button  " data-bs-toggle="dropdown" aria-expanded="false">

                                            <h1>Delivery</h1>

                                            <i className="bi bi-caret-down-fill"></i>

                                        </button>

                                        <ul className="dropdown-menu delivery-menu">

                                            <li><a className="dropdown-item" href="#">Action</a></li>

                                            <li><a className="dropdown-item" href="#">Another action</a></li>

                                            <li><a className="dropdown-item" href="#">Something else here</a></li>



                                        </ul>

                                    </div>

                                    <div className='summary-footer'>

                                        <h3>Aceitamos

                                        </h3>

                                        <div className='summary-footer-buttons'>

                                            <button className="btn  custom-btn">Botão 1</button>

                                            <button className="btn  custom-btn">Botão 2</button>

                                            <button className="btn  custom-btn">Botão 3</button>

                                            <button className="btn btn-primary custom-btn">Botão 4</button>



                                        </div>



                                    </div>

                                    <div className='summary-footer'>

                                        <h3>Aceitamos

                                        </h3>

                                        <div className='summary-footer-buttons'>

                                            <button className="btn  custom-btn">Botão 1</button>

                                            <button className="btn  custom-btn">Botão 2</button>

                                            <button className="btn  custom-btn">Botão 3</button>

                                            <button className="btn btn-primary custom-btn">Botão 4</button>



                                        </div>



                                    </div>

                                    <div className='summary-footer'>

                                        <h3>Aceitamos

                                        </h3>

                                        <div className='summary-footer-buttons'>

                                            <button className="btn  custom-btn">Botão 1</button>

                                            <button className="btn  custom-btn">Botão 2</button>

                                            <button className="btn  custom-btn">Botão 3</button>

                                            <button className="btn btn-primary custom-btn">Botão 4</button>



                                        </div>

                                    </div><div className='summary-footer'>

                                        <h3>Aceitamos

                                        </h3>

                                        <div className='summary-footer-buttons'>

                                            <button className="btn  custom-btn">Botão 1</button>

                                            <button className="btn  custom-btn">Botão 2</button>

                                            <button className="btn  custom-btn">Botão 3</button>

                                            <button className="btn btn-primary custom-btn">Botão 4</button>



                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                        {/* fim do conteiner */}
                        </div> 

                    </div>

                </div>

            </body>

        </div>



    )



}



export default Carrinho;

