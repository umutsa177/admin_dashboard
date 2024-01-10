// components/ConfigurationForm.tsx
import { useForm, Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { ColorPicker } from 'react-color-palette';
import { useState } from 'react';

interface FormData {
  siteTitle: string;
  siteDescription: string;
  sideBarColor: string;
}

const ConfigurationForm: React.FC = () => {
  const { handleSubmit, control } = useForm<FormData>();
  // const [color, setColor] = useState<IColor>();
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
            name="siteDescription"
            control={control}
            defaultValue=""
            render={({ field }) => <TextField {...field} label="Site Description " fullWidth />}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            name="sideBarColor"
            control={control}
            defaultValue=""
            render={({ field }) => 
            //  <ColorPicker width={456} height={228} color={color}
              // onChange={setColor} hideHSV dark /> 
              <TextField {...field} label="SideBar Color" fullWidth />
          }
          />
        </Grid>
      </Grid>

      <Button type="submit" variant="outlined" color="primary" className="mt-4">
        Save
      </Button>
    </form>
  );
};

export default ConfigurationForm;
