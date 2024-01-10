import { Typography } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useRouter } from 'next/router';

const CustomSidebar: React.FC = () => {
    const {push} = useRouter();
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
        <ListItem button>
          <ListItemText primary="Dashboard" onClick={() => push('/')}/>
        </ListItem>
        <ListItem button>
          <ListItemText primary="Account"  onClick={() => push('/account')}/>
        </ListItem>
        <ListItem button>
          <ListItemText primary="Settings"  onClick={() => push('/settings')}/>
        </ListItem>
        <ListItem>
          <ListItemText primary="Category"  onClick={() => push('/category/list')}/>
        </ListItem>
        <ListItem>
          <ListItemText primary="Category Add"  onClick={() => push('/category/add')}/>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default CustomSidebar;
