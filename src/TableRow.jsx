import React, { useState } from 'react';

const TableRow = ({price, qtt, total, id, handlePlusClick, handleMinusClick, handleRemoveProduct, couponStatus}) => {
  
  return (
    <tr>
      <td>
        <div className='product'>
          <img src='https://picsum.photos/100/120' alt='Foto template' />
          <div className='info'>
            <div className='name'>Nome do produto</div>
            <div className='category'>Categoria</div>
          </div>
        </div>
      </td>
      <td>R${price}</td>
      <td>
        <div className='qty'>
          <button disabled={couponStatus === "valid"} onClick={() => {handleMinusClick(id)}}>
            <i className='bx bx-minus'></i>
          </button>
          <span>{qtt}</span>
          <button disabled={couponStatus === "valid"} onClick={() => {handlePlusClick(id)}}>
            <i className='bx bx-plus'></i>
          </button>
        </div>
      </td>
      <td>R$ {total}</td>
      <td>
        <button disabled={couponStatus === "valid"}
         onClick={() => handleRemoveProduct(id)}
        className='remove'>
          <i className='bx bx-x'></i>
        </button>
      </td>
    </tr>
  );
};

export default TableRow;