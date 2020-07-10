import React, { useEffect } from 'react';
import { Link } from  'react-router-dom';
import { connect } from 'react-redux';
import { getSingle, setLoading } from '../../../actions/productsActions';
import './Product.css';
export const Product = (props) => {

  useEffect(() => {
    const productId = props.match.params.productId;
    props.setLoading();
    props.getSingle(productId);
  },[]);

  if(props.loading) {
    return <div>loading</div>
  }
  else {
    console.log(props.product);
    return (
      <div className="productFull">
        <div>
          <Link className="back" to="/shoes">Go back</Link>
          <img className="fullImg" src={`http://localhost:5000/${props.product.fullProductImage}`} alt="full product image"/>
        </div>
        <div className="details">
          <h1>{props.product.company}</h1>
          <h2>{props.product.name} <span class="detailsYear">{props.product.year}</span></h2>
          <div className="detailsImg">
            <div>
              <img src={`http://localhost:5000/${props.product.productImage}`} alt="Product image"/>
            </div>
          </div>
          <div class="description">
            {props.product.description}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  product: state.products.product,
  loading: state.products.loading
})
export default connect(mapStateToProps, { getSingle, setLoading })(Product);
