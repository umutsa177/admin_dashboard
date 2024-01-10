// components/ConfigurationForm.tsx
import { useForm, Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { ColorPicker } from 'react-color-palette';
import { useState } from 'react';

interface FormData {
  productName: string;
  description: string;
}

const ProductAddForm: React.FC = () => {
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
            name="productName"
            control={control}
            defaultValue=""
            render={({ field }) => <TextField {...field} label="Product Name " fullWidth />}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            name="description"
            control={control}
            defaultValue=""
            render={({ field }) => 
            //  <ColorPicker width={456} height={228} color={color}
              // onChange={setColor} hideHSV dark /> 
              <TextField {...field} label="Description" fullWidth />
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

export default ProductAddForm;
