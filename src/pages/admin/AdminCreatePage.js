import { Box } from '@mui/material';
import CreatePageForm from '../../components/CreatePageForm';

export default function AdminCreatePage() {
  return (
    <Box sx={{p:10}}>
      <h2>Créer une nouvelle page</h2>
      <CreatePageForm />
    </Box>
  );
}
