import React, { useState, useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import "./cart.css";

export const NewCart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        cep: '',
        state: '',
        city: '',
        number: '',
        street: '',
        complement: '',
        paymentMethod: '',
        cardNumber: '',
        securityCode: '',
        expiryDate: ''
    });
    const [purchaseCode, setPurchaseCode] = useState('');
    const [showThankYouMessage, setShowThankYouMessage] = useState(false);

    useEffect(() => {
        // Ler os itens do carrinho da sessão temporária ao carregar a tela
        const storedCartItems = sessionStorage.getItem('cartItems');
        if (storedCartItems) {
            setCartItems(JSON.parse(storedCartItems));
        }
    }, []);

    const clearCart = () => {
        // Limpar todos os itens do carrinho
        setCartItems([]);
        // Limpar a sessão temporária
        sessionStorage.removeItem('cartItems');
    };

    const removeItem = (index) => {
        const updatedCartItems = [...cartItems];
        updatedCartItems.splice(index, 1);
        setCartItems(updatedCartItems);
        sessionStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handlePaymentMethodChange = (e) => {
        const { value } = e.target;
        setFormData({ ...formData, paymentMethod: value });
    };

    const handleCheckOut = () => {
        setShowModal(false);
        setShowThankYouMessage(true);
        handleFinalizePurchase();
    };

    const handleFinalizePurchase = () => {
        const code = generatePurchaseCode();
        console.log('Código da compra:', code);
        setPurchaseCode(code);
    };

    const generatePurchaseCode = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const length = 8;
        let code = '';
        for (let i = 0; i < length; i++) {
            code += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return code;
    };

    // Função para calcular o total da conta
    const calculateTotal = () => {
        let total = 0;
        cartItems.forEach(item => {
            total += item.price * item.quantity;
        });
        return total.toFixed(2); // Arredonda para 2 casas decimais
    };

    return (
        <div>
            <div className='cart'>
                <h2>Shopping Cart</h2>
                <ul>
                    {cartItems && cartItems.map((item, index) => (
                        <li key={index}>
                            <span>{item.name}</span>
                            <span>Valor Individual: ${item.price}</span>
                            <span>Valor total Produto: ${item.price * item.quantity}</span>
                            <span>Quantity: {item.quantity}</span>
                            <button onClick={() => removeItem(index)}>X</button>
                        </li>
                    ))}
                </ul>
                <button onClick={clearCart}>Limpar Carrinho</button>
                <button data-bs-dismiss="" onClick={() => setShowModal(true)}>Check Out</button>
                {showThankYouMessage && <p>Obrigado por comprar na nossa loja. Seu código de compra é: {purchaseCode}</p>}
            </div>
            {showModal && (

                <div >
                    <div className="modal-content modal-contentCart">
                        <div className="modal-headerCart">
                            <h1 className="modal-title CartMTitle" id="exampleModalLabel">Finalizando</h1>
                        </div>

                        <div className='modal-body modal-bodyCart'>
                            <form className="modal-bodyCartGrid">
                                <div className="divCartM1">
                                    <div className="cartForms">
                                        <label htmlFor="name" className='labelCart'>Nome</label>
                                        <input
                                            className='inputCart'
                                            type="text" id="name" name="name" onChange={handleInputChange} value={formData.name} required />
                                    </div>
                                    <div className="cartForms">
                                        <label htmlFor="cep" className='labelCart'>CEP</label>
                                        <input
                                            className=' inputCart'
                                            type="text" id="cep" name="cep" onChange={handleInputChange} value={formData.cep} required />
                                    </div>
                                    <div className="cartForms">
                                        <label htmlFor="street"
                                            className="labelCart">Rua</label>
                                        <input
                                            className="inputCart" type="text" id="street" name="street" onChange={handleInputChange} value={formData.street} required />
                                    </div>
                                    <div className="cartForms">
                                        <label htmlFor="paymentMethod"
                                            className="labelCart">Forma de Pagamento</label>
                                        <select id="paymentMethod" name="paymentMethod" onChange={handlePaymentMethodChange} value={formData.paymentMethod} required>
                                            <option value="">Selecione</option>
                                            <option value="credito">Crédito</option>
                                            <option value="debito">Débito</option>
                                        </select>
                                    </div>
                                    <div className="cartForms">
                                        <label htmlFor="cardNumber"
                                            className="labelCart">Número do Cartão</label>
                                        <input
                                            className="inputCart"
                                            type="text" id="cardNumber" name="cardNumber" onChange={handleInputChange} value={formData.cardNumber} required />
                                    </div>

                                </div>
                                <div className="divCartM2">
                                    <div className="cartForms">
                                        <label htmlFor="phone"
                                            className="labelCart">Telefone</label>
                                        <input
                                            className="inputCart"
                                            type="text" id="phone" name="phone" onChange={handleInputChange} value={formData.phone} required />
                                    </div>
                                    <div className='cardParentInfo'>
                                        <div className="mb-4 cardInfo1">
                                            <label htmlFor="state" className="labelCart">Estado</label>
                                            <input
                                                className="inputCart"
                                                type="text" id="state" name="state" onChange={handleInputChange} value={formData.state} required />
                                        </div>
                                        <div className="mb-4 cardInfo1">
                                            <label htmlFor="city" className="labelCart">Cidade</label>
                                            <input
                                                className="inputCart"
                                                type="text" id="city" name="city" onChange={handleInputChange} value={formData.city} required />
                                        </div>
                                        <div className="mb-4 cardInfo1">
                                            <label htmlFor="number" className="labelCart">Número</label>
                                            <input
                                                className="inputCart"
                                                type="text" id="number" name="number" onChange={handleInputChange} value={formData.number} required />
                                        </div>
                                    </div>
                                    <div className="cartForms">
                                        <label htmlFor="complement" className="labelCart">Complemento</label>
                                        <input
                                            className="inputCart"
                                            type="text" id="complement" name="complement" onChange={handleInputChange} value={formData.complement} />
                                    </div>
                                    <div className="cartForms">
                                        <label htmlFor="securityCode"
                                            className="labelCart">Código de Segurança</label>
                                        <input
                                            className="inputCart"
                                            type="text" id="securityCode" name="securityCode" onChange={handleInputChange} value={formData.securityCode} required />
                                    </div>
                                    <div className="cartForms">
                                        <label htmlFor="expiryDate"
                                            className="labelCart">Data de Validade do Cartão</label>
                                        <input
                                            className="inputCart" type="text" id="expiryDate" name="expiryDate" onChange={handleInputChange} value={formData.expiryDate} required />
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footerCart">
                            <div className="cartFooterTotal">
                                <h1>Total</h1>
                                <h5>9,00</h5>
                            </div>
                            <button className="modalCartFbtn" type="button" onClick={handleCheckOut}>COMPRAR</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default NewCart;
