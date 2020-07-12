import React, { useEffect } from 'react';
import { Link } from  'react-router-dom';
import { connect } from 'react-redux';
import { getSingle, setLoading } from '../../../actions/productsActions';
import './Product.css';
import bg from './bg/blob.svg';
import bg2 from './bg/blob2.svg';
export const Product = (props) => {

  useEffect(() => {
    const productId = props.match.params.productId;
    props.setLoading();
    props.getSingle(productId);
    //eslint-disable-next-line
  },[]);

  if(props.loading) {
    return <div>loading</div>
  }
  else {
    console.log(props.product);
    return (
      <div className="productFull">
        <img className="bgBlob" src={bg} alt="background"/>
        <img className="bgBlob2" src={bg2} alt="background" />
        <div>
          <Link className="back" to="/shoes">Go back</Link>
          <img className="fullImg" src={`http://localhost:5000/${props.product.fullProductImage}`} alt="full product"/>
        </div>
        <div className="details">
          <div className="detailsGrid">
            <div className="detailsGrid1">
              <h1>{props.product.company}</h1>
            <h2>{props.product.name} <span className="detailsYear">{props.product.year}</span></h2>
            </div>
            <div className="detailsGrid2">
              <h3>${props.product.price}</h3>
            </div>
          </div>
          <div className="detailsImg">
            <div>
              <img src={`http://localhost:5000/${props.product.productImage}`} alt="Product"/>
            </div>
          </div>
          <div className="description">
            {props.product.description}
          </div>
          <div class="productAtc">Add to cart</div>
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
