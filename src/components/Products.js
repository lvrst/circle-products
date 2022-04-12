import axios from 'axios';
import { useEffect, useState, React } from 'react';
import TableHeader from './TableHeader';
import TableBody from './TableBody';

const Products =() => {
    const [products, setProducts] = useState([]);
    const [sortBy, setSortBy] = useState('');
    const [order, setOrder] = useState('desc');

    /**
     * Getting response data from the API
     * Setting the state products
     */
    useEffect(() => {
        axios
            .get('https://fakestoreapi.com/products/',{
                params: {
                    limit: 7
                }
            })
            .then((response) => response.data)
            .then((data) => {
                setProducts(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [])

    /**
     * Sorting algorithm later used to dynamically sort products array
     * @param {*} property 
     * @returns Number
     */
    const dynamicSort = (property) => {
        let sortOrder = 1;
        if (property[0] === '-') {
            sortOrder = -1;
            property = property.substr(1);
        }
        return function (a, b) {
            let result = ((a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0);
            console.log(result * sortOrder);
            return result * sortOrder;
        }
    }

    /**
     * Sets sorting property from parameter string
     * If parameter is the current property already, reverts sort order
     * @param {string} property The next sorting property
     */
    const sortProducts = (property) => {
        if (sortBy === property) {
            setOrder(order === 'asc' ? 'desc' : 'asc');
            setProducts(products.reverse());
        } else {
            setSortBy(property);
            setOrder('desc');
            setProducts(products.sort(dynamicSort(property)));
        }
    }

    return (
            <table>
                <TableHeader sortBy={sortBy} order={order} onClick={sortProducts} />
                <TableBody products={products} />
            </table>
    )
}

export default Products;