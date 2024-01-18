import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from "@mui/material/IconButton";
import {GiConfirmed} from "react-icons/gi";
import {MdCancel, MdDelete} from "react-icons/md";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import baseApi from "@/axios/baseApi";
import {toast} from "react-toastify";
import AlertDialog from "@/components/AlertDialog";
import {Badge} from "@mui/material";


interface Order {
    id: string,
    no: number,
    customerName: string,
    customerEmail: string,
    quantity: number,
    status: boolean,
    productName: string,
    price: number,
    productId: string

}


export default function OrderList() {
    const [orderData, setOrderData] = useState<Order[]>([]);

    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [openCancelDialog, setOpenCancelDialog] = useState(false);

    const [role, setRole] = useState("0");

    useEffect(() => {
        const user = localStorage.getItem('user');
        const userObj = JSON.parse(user || '{}');
        setRole(userObj?.role);
    }, []);

    const router = useRouter();

    const cancelOrder = (order: Order) => {
        console.log(order)
        // Silme onayı için dialog aç
        setSelectedOrder(order);
        setOpenCancelDialog(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            const response = await baseApi.put(`/order/${selectedOrder?.id}`, {
                data: {
                    role: role, // iPTAL işlemi için kullanılacak rol
                    status: 0,
                    no: selectedOrder?.no,
                    customerEmail: selectedOrder?.customerEmail
                },
            });

            if (response.status === 200) {
                toast.success('Sipariş Başarıyla İptal Edildi');
                router.reload();
            }

        } catch (error: any) {

            toast.error(error.response?.data?.message || 'İptal işlemi sırasında bir hata oluştu');
        }

        setOpenCancelDialog(false);
    };

    const handleDeleteCancel = () => {
        setOpenCancelDialog(false);
    };

    const confirmOrder = async (row: any) => {

        try {
            const response = await baseApi.put(`/order/${row?.id}`, {
                data: {
                    role: role,
                    status: 2,
                    no: row?.no,
                    customerEmail: row?.customerEmail,
                    productId: row?.productId
                },
            })

            if (response.status === 200) {
                toast.success('Sipariş Başarıyla Onaylandı');
                router.reload();
            }

        } catch (error: any) {

            toast.error(error.response?.data?.message || 'Onaylama işlemi sırasında bir hata oluştu');
        }

        setOpenCancelDialog(false);
    };

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await baseApi.get('/order');
                const orderData = response.data;


                setOrderData(orderData);
            } catch (e) {
                console.log(e);
            }
        };

        fetchOrder();
    }, []);
    return (
        <TableContainer component={Paper}>

            <Table sx={{minWidth: 650}} aria-label="Order table">
                <TableHead>
                    <TableRow>
                        <TableCell>No</TableCell>
                        <TableCell align="right">Customer Name</TableCell>
                        <TableCell align="right">Customer Email</TableCell>
                        <TableCell align="right">Product Name</TableCell>
                        <TableCell align="right">Product Price</TableCell>
                        <TableCell align="right">Quantity</TableCell>
                        <TableCell align="right">Status</TableCell>
                        <TableCell align="right">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orderData.map((row: any) => (
                        <TableRow
                            key={row.id}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell component="th" scope="row">
                                {row.no}
                            </TableCell>
                            <TableCell align="right">{row.customerName}</TableCell>
                            <TableCell align="right">{row.customerEmail}</TableCell>
                            <TableCell align="right">{row.productName}</TableCell>
                            <TableCell align="right">{row.price} $</TableCell>
                            <TableCell align="right">{row.quantity}</TableCell>
                            <TableCell align="right">
                                {row.status === 1 ? (
                                    <Badge badgeContent="Pending" color="warning"/>
                                ) : row.status === 2 ? (
                                    <Badge badgeContent="Confirmed" color="success"/>
                                ) : (
                                    <Badge badgeContent="Cancelled" color="error"/>
                                )}

                            </TableCell>
                            <TableCell align="right">
                                <IconButton aria-label="edit" disabled={row.status === 2}
                                            onClick={() => confirmOrder(row)}>
                                    <GiConfirmed style={{color: 'green'}}/>
                                </IconButton>
                                <IconButton aria-label="delete" onClick={() => cancelOrder(row)}>
                                    <MdCancel style={{color: 'red'}}/>
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <AlertDialog
                open={openCancelDialog}
                title="Cancel Order"
                content={`Are you sure you want to cancel the order: ${selectedOrder?.productName}?`}
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
                destination: "auth/signIn",
                permanent: false,
            },
        };
    }

    return {
        props: {},
    };
};
