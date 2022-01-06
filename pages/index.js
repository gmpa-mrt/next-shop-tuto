import Page from "../components/Page";
import ProductCard from "../components/ProductCard";
import {getProducts} from '../lib/products'

// Use getServerSideProps() to have refreash data each reload page

export async function getStaticProps() {
    const products = await getProducts()
    return {
        props: { products },
        revalidate: parseInt(process.env.REVALIDATE_SECONDS), // seconds => ISR more appropriate approche in prod mode it's 5 * 60 => 5 minutes
    }
}

function HomePage({ products }) {

    // Use Api Backend Front methode => ! this methode not rendered a good html but better way than classic React methode

    /*
           const [products, setProducts] = useState([]);

            useEffect(() => {
                async () => {
                    const response = await fetch(`/api/products`)
                    const products = await response.json()
                    setProducts(products)
                }();
            }, []);

     */

    return (
        <Page title="Indoor Plant">
            <ul className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                {products.map((product) =>
                    <li key={product.id}>
                        <ProductCard product={product}/>
                    </li>
                )}
            </ul>
        </Page>
    )
}

export default HomePage

