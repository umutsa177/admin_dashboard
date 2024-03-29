import {Button} from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import baseApi from "@/axios/baseApi";
import {toast} from "react-toastify";
import {useRouter} from 'next/router';
import { useAuth } from '@/provider/authProvider';
import {useEffect, useState} from "react";

const CustomAppBar: React.FC = () => {
    const {push} = useRouter();
    const {signOut} = useAuth();
    const [role, setRole] = useState<Number>();


    const handleLogout = async () => {
        try {
            const response = await baseApi.put('/auth/logout');
            if (response.status === 200) {
                toast.success('Çıkış Başarılı')
                signOut()
            }
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        const user = localStorage.getItem('user');
        const userObj = JSON.parse(user || '{}');
        setRole(userObj?.role)

    }, []);


    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{flexGrow: 1, textAlign: 'center'}}>
                    {role === 0 ? "Admin Panel" : "Customer Panel"}
                </Typography>
                <Button variant='contained' color='secondary' onClick={() => handleLogout()}
                        sx={{ textAlign: 'end'}}>
                    Log Out
                </Button>
            </Toolbar>
        </AppBar>
    );
};


export default CustomAppBar;
