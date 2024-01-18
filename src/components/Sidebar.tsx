import { Typography } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useRouter } from 'next/router';
import {useEffect, useState} from "react";

const CustomSidebar: React.FC = () => {
  const { push } = useRouter();
  const [role, setRole] = useState("0");
    useEffect(() => {
        const user = localStorage.getItem('user');
        const userObj = JSON.parse(user || '{}');
        setRole(userObj?.role)

    }, []);

  const getMenuItems = () => {
    if (role === "0") {
      return (
          <>
            <ListItem button>
              <ListItemText primary="Dashboard" onClick={() => push('/')} />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Account" onClick={() => push('/account')} />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Settings" onClick={() => push('/settings')} />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Category" onClick={() => push('/category/list')} />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Category Add" onClick={() => push('/category/add')} />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Product" onClick={() => push('/product/list')} />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Product Add" onClick={() => push('/product/add')} />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Order" onClick={() => push('/order/list')} />
            </ListItem>
              <ListItem button>
                  <ListItemText primary="My Orders" onClick={() => push('/my-orders')} />
              </ListItem>
          </>
      );
    } else if (role === "1"){
      return (
          <>
            <ListItem button>
              <ListItemText primary="Dashboard" onClick={() => push('/')} />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Account" onClick={() => push('/account')} />
            </ListItem>
            <ListItem button>
              <ListItemText primary="My Orders" onClick={() => push('/my-orders')} />
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
