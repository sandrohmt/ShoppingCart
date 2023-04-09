/*
? DESAFIO - Shopping Cart:
Você deve desenvolver um carrinho de compras funcional.
Funcionalidades que esperamos que você desenvolva:
todo - fazer um placeholder para quando não houver itens no carrinho - check
todo - inserção de novos produtos no carrinho - check
todo - remoção de produtos já inseridos - check
todo - alteração de quantidade de cada item - check
todo - cálculo do preço total dos itens inseridos
todo - FUNCIONALIDADE EXTRA: aplicação de cupom de desconto
*/
import './styles.scss';

import React from 'react'
import { useState } from 'react';
import uuid from 'react-uuid';
import Modal from "react-modal"

import PageHeader from './layout/PageHeader';
import PageTitle from './layout/PageTitle';
import Summary from './Summary';
import TableRow from './TableRow';
import NewProduct from './NewProduct';
import NoProducts from './layout/NoProducts';

Modal.setAppElement("#root")

function App() {

  const [products, setProducts] = useState([])
  const [totalValue, setTotalValue] = useState(0)
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const [couponStatus, setCouponStatus] = useState("")

  function handleAddNewProduct() {
    
    const newPrice = Math.trunc(Math.random() * (2000 - 100) + 100)
    setTotalValue((prev) => prev + newPrice)

    const NewProduct = {
      price: newPrice,
      qtt: 1,
      total: newPrice,
      id: uuid()
    }

    setProducts((prev) => [...prev, NewProduct])
  }

  function handlePlusClick(id) {
    const newProduct = products.map((product) => {
      if(product.id == id) {
        product.qtt += 1
        product.total += product.price
        setTotalValue((prev) => prev + product.price)
      }
      return product
    })
    setProducts(newProduct)
  }

  
  function handleMinusClick(id) {

    const newProduct = products.map((product) => {
      if(product.id === id) {
        if(product.qtt !== 1) {
          product.qtt -= 1
          product.total -= product.price
          setTotalValue((prev) => prev - product.price)
        }
      }
      return product
    })
    setProducts(newProduct)
  }

  function handleRemoveProduct(idToRemove) {
   const newList = products.filter((product) =>  product.id !== idToRemove) 
   setProducts(newList)
   products.map((product) => {
    if(product.id == idToRemove) {
      setTotalValue((prev) => prev - product.total)
    }
   })
  }

  function openModal() {
    setModalIsOpen(true)
  }

  function closeModal() {
    setModalIsOpen(false)
  }

  function handleGetInput(event) {
    setInputValue(event.target.value)
  }

  function handleValidateCoupon() {
    const validCoupons = ["TESTE", "TESTE10", "TESTE50"]
    if(validCoupons.includes(inputValue.toUpperCase())) {
      setInputValue("")
      setCouponStatus("valid")
      const newValue = Math.trunc(totalValue * 0.9)
      setTotalValue(newValue)
    }
    else {
      setCouponStatus("invalid")
    }
  }
  

  return (
    <>
      <PageHeader />
      <main>
        <PageTitle data={'Seu carrinho'} />
        <div className='content'>
          <section>
          <NewProduct couponStatus={couponStatus}
            handleAddNewProduct={handleAddNewProduct} />
            <table>
              <thead>
                <tr>
                  <th>Produto</th>
                  <th>Preço</th>
                  <th>Quantidade</th>
                  <th>Total</th>
                  <th>-</th>
                </tr>
              </thead>
              <tbody>
                {products.length ? products.map((product) => (
                  <TableRow 
                  price={product.price}
                  qtt={product.qtt}
                  total={product.total}
                  key={product.id}
                  id={product.id}  
                  handleRemoveProduct={handleRemoveProduct} 
                  handlePlusClick={handlePlusClick}
                  handleMinusClick={handleMinusClick}
                  couponStatus={couponStatus}
                  />
                )) : <NoProducts/>}
              </tbody>
            </table>
          </section>
          <aside>
            <Summary
             totalValue={totalValue} 
             openModal={openModal}
             couponStatus={couponStatus}
             />
             <Modal
             isOpen={modalIsOpen}
             onRequestClose={closeModal}
             contentLabel="Example Modal"
             overlayClassName="modal-overlay"
             className="modal-content"
             >
              <h2>Adicione um cupom de desconto:</h2> 
              <h2>Depois de aplicado, não poderam ser feitas mudanças no valor total!</h2>
              <input
               type="text" 
               onChange={() => handleGetInput(event)}   
               value={inputValue} 
               />
              <button 
              onClick={handleValidateCoupon} 
              className='btn-new-product'
              disabled={inputValue.length === 0 || couponStatus === "valid"}
              >
                Aplicar cupom
              </button>
             {couponStatus === "valid" && <h1 className='valid'>Cupom aplicado!</h1>}
             {couponStatus === "invalid" && <h1 className='invalid'>Cupom inexistente...</h1>}
             </Modal>
          </aside>
        </div>
      </main>
    </>
  );
}

export default App;
 