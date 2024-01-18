import {useRouter} from "next/router";
import CategoryForm from "@/components/categoryForm";
import ProductForm from "@/components/ProductForm";

const ProductEdit = () => {
    const {id} = useRouter().query

    return(
        <ProductForm id={id as string} />
    )
}

export const getServerSideProps = async (ctx: any) => {
    const {req, res} = ctx;
    const {token} = req?.cookies;

    if(!token){
        return {
            redirect: {
                destination: 'auth/signIn',
                permanent: false,
            }
        }
    }

    return {
        props: {

        }
    }
}

export default ProductEdit;
