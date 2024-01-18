import { useForm, Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import baseApi from "@/axios/baseApi";
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface FormData {
    name: string;
}

const CategoryForm = (props: {id?: string}) => {
    const { id } = props;
    const { handleSubmit, control, setValue } = useForm<FormData>();
    const [role, setRole] = useState("0");

    useEffect(() => {
        const user = localStorage.getItem('user');
        const userObj = JSON.parse(user || '{}');
        setRole(userObj?.role);
    }, []);

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await baseApi.get(`/category/${id}`);
                const categoryData = response.data;

                // Kategori bilgilerini form alanlarına set et
                setValue('name', categoryData.name);
            } catch (e) {
                console.log(e);
            }
        };

        // Eğer id varsa, kategori bilgilerini getir
        if (id) {
            fetchCategory();
        }
    }, [id, setValue]);

    const onSubmit = async (data: FormData) => {
        const body = {
            ...data,
            role
        };

        try {
            if (id) {
                const response = await baseApi.put(`/category/${id}`, body);
                if (response.status === 200) {
                    toast.success('Kategori Başarıyla Güncellendi');
                }
                return;
            } else {
                const response = await baseApi.post('/category', body);
                if (response.status === 201) {
                    toast.success('Kategori Başarıyla Eklendi');
                }
                return;
            }
        } catch (e: any) {
            console.log(e.response.data.message);
            toast.error(e.response.data.message);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="p-4 bg-white">
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Controller
                        name="name"
                        control={control}
                        defaultValue=""
                        render={({field}) => <TextField {...field} label="Category Name " fullWidth/>}
                    />
                </Grid>
            </Grid>
            <Button type="submit" variant="outlined" color="primary" className="mt-4">
                Save
            </Button>
        </form>
    );
};

export const getServerSideProps = async (ctx: any) => {
    const { req, res } = ctx;
    const { token } = req?.cookies;

    if (!token) {
        return {
            redirect: {
                destination: 'auth/signIn',
            }
        }
    }

    return {
        props: {}
    }
};

export default CategoryForm;
