import './styles.scss';


function NewProduct({handleAddNewProduct, couponStatus}) {
  return (
    <button disabled={couponStatus === "valid"} onClick={handleAddNewProduct} className='btn-new-product'>
      Novo Produto
    </button>
  )
}

export default NewProduct