import axios from 'axios';
import { React , useEffect, useState} from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import classify from '../utils/classify';
import tax from '../utils/tax';
import BackButton from '../assets/img/BackButton.svg';

/**
 * 
 * const {id} The parameter in URL, meant to represent the id of the product from the API.
 * const [alert, setAlert] The boolean status of the alert of user output, and its setter.
 * const [product, setProduct] The Object product to display and update, and its setter.
 * const [price, setPrice] The Number price for input update value, and its setter.
 * const location The current URL as an Object.
 * const navigate Hook to perform navigation actions
 * return <ProductInformations /> component || redirect to root page
 */
const ProductInformations = () => {
    const {id} = useParams();
    const [alert, setAlert] = useState(false);
    const [product, setProduct] = useState({});
    const [price, setPrice] = useState(0);
    const location = useLocation();
    const navigate = useNavigate();

    const title = product.title;
    
    /** Setting the state product */
    useEffect(() => {
        if (location.state != null && location.state.product != null) {
            // Product was inherited from state given in previous page:
            setProduct(location.state.product);
            setPrice(location.state.product['price']);
        } else if (id.match(/^\d+$/)) {
            // Id is digits-only:
            axios
            .get(`https://fakestoreapi.com/products/${id}`)
            .then((response) => response.data)
            .then((data) => {
                setProduct(data);
                setPrice(data['price']);
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            // Not enough intel to satisfy:
            return navigate('/');
        }
    }, [])

    /**
     * Setting timeout for alert to output user action
     */
    useEffect(() => {
        if(alert) {
            // Boolean alert was set to true:
            setTimeout(() => {
                setAlert(false);
            }, 3000)
        }
    }, [alert])

    const Description = (props) => {
        return (
            <section className='details__content__info__description'>
                <h2>Description</h2>
                <p>{props.value}</p>
            </section>
        );
    }

    const Category = (props) => {
        return (
            <section className='details__content__info__category'>
                <h2>Category</h2>
                <div>
                    <span className={'badge ' + classify(props.value)}>{props.value}</span>
                </div>
            </section>
        )
    }

    const Price = (props) => {
        return (
            <div className='details__content__info__price'>
                <h2>Price</h2>
                <fieldset className='details__content__info__price__field'>
                    <legend className='details__content__info__price__field__legend'>€</legend>
                    <input  type='number'
                            name='price'
                            value={props.value}
                            className='details__content__info__price__field__input'
                            onChange={(e) => setPrice(e.target.value) } />
                    <label  htmlFor='price'
                            className='details__content__info__price__field__label'>
                                Price <span className='precision'>(including VAT): {tax(props.value)}€</span>
                    </label>
                </fieldset>
                <button className='details__content__info__price__button'
                        onClick={product['price'] != price ? () => updateProduct() : undefined} disabled={product['price'] == price}>Update product</button>
            </div>
        )
    }

    const Picture = (props) => {
        return (
            <figure className='details__content__pic'>
                <img    className='details__content__pic__img'
                        src={props.value}></img>
            </figure>
        )
    }

    const updateProduct = () => {
        axios.put(
                `https://fakestoreapi.com/products/${id}`, 
                {...product,
                    price: Number(price)
                }
        )
                .then(() => {
                    setProduct({...product,
                        price: Number(price)
                    });
                    setAlert(true);
                })
    }
    /**
     * Check that product is defined to render, otherwise redirect
     */
    if (product) {
        return (
            <main>
                <h1>{title}</h1>
                <Link to='/' className='back-button'>
                    <img src={BackButton} alt='Back to products management page' />
                </Link>
                {alert && <p>Price was updated just now.</p>}
                <article className='details'>
                    <div className="details__content">
                        {Picture({value: product.image})}
                        <div className="details__content__info">
                            {Description({value: product.description})}
                            {Category({value: product.category})}
                            {Price({value: price})}
                        </div>
                    </div>
                </article>
            </main>
        )
    } else {
        return navigate('/');
    }
}

export default ProductInformations;