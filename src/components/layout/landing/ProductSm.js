import React, { useEffect, useState } from 'react';
import './ProductSm.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getProducts } from '../../../actions/productsActions';
export const ProductSm = (props) => {
  const colors = ['#FFDF8D','#FFD2BD','#00C6CF','#FFD3E3', '#FBF4D7', '#BEA7BD', '#61AFFF', '#FFF5FB']
  console.log(props.products);
  const [random, setRandom] = useState(Math.floor(Math.random()*props.products.length));
  const [color, setColor] = useState(Math.floor(Math.random()*colors.length));

  useEffect(() => {
    setInterval(() => {
      setRandom(Math.floor(Math.random()*props.products.length));
      setColor(Math.floor(Math.random()*colors.length));
      console.log(random);
    },3000);
  },[]);

  return (
    <div className="productSm" style={{backgroundColor: colors[color]}}>
      {
       props.products.length >= 1 && 
                <div className="product" >
                  <p>
                    <strong>{props.products[random].company}</strong>
                  </p>

                  <p style={{fontSize: '0.75rem'}}>
                    {props.products[random].name}
                  </p>

                  <Link to={`/shoes/${props.products[random]._id}`} className="productImg"><img className="image" src={`http://localhost:5000/${props.products[random].productImage}`} alt="productImage"/></Link>
                </div>
        }
    </div>
  )
}

const mapStateToProps = (state) => ({
  products: state.products.products,
  loading: state.products.products
})

export default connect(mapStateToProps, {getProducts})(ProductSm);