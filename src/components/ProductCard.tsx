import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {CardHeader} from "@mui/material";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import baseApi from '@/axios/baseApi';

export default function ProductCard(props: {
    id: string;
    name: string;
    price: number;
    category_name: string;
    stock: number;
    description: string;
    filePath: string;
}) {

    const [userId, setUserId] = useState("");

    useEffect(() => {
        const user = localStorage.getItem('user');
        const userObj = JSON.parse(user || '{}');
        setUserId(userObj?.id);
    }, []);


    const handleOrder = async (id: string) => {
        try {
            const body = {
                productId: id,
                userId: userId,
            }
            const response = await baseApi.post("/order", body);
            if(response.status === 200) {
                toast.success(response?.data?.message || "Order is successful")
            }
        }catch (e: any) {
            console.log(e);
            toast.error(e?.response?.data?.message)
        }
    }

    return (
        <Card>
            <CardMedia
                sx={{ height: 140 }}
                image={`/uploads/products/${props.filePath}`}
                title="green iguana"
            />
            <CardContent>
                <CardHeader>
                    {props.category_name}
                </CardHeader>
                <Typography gutterBottom variant="h5" component="div">
                    {props.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {props.description}
                </Typography>
                <Typography variant="body2">
                    {props.price} $ - {props.stock} stock
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={() => handleOrder(props?.id)}>Order</Button>
            </CardActions>
        </Card>
    );
}
