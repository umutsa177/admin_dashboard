import { useForm, Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { MenuItem, Select, InputLabel } from '@mui/material';
import baseApi from '@/axios/baseApi';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import Image from "next/image";

interface FormData {
    name: string;
    stock: number;
    categoryId: string;
    description: string;
    price: number;
    image: string; // Ekledik: Resim base64 formatında alınacak
}

const ProductForm = (props: { id?: string }) => {
    const { id } = props;
    const { handleSubmit, control, setValue } = useForm<FormData>();
    const [categoryData, setCategoryData] = useState([]);
    const [file, setFile] = useState(null);

    const [role, setRole] = useState('0');

    useEffect(() => {
        const user = localStorage.getItem('user');
        const userObj = JSON.parse(user || '{}');
        setRole(userObj?.role);
    }, []);

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await baseApi.get('/category');
                setCategoryData(response.data);
            } catch (e) {
                console.log(e);
            }
        };
        fetchCategory();
    }, []);

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await baseApi.get(`/product/${id}`);
                const productData = response.data;

                // Kategori bilgilerini form alanlarına set et
                setValue('name', productData.name);
                setValue('price', productData.price);
                setValue('stock', productData.stock);
                setValue('description', productData.description);
                setValue('categoryId', productData.categoryId);
                setFile(productData.filePath);
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
            role,
        };

        try {
            if (id) {
                const formData = {
                    ...body,
                    updatedProductName: body.description,
                    updatedPrice: body.price,
                    updatedStock: body.stock,
                    updatedDescription: body.description,
                };
                const response = await baseApi.put(`/product/${id}`, formData);
                if (response.status === 200) {
                    toast.success('Ürün Başarıyla Güncellendi');
                }
                return;
            } else {
                const response = await baseApi.post('/product', body);
                if (response.status === 201) {
                    toast.success('Ürün Başarıyla Eklendi');
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
                <Grid item xs={8}>
                    <InputLabel htmlFor="categoryId">Category</InputLabel>
                    <Controller
                        name="categoryId"
                        control={control}
                        defaultValue={''}
                        render={({ field }) => (
                            <Select {...field} fullWidth>
                                {categoryData.map((item: any) => (
                                    <MenuItem key={item.id} value={item.id}>
                                        {item.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        )}
                    ></Controller>
                </Grid>
                <Grid item xs={6}>
                    <Controller
                        name="name"
                        control={control}
                        defaultValue={''}
                        render={({ field }) => <TextField {...field} label="Product Name " fullWidth />}
                    />
                </Grid>

                <Grid item xs={6}>
                    <Controller
                        name="price"
                        control={control}
                        defaultValue={0}
                        render={({ field }) => <TextField {...field} label="Price " fullWidth />}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Controller
                        name="stock"
                        control={control}
                        defaultValue={0}
                        render={({ field }) => <TextField {...field} label="Stock " fullWidth />}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Controller
                        name="description"
                        control={control}
                        defaultValue=""
                        render={({ field }) => <TextField {...field} label="Description" fullWidth />}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Controller
                        name="image"
                        control={control}
                        defaultValue=""
                        render={({ field }) => <TextField {...field} type="file" fullWidth />}
                    />
                </Grid>
                {
                    file && (
                        <Grid item xs={12}>
                            <Image src={`/uploads/products/${file}`} width={200} height={200} alt=''/>
                        </Grid>
                    )
                }

            </Grid>
            <Button type="submit" variant="outlined" color="primary" className="mt-4">
                Save
            </Button>
        </form>
    );
};

export default ProductForm;
