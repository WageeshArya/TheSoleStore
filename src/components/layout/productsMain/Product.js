import React, { useEffect } from 'react';
import { Link } from  'react-router-dom';
import { connect } from 'react-redux';
import { getSingle, setLoading } from '../../../actions/productsActions';
import { addToCart, resetLoginErr } from '../../../actions/cartActions';
import './Product.css';
import Loading from '../loading/Loading';
import bg from './bg/blob.svg';
import bg2 from './bg/blob2.svg';
export const Product = (props) => {

  const atc = () => {
    const prod = {
      _id: props.product._id,
      name: props.product.name,
      price: props.product.price,
      company: props.product.company
    }
    props.addToCart(prod);
    setTimeout(() => {
      props.resetLoginErr();
    },3000)
  }

  useEffect(() => {
    const productId = props.match.params.productId;
    props.setLoading();
    props.getSingle(productId);
    //eslint-disable-next-line
  },[]);

  if(props.product === null) {
    return <Loading />
  }
  else {
    return (
      <div className="productFull">
        <div className={props.loginErr ? 'showLoginErr' : 'hideLoginErr'}>Please log in before adding items to cart</div>
        <img className="bgBlob" src={bg} alt="background"/>
        <img className="bgBlob2" src={bg2} alt="background" />
        <div className="fullProductPgImage">
          <Link className="back" to="/shoes">Go back</Link>
          <img className="fullImg" src={props.product.fullProductImage} alt="full product"/>
        </div>
        <div className="details">
          <div className="detailsGrid">
            <div className="detailsGrid1">
              <h1 id="companyName">{props.product.company}</h1>
            <h2>{props.product.name} <span className="detailsYear">{props.product.year}</span></h2>
            </div>
            <div className="detailsGrid2">
              <h3>${props.product.price}</h3>
            </div>
          </div>
          <div className="detailsImg">
            <div>
              <img src={props.product.productImage} alt="Product"/>
            </div>
          </div>
          <div className="description">
            {props.product.description}
          </div>
          <div className="btns">
            <Link to="/cart" className={`goToCart ${props.loggedIn? '' : 'hideCartBtn'}`}><div>View Cart</div></Link>
            <div onClick={atc} className="productAtc">Add to cart</div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  product: state.products.product,
  loggedIn: state.users.loggedIn,
  loginErr: state.cart.loginErr
})
export default connect(mapStateToProps, { getSingle, setLoading, addToCart, resetLoginErr})(Product);
