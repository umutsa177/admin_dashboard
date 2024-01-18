import CategoryForm from "@/components/categoryForm";

const CategoryEdit = () => {

    return(
        <CategoryForm />
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

export default CategoryEdit;
