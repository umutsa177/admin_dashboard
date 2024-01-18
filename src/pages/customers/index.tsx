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


interface Customer {
    id: string,
    customerName: string,
    customerEmail: string,
}


export default function CustomersList() {
    const [customerData, setCustomerData] = useState<Customer[]>([]);




    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await baseApi.get('/customer');
                const customerData = response.data;


                setCustomerData(customerData);
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
                        <TableCell align="left">Customer Name</TableCell>
                        <TableCell align="left">Customer Email</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {customerData.map((row: any) => (
                        <TableRow
                            key={row.id}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell align="left">{row.customerName}</TableCell>
                            <TableCell align="left">{row.customerEmail}</TableCell>
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
