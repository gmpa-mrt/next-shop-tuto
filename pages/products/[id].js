import Image from "next/image";
import Page from "../../components/Page";
import {getProducts, getProduct} from '../../lib/products'
import {ApiError} from '../../lib/api'

export async function getStaticPaths() {
    const products = await getProducts()
    return {
        paths: products.map((product) => ({
            params: { id: product.id.toString() }
        })),
        fallback: 'blocking'
    }
}


export async function getStaticProps({ params: { id } }) {
    try {
        const product = await getProduct(id)
        return {
            props: { product },
            revalidate: parseInt(process.env.REVALIDATE_SECONDS)
        }
    } catch (err) {
        if (err instanceof ApiError && err.status === 404) {
            return { notFound: true }
        }
        throw err
    }
}

function Product({ product }) {
    console.log(product)
    return (
        <Page title={product.title}>
            <h1 className="py-5 px-4 text-xl">Page of {product.title}</h1>
            <article>
                <Image src={product.pictureUrl} alt=""
                       width={500} height={450}/>
                <p>{product.description}</p>
                <p>{product.price}</p>
            </article>
        </Page>
    )
}

export default Product
