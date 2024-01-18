import React, { useEffect, useState } from "react";
import baseApi from "@/axios/baseApi";
import ProductCard from "@/components/ProductCard";
import { Grid, Container } from "@mui/material";

const Home = () => {
    const [productData, setProductData] = useState([]);



    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await baseApi.get("/product");
                const products = response.data;

                setProductData(products);
            } catch (error) {
                console.error("Ürünleri getirirken bir hata oluştu:", error);
            }
        };

        fetchProduct();
    }, []);

    return (
        <Container>
            <h1>Product List</h1>
            <Grid container spacing={3}>
                {productData.map((item: any) => (
                    <Grid key={item.id} item xs={12} sm={6} md={4} lg={3}>
                        <ProductCard
                            id={item.id}
                            filePath={item.filePath}
                            name={item.name}
                            price={item.price}
                            category_name={item.category_name}
                            stock={item.stock}
                            description={item.description}
                        />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export const getServerSideProps = async (ctx: any) => {
    const { req, res } = ctx;
    const { token } = req?.cookies;

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

export default Home;
