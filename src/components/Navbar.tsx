import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const CustomAppBar: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
          Admin Dashboard
        </Typography>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'end' }}>
          Log Out
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default CustomAppBar;
