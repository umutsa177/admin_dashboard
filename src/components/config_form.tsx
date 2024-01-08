import { useForm, Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

interface FormData {
  name: string;
  surname: string;
  email: string;
  password: string;
  description: string;
}

const ConfigurationForm: React.FC = () => {
  const { handleSubmit, control } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 bg-white">
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Controller
            name="name"
            control={control}
            defaultValue=""
            render={({ field }) => <TextField {...field} label="Name" fullWidth />}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            name="surname"
            control={control}
            defaultValue=""
            render={({ field }) => <TextField {...field} label="Surname" fullWidth />}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => <TextField {...field} label="Email" fullWidth />}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => <TextField {...field} label="Password" fullWidth />}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            name="description"
            control={control}
            defaultValue=""
            render={({ field }) => <TextField {...field} label="Description" fullWidth />}
          />
        </Grid>
      </Grid>

      <Button type="submit" variant="contained" color="success" className="mt-4">
        Save
      </Button>
    </form>
  );
};

export default ConfigurationForm;
