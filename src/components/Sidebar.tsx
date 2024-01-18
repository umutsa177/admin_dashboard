import {Typography} from '@mui/material';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import {useRouter} from 'next/router';
import React, {useEffect, useState} from "react";
import {
    AiOutlineAppstoreAdd,
    AiOutlineDashboard,
    AiOutlineShopping,
    AiOutlineShoppingCart,
    AiOutlineUser
} from "react-icons/ai";
import {RiProductHuntFill} from "react-icons/ri";
import {BiSolidCategory} from "react-icons/bi";
import {BsBorderStyle} from "react-icons/bs";

const CustomSidebar: React.FC = () => {
    const {push, pathname} = useRouter();
    const [role, setRole] = useState<Number>();
    useEffect(() => {
        const user = localStorage.getItem('user');
        const userObj = JSON.parse(user || '{}');
        setRole(userObj?.role)

    }, []);


    const getMenuItems = () => {
        const getListItemStyle = (menuItemPath: string) => ({
            backgroundColor: pathname === menuItemPath ? '#1876D1' : 'transparent',
            color: pathname === menuItemPath ? '#fff' : '#000',
        });
        if (role === 0) {
            return (
                <>
                    <ListItem button sx={getListItemStyle('/')}>
                        <AiOutlineDashboard/>
                        <ListItemText primary="Dashboard" sx={{paddingLeft: '0.5rem'}} onClick={() => push('/')}/>
                    </ListItem>
                    <ListItem button sx={getListItemStyle('/customers')}>
                        <AiOutlineUser/>
                        <ListItemText primary="Customer" sx={{paddingLeft: '0.5rem'}} onClick={() => push('/customers')}/>
                    </ListItem>
                    <ListItem button sx={getListItemStyle('/category/list')}>
                        <BiSolidCategory/>
                        <ListItemText primary="Category" sx={{paddingLeft: '0.5rem'}}
                                      onClick={() => push('/category/list')}/>
                    </ListItem>
                    <ListItem button sx={getListItemStyle('/category/add')}>
                        <AiOutlineAppstoreAdd/>
                        <ListItemText primary="Category Add" sx={{paddingLeft: '0.5rem'}}
                                      onClick={() => push('/category/add')}/>
                    </ListItem>
                    <ListItem button sx={getListItemStyle('/product/list')}>
                        <RiProductHuntFill/>
                        <ListItemText primary="Product" sx={{paddingLeft: '0.5rem'}}
                                      onClick={() => push('/product/list')}/>
                    </ListItem>
                    <ListItem button sx={getListItemStyle('/product/add')}>
                        <AiOutlineShopping/>
                        <ListItemText primary="Product Add" sx={{paddingLeft: '0.5rem'}}
                                      onClick={() => push('/product/add')}/>
                    </ListItem>
                    <ListItem button sx={getListItemStyle('/order/list')}>
                        <BsBorderStyle/>
                        <ListItemText primary="Order" sx={{paddingLeft: '0.5rem'}} onClick={() => push('/order/list')}/>
                    </ListItem>
                    <ListItem button sx={getListItemStyle('/my-orders')}>
                        <AiOutlineShoppingCart/>
                        <ListItemText primary="My Orders" sx={{paddingLeft: '0.5rem'}}
                                      onClick={() => push('/my-orders')}/>
                    </ListItem>
                </>
            );
        } else if (role === 1) {
            return (
                <>
                    <ListItem button sx={getListItemStyle('/')}>
                        <AiOutlineDashboard/>
                        <ListItemText primary="Dashboard" sx={{paddingLeft: '0.5rem'}} onClick={() => push('/')}/>
                    </ListItem>
                    <ListItem button sx={getListItemStyle('/my-orders')}>
                        <AiOutlineShoppingCart/>
                        <ListItemText primary="My Orders" sx={{paddingLeft: '0.5rem'}}
                                      onClick={() => push('/my-orders')}/>
                    </ListItem>
                </>
            );
        }
        return null;
    };

    return (
        <Drawer variant="permanent" anchor="left"
                sx={{
                    width: 300,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: 300,
                        boxSizing: 'border-box',
                    },
                }}>
            <List>
                <ListItem>
                    <Typography variant="h6" fontWeight="bold">
                        Menu
                    </Typography>
                </ListItem>
                {getMenuItems()}
            </List>
        </Drawer>
    );
};

export default CustomSidebar;
