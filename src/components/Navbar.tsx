import {Button} from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import baseApi from "@/axios/baseApi";
import {toast} from "react-toastify";
import {useRouter} from 'next/router';

const CustomAppBar: React.FC = () => {
    const {push} = useRouter();

    const handleLogout = async () => {
        try {
            const response = await baseApi.put('/auth/logout');
            if (response.status === 200) {
                toast.success('Çıkış Başarılı')
                push('/auth/signIn')
            }
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{flexGrow: 1, textAlign: 'center'}}>
                    Admin Dashboard
                </Typography>
                <Button variant='contained' color='secondary' onClick={() => handleLogout()}
                        sx={{flexGrow: 1, textAlign: 'end'}}>
                    Log Out
                </Button>
            </Toolbar>
        </AppBar>
    );
};


export default CustomAppBar;
