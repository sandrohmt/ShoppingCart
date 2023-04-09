import React from 'react';

const Summary = ({totalValue, openModal, couponStatus}) => {

  const subtotal =   (totalValue / 0.9) - totalValue 

  return (
    <>
      <div className='box'>
        <header>Resumo da compra</header>
        <div className='info'>
          <div>
            <span>Sub-total</span>
            <span>R$ {couponStatus === "valid" ? Math.trunc(totalValue / 0.9): totalValue}</span>
          </div>
          <div>
            <span>Cupom de desconto</span>
            <span>{couponStatus === "valid" && "R$ " + Math.trunc(subtotal)}</span>
          </div>
          <div>
            <button onClick={openModal}>
              Adicionar cupom de desconto
              <i className='bx bx-right-arrow-alt'></i>
            </button>
          </div>
        </div>
        <footer>
          <span>Total</span>
          <span>R$ {totalValue}</span>
        </footer>
      </div>
      <button onClick={() => location.reload()} className='btn-new-project'>Finalizar Compra</button>
    </>
  );
};

export default Summary;