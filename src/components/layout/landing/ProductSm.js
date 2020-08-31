import React, { useEffect, useState } from 'react';
import './ProductSm.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getProducts } from '../../../actions/productsActions';
export const ProductSm = (props) => {
  const colors = ['#FFDF8D','#FFD2BD','#00C6CF','#FFD3E3', '#FBF4D7', '#BEA7BD', '#61AFFF', '#FFF5FB'];

  const [id, setId] = useState('');
  const [clicked, setClicked] = useState(false);

  const [random, setRandom] = useState(Math.floor(Math.random()*props.products.length));
  const [color, setColor] = useState(Math.floor(Math.random()*colors.length));

  useEffect(() => {
    setId(setInterval(() => {
      if(clicked){
        clearInterval(id);
      }
      else {
        setRandom(Math.floor(Math.random()*props.products.length));
        setColor(Math.floor(Math.random()*colors.length));
      }
    },2000)) 
  },[]);

  const onClick = () => {
    setClicked(true);
  }

  return (
    <div className="productSm" onClick={onClick} style={{backgroundColor: colors[color]}}>
      {
       props.products.length >= 1 && 
                <div className="product" >
                  <p className="productSmCompany">
                    <strong>{props.products[random].company}</strong>
                  </p>

                  <p className="productSmName">
                    {props.products[random].name}
                  </p>

                  <Link to={`/shoes/${props.products[random]._id}`} className="productImg"><img className="image" src={props.products[random].productImage} alt="productImage"/></Link>
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