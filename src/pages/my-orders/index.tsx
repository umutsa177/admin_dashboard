import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import baseApi from "@/axios/baseApi";

import {Badge} from "@mui/material";


interface Order {
    id: string,
    no: number,
    quantity: number,
    status: boolean,
    productName: string,
    price: number,
    productId: string

}


export default function OrderList() {
    const [orderData, setOrderData] = useState<Order[]>([]);
    const [userId, setUserId] = useState("0");

    useEffect(() => {
        const user = localStorage.getItem('user');
        const userObj = JSON.parse(user || '{}');
        setUserId(userObj?.id);

    }, []);




    useEffect(() => {
        const fetchOrder = async () => {
            if (!userId) return;

            try {
                console.log(userId)
                const response = await baseApi.get('/order', {
                    params: {
                        userId: userId
                    }
                });

                const orderData = response.data;
                setOrderData(orderData);
            } catch (e) {
                console.log(e);
            }
        };

        fetchOrder();
    }, [userId]);

    return (
        <TableContainer component={Paper}>

            <Table sx={{minWidth: 650}} aria-label="Order table">
                <TableHead>
                    <TableRow>
                        <TableCell>No</TableCell>
                        <TableCell align="right">Product Name</TableCell>
                        <TableCell align="right">Product Price</TableCell>
                        <TableCell align="right">Quantity</TableCell>
                        <TableCell align="right">Status</TableCell>

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

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
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
            },
        };
    }

    return {
        props: {},
    };
};
