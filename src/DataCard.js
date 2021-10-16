import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import FlagIcon from '@mui/icons-material/Flag';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ErrorIcon from '@mui/icons-material/Error';

export default function DataCard({ data, isError }) {
  if (isError) {
    return (
      <Grid container direction="row" alignItems="center">
        <ErrorIcon color="error" />
        <Typography color="text.secondary" ml={1}>
          an error had occurred ...
          </Typography>
      </Grid>
    );
  }

  const { ip, countryCode, timezone } = data;
  return (
    <Card sx={{ maxWidth: 300 }} variant="outlined">
      <CardHeader title={ip} />
      <CardContent>
        <Grid container direction="row" alignItems="center">
          <FlagIcon />
          <Typography color="text.secondary" ml={1}>
            {countryCode}
          </Typography>
        </Grid>
        <Grid container direction="row" alignItems="center">
          <AccessTimeIcon />
          <Typography color="text.secondary" ml={1}>

            {timezone}
          </Typography>
        </Grid>

      </CardContent>
    </Card>
  );
}
