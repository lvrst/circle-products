import Products from '../components/Products';

const Home =() => {
    const title = 'Products management';
    return (
        <main>
            <h1>{title}</h1>
            <Products />
        </main>
    )

}

export default Home;