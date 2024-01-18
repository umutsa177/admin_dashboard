import ConfigurationForm from "@/components/config_form";
import Layout from "@/Layout";

const Settings = () => {
    return (

            <ConfigurationForm/>

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
export default Settings;
