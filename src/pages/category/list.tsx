import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useEffect, useState} from "react";
import baseApi from "@/axios/baseApi";
import IconButton from '@mui/material/IconButton';
import { MdDelete, MdEdit } from "react-icons/md";

import {useRouter} from "next/router";
import AlertDialog from '@/components/AlertDialog';
import { toast } from 'react-toastify';


interface Category {
    id: string;
    name: string;
}

export default function CategoryList() {
    const [categoryData, setCategoryData] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

    const [role, setRole] = useState("0");

    useEffect(() => {
        const user = localStorage.getItem('user');
        const userObj = JSON.parse(user || '{}');
        setRole(userObj?.role);
    }, []);
    const router = useRouter();

    const handleEdit = (categoryId: string) => {
        // Düzenleme sayfasına yönlendirme
        router.push(`/category/edit/${categoryId}`);
    };

    const handleDelete = (category: Category) => {
        // Silme onayı için dialog aç
        setSelectedCategory(category);
        setOpenDeleteDialog(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            const response = await baseApi.delete(`/category/${selectedCategory?.id}`, {
                data: {
                    role: role, // Silme işlemi için kullanılacak rol
                },
            });

            if (response.status === 200) {
                toast.success('Kategori Başarıyla Silindi');
            }
            console.log(response.status);
        } catch (error: any) {
            console.log(error);
            toast.error(error.response?.data?.message || 'Silme işlemi sırasında bir hata oluştu');
        }

        setOpenDeleteDialog(false);
        // Silinen kategoriyi yerel state'ten de kaldır
        setCategoryData((prevData) => prevData.filter((item) => item.id !== selectedCategory?.id));
    };

    const handleDeleteCancel = () => {
        setOpenDeleteDialog(false);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await baseApi.get('/category');
                setCategoryData(res.data);
            } catch (error) {
                console.error('Kategori verilerini getirirken bir hata oluştu:', error);
            }
        };

        fetchData();
    }, []);


    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left">Categories</TableCell>
                        <TableCell align="right">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {categoryData.map((row) => (
                        <TableRow
                            key={row.id}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
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
                title="Delete Category"
                content={`Are you sure you want to delete the category: ${selectedCategory?.name}?`}
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
                destination: '/auth/signIn',
            }
        }
    }

    return {
        props: {}
    }
}
