import {useRouter} from "next/router";
import CategoryForm from "@/components/categoryForm";

const CategoryEdit = () => {
    const {id} = useRouter().query

    return(
        <CategoryForm id={id as string} />
    )
}

export const getServerSideProps = async (ctx: any) => {
    const {req, res} = ctx;
    const {token} = req?.cookies;

    if(!token){
        return {
            redirect: {
                destination: '/auth/signIn',
            }
        }
    }

    return {
        props: {

        }
    }
}

export default CategoryEdit;
