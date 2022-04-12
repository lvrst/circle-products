const TableHeader =({sortBy, order, onClick}) => {
    /**
     * Array of headers
     * value 'accessor' The key name on the API
     * value 'name' The heading to display in the table
     * value 'detail' Added detail to display if any
     */
    const headers = [
        {
            accessor: 'title',
            name: 'Product name'
        },
        {
            accessor: 'category',
            name: 'Category'
        },
        {
            accessor: 'price',
            name: 'Price'
        },
        {
            accessor: 'price',
            name: 'Price',
            detail: 'including VAT' 
        }
    ];
    
    /**
     * return JSX table row
     */
    const columnHeader = () => {
        return (
            <tr>
                {headers.map(({accessor, name, detail}) => (
                <th className={accessor + (sortBy === accessor ? (' criterion' + (order === 'asc' ? ' down' : ' up')) : '')}
                    onClick={() => {{onClick(accessor)}}}
                    key={accessor + detail}>
                        {name}
                        {detail 
                        ? <span className='precision'> ({detail})</span> 
                        : null}
                </th>
                ))}
            </tr>
        )
    }
    
    return (
            <thead>
                {columnHeader()}
            </thead>
    )
}

export default TableHeader;