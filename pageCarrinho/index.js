import React, { useState, useEffect } from 'react';
import api from "../../config/configApi";
import "./cart.css";


export const Cart = () => {

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

            <nav className="navbar nav-cart navbar-expand-lg bg-body-tertiary myGrid">

                <div className="container-fluid">

                    <button className="navbar-toggler navChoco d-block d-sm-none menuResponsi" type="button" data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasNavbar" aria-controls="offcanvasDarkNavbar"
                        aria-label="Toggle navigation">
                        <i class="bi bi-list"></i>
                    </button>

                    <div className="offcanvas offcanvas-end myGridChild1" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">

                        <div class="offcanvas-header">
                            <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Menu</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div class="offcanvas-body body-Cart col-6">

                            <ul className="nav navChocola">

                                <li className="nav-item nav-ChocoItem">
                                    <a className="nav-link nav-chocoLink nav-alpha" href="#">Home</a>
                                </li>
                                <li className="nav-item nav-ChocoItem">
                                    <a className="nav-link nav-chocoLink nav-alpha" href="#">Store</a>
                                </li>
                                <li className="nav-item nav-ChocoItem">
                                    <a className="nav-link nav-chocoLink nav-alpha" href="#">Blog</a>
                                </li>
                                <li className="nav-item nav-ChocoItem">
                                    <a className="nav-link nav-chocoLink nav-alpha" href="#">Contatcs</a>
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
                    <i className="bi bi-cart2"></i>
                    <i className="bi bi-person-circle"></i>
                </div>

            </nav>

            <div className='conteudoCart'>
                <div className='chocoTopo'>
                    <div className='voltarCart'>
                        <i class="bi bi-caret-left-fill setaVolta"></i>
                        <h2 className='hVoltar'>Voltar</h2>
                    </div>
                    <h1 className='titleCart'>Carrinho</h1>
                </div>


                    <div className='produtosCart'>
                        {cart.length > 0 ? (
                            cart.map((product) => (
                                <div key={product.id} className="product">
                                    <h2>{product.name}</h2>
                                    <p>Preço: {product.price}</p>
                                    <p>Quantidade: {product.quantity}</p>
                                </div>
                            ))
                        ) : (
                            <p>Seu carrinho está vazio.</p>
                        )}
                    </div>


                    <div className='finalizarCart'>
                        <img src='/img/pagarPIX.svg' />
                        <div className='informCart'>
                            <h1 className='titleTotal'>Total</h1>
                            <h2 className='totalPreco'>Total: {total}</h2>
                            <h2 className='totalPreco'>Delivery</h2>
                            <button className='finalizarChoco' onClick={finalizePurchase}>Check Out</button>
                        </div>
                    </div>

            </div>
        </div>

    )

}

export default Cart;