import ProductForm from "@/components/ProductForm";

const ProductAdd = () => {

  return(
      <ProductForm />
  )
}

export const getServerSideProps = async (ctx: any) => {
  const {req, res} = ctx;
  const {token} = req?.cookies;

  if(!token){
    return {
      redirect: {
        destination: 'auth/signIn',

      }
    }
  }

  return {
    props: {

    }
  }
}

export default ProductAdd;
