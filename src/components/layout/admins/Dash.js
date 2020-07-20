import React, { useState, useEffect } from 'react';
import './Dash.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProducts, setLoading } from '../../../actions/productsActions';
import { newProduct, updateProduct, deleteProduct } from '../../../actions/adminActions';

import edit from '../../../icons/edit.svg';
import del from '../../../icons/delete.svg';
import cancel from '../../../icons/cancel.svg';
import home from '../../../icons/home.svg';

export const Dash = (props) => {

  useEffect(() => {
    props.getProducts();
    //eslint-disable-next-line
  }, [props.products]);

  const products = props.products;
  
  const [showProductForm, setShowProductForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  const [confDelete, setConfDelete] = useState(false);
  const [toDelete, setToDelete] = useState(null);

  const [showAdded, setShowAdded] = useState(false);
  const [showUpdated, setShowUpdated] = useState(false);
  const [showDeleted, setShowDeleted] = useState(false);

  const [newName, setNewName] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newCompany, setNewCompany] = useState('');
  const [newYear, setNewYear] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newProdImg, setNewProdImg] = useState(null);
  const [newFullImg, setNewFullImg] = useState(null)

  const [updateProductId, setUpdateProductId] = useState('');
  const [updatedName, setUpdatedName] = useState('');
  const [updatedPrice, setUpdatedPrice] = useState('');
  const [updatedCompany, setUpdatedCompany] = useState('');
  const [updatedDesc, setUpdatedDesc] = useState('');
  const [updatedYear, setUpdatedYear] = useState('');

  const newNameChange = e => {
    setNewName(e.target.value);
  }

  const newCompanyChange = e => {
    setNewCompany(e.target.value);
  }

  const newPriceChange = e => {
    setNewPrice(e.target.value);
  }

  const newYearChange = e => {
    setNewYear(e.target.value);
  }

  const newDescChange = e => {
    setNewDesc(e.target.value);
  }

  const newProdImgChange = e => {
    setNewProdImg(e.target.files[0]);
  }

  const newFullImgChange = e => {
    setNewFullImg(e.target.files[0]);
  }

  const updateNameChange = e => {
    setUpdatedName(e.target.value);
  }

  const updateCompanyChange = e => {
    setUpdatedCompany(e.target.value);
  }

  const updatePriceChange = e => {
    setUpdatedPrice(e.target.value);
  }

  const updateYearChange = e => {
    setUpdatedYear(e.target.value);
  }

  const updateDescChange = e => {
    setUpdatedDesc(e.target.value);
  }

  const showNewProductForm = () => {
    setShowProductForm(true);
  }

  const showUpdateProductForm = (product) => {
    setUpdateProductId(product._id);
    setShowUpdateForm(true);
    setUpdatedName(product.name);
    setUpdatedCompany(product.company);
    setUpdatedPrice(product.price);
    setUpdatedYear(product.year);
    setUpdatedDesc(product.description);
  }

  const closeForm = () => {
    setShowProductForm(false);
    setShowUpdateForm(false);
  }

  const createNewProduct = (e) => {
    e.preventDefault();
    const newProduct = {
      name: newName,
      price: newPrice,
      company: newCompany,
      description: newDesc,
      year: newYear,
      productImage: newProdImg,
      fullProductImage: newFullImg
    };

    console.log(newProduct);
    props.newProduct(newProduct)
    setShowProductForm(false);
    setShowAdded(true);
    setTimeout(() => {
      setShowAdded(false);
    }, 1500);
  }

  const updateProductItem = (e) => {
    e.preventDefault();
    const updatedProduct = {
      _id: updateProductId,
      name: updatedName,
      price: updatedPrice,
      company: updatedCompany,
      description: updatedDesc,
      year: updatedYear
    }
    console.log(updatedProduct);
    props.updateProduct(updatedProduct);
    setShowUpdateForm(false);
    setShowUpdated(true);
    setTimeout(() => {
      setShowUpdated(false);
    }, 1500);
  }

  const showConfDel = (productId) => {
    setToDelete(productId);
    setConfDelete(true);
  } 

  const delProduct = () => {
    props.deleteProduct(toDelete);
    setConfDelete(false);
    setShowDeleted(true);
    setTimeout(() => {
      setShowDeleted(false);
    }, 1500);
  }

  if(!props.adminLoggedIn) {
    return <div><strong>Error 401:</strong> Unauthorized</div>
  } 

  return (
    <div className="dashBody">

      <div className="dashHead">
        <h1>Welcome to your Dashboard!</h1>
        <Link to="/"><img src={home} alt="go home"/></Link>
        <button onClick={showNewProductForm} className="addNew">Add new product</button>
      </div>

      <form onSubmit={createNewProduct} className={showProductForm ? 'adminForm' : 'hideForm' }>
        <span onClick={closeForm} className="closeForm"><img src={cancel} alt="cancel"/></span>
        <label htmlFor="name">Name</label>
        <input onChange={newNameChange} name="name" type="text"/>
        <label htmlFor="company">Company</label>
        <input onChange={newCompanyChange} name="company" type="text"/>
        <label htmlFor="price">Price</label>
        <input onChange={newPriceChange} name="price"type="text"/>
        <label htmlFor="year">Year</label>
        <input onChange={newYearChange} name="year" type="text"/>
        <label htmlFor="description">Description</label>
        <textarea onChange={newDescChange} name="description" cols="30" rows="10" />
        <label htmlFor="productImage">Product Image</label>
        <input onChange={newProdImgChange} name="productImage" type="file"/>
        <label htmlFor="fullProductImage">Full Product Image</label>
        <input onChange={newFullImgChange} name="fullProductImage" type="file"/>
        <div className="submitNew">
          <input type="submit" value="submit" />
        </div>
      </form>

      <form onSubmit={updateProductItem} className={showUpdateForm ? 'adminForm' : 'hideForm'}>
        <span onClick={closeForm} className="closeForm"><img src={cancel} alt="cancel"/></span>
        <label htmlFor="name">Name</label>
        <input onChange={updateNameChange} name="name" type="text" value={updatedName} />
        <label htmlFor="company">Company</label>
        <input onChange={updateCompanyChange} name="company" type="text" value={updatedCompany} />
        <label htmlFor="price">Price</label>
        <input onChange={updatePriceChange} name="price"type="text" value={updatedPrice} />
        <label htmlFor="year">Year</label>
        <input onChange={updateYearChange} name="year" type="text" value={updatedYear} />
        <label htmlFor="description">Description</label>
        <textarea onChange={updateDescChange} name="description" cols="30" rows="10" value={updatedDesc} />
        <div className="submitNew">
          <input type="submit" value="submit" />
        </div>

      </form>
      <div className={confDelete ? 'showConfDel' : 'hideForm'}>
        <h3>Delete product?</h3>
        <div className="confDelBtns">
          <button onClick={delProduct}>Delete</button>
          <button onClick={() => setConfDelete(false)}>Cancel</button>
        </div>
      </div>

      <div className={ (showAdded||showUpdated||showDeleted) ?'showItemUpdate':'hideForm'}>
        {
          showAdded && (<p>Added new product!</p>)
        }
        {
          showUpdated && (<p>Product updated!</p>)
        }
        {
          showDeleted && (<p>Product deleted!</p>)
        }
      </div>

      {
        products.map((product => {
          return <div key={product._id} className="dashItem">
                  <div>
                    <div><strong>_id: </strong> {product._id}</div>
                    <div><strong>name: </strong> {product.name}</div>
                    <div><strong>company: </strong>{product.company}</div>
                    <div><strong>price: </strong> {product.price}</div>
                    <div><strong>description: </strong> {product.description}</div>
                  </div>
                  <div className="dashItemBtns">
                    <button onClick={() => showConfDel(product._id)}><img src={del} alt="delete product" /></button>
                    <button onClick={() => showUpdateProductForm(product)}><img src={edit} alt="edit product" /></button>
                    <Link to={`/shoes/${product._id}`}>Go to product</Link>
                  </div>
                </div>
        }))
      }
    </div>
  )
}

const mapStateToProps = state => ({
  products: state.products.products,
  adminLoggedIn: state.admins.loggedIn
});

export default connect(mapStateToProps, {getProducts, setLoading, newProduct, updateProduct, deleteProduct})(Dash);