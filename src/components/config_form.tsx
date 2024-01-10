// components/ConfigurationForm.tsx
import { useForm, Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

interface FormData {
  siteTitle: string;
  logoUrl: string;
  additionalField1: string;
  additionalField2: string;
  additionalField3: string;
}

const ConfigurationForm: React.FC = () => {
  const { handleSubmit, control } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 bg-white">
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Controller
            name="siteTitle"
            control={control}
            defaultValue=""
            render={({ field }) => <TextField {...field} label="Site Title" fullWidth />}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            name="logoUrl"
            control={control}
            defaultValue=""
            render={({ field }) => <TextField {...field} label="Logo URL" fullWidth />}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            name="additionalField1"
            control={control}
            defaultValue=""
            render={({ field }) => <TextField {...field} label="Additional Field 1" fullWidth />}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            name="additionalField2"
            control={control}
            defaultValue=""
            render={({ field }) => <TextField {...field} label="Additional Field 2" fullWidth />}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            name="additionalField3"
            control={control}
            defaultValue=""
            render={({ field }) => <TextField {...field} label="Additional Field 3" fullWidth />}
          />
        </Grid>
      </Grid>

      <Button type="submit" variant="contained" color="primary" className="mt-4">
        Save
      </Button>
    </form>
  );
};

export default ConfigurationForm;
