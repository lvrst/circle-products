import { Link } from 'react-router-dom';
import tax from '../utils/tax';
import classify from '../utils/classify';

const TableBody =({products}) => {
    return (
        <tbody>
                    {products.map(
                    ({
                        id,
                        title,
                        category,
                        price,
                    }, index) => (
                        <tr key={id + title} data-index={index}>
                            <td>
                                <Link to={`/${id}`} state={{ product: products.find(product => product.id === id) }}>
                                    <span>{title}</span>
                                </Link>
                            </td>
                            <td className={category}><span className={'badge ' + classify(category)}>{category}</span></td>
                            <td className='price-tag'>{price}</td>
                            <td className='price-tag' data-detail='(including VAT)'>{tax(price)}</td>
                        </tr>
                    )
                )}
                </tbody>
    )
}

export default TableBody;