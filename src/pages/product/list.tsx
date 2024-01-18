import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useEffect, useState} from "react";
import baseApi from '@/axios/baseApi';
import {toast} from "react-toastify";
import {useRouter} from "next/router";
import Image from "next/image";
import IconButton from "@mui/material/IconButton";
import {MdDelete, MdEdit} from "react-icons/md";
import AlertDialog from "@/components/AlertDialog";


interface Product {
    id: string;
    name: string;
    price: number;
    category_name: string;
    stock: number;
    description: string;
    filePath: string;
}


export default function ProductList() {
    const [productData, setProductData] = React.useState<Product[]>([]);

    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

    const [role, setRole] = useState("0");

    useEffect(() => {
        const user = localStorage.getItem('user');
        const userObj = JSON.parse(user || '{}');
        setRole(userObj?.role);
    }, []);
    const router = useRouter();
    const handleEdit = (productId: string) => {
        // Düzenleme sayfasına yönlendirme
        router.push(`/product/edit/${productId}`);
    };

    const handleDelete = (product: Product) => {
        console.log(product)
        // Silme onayı için dialog aç
        setSelectedProduct(product);
        setOpenDeleteDialog(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            const response = await baseApi.delete(`/product/${selectedProduct?.id}`, {
                data: {
                    role: role, // Silme işlemi için kullanılacak rol
                },
            });

            if (response.status === 200) {
                toast.success('Ürün Başarıyla Silindi');
            }
            console.log(response.status);
        } catch (error: any) {
            console.log(error);
            toast.error(error.response?.data?.message || 'Silme işlemi sırasında bir hata oluştu');
        }

        setOpenDeleteDialog(false);
        // Silinen kategoriyi yerel state'ten de kaldır
        setProductData((prevData: any) => prevData.filter((item: any) => item.id !== selectedProduct?.id));
    };

    const handleDeleteCancel = () => {
        setOpenDeleteDialog(false);
    };

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await baseApi.get('/product');
                const productData = response.data;

                setProductData(productData);
            } catch (e) {
                console.log(e);
            }
        };

        fetchProduct();
    }, []);

    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="Product Table">
                <TableHead>
                    <TableRow>
                        <TableCell>File</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="right">Category</TableCell>
                        <TableCell align="right">Stock</TableCell>
                        <TableCell align="right">Description</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {productData.map((row) => (
                        <TableRow
                            key={row.id}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell component="th" scope="row">
                              <Image src={`/uploads/products/${row.filePath}`} alt="Product Image" width={100} height={100} />
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">{row.price}</TableCell>
                            <TableCell align="right">{row.category_name}</TableCell>
                            <TableCell align="right">{row.stock}</TableCell>
                            <TableCell align="right">{row.description}</TableCell>
                            <TableCell align="right">
                                <IconButton aria-label="edit" onClick={() => handleEdit(row.id)}>
                                    <MdEdit />
                                </IconButton>
                                <IconButton aria-label="delete" onClick={() => handleDelete(row)}>
                                    <MdDelete />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <AlertDialog
                open={openDeleteDialog}
                title="Delete Product"
                content={`Are you sure you want to delete the product: ${selectedProduct?.name}?`}
                onConfirm={handleDeleteConfirm}
                onCancel={handleDeleteCancel}
            />
        </TableContainer>
    );
}

export const getServerSideProps = async (ctx: any) => {
    const {req, res} = ctx;
    const {token} = req?.cookies;

    if (!token) {
        return {
            redirect: {
                destination: 'auth/signIn',
                permanent: false,
            }
        }
    }

    return {
        props: {}
    }
}
