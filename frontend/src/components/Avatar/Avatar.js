import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function Avatar() {
  return (
      <div style={{ display:'flex', justifyContent:'center' }}>
    <Card sx={{ 
        maxWidth: 345,
        margin: 5
    }}>
      <CardMedia
        component="img"
        image="/avatars/logo-icon@3x.png"
        alt="user picture"
        title='user picture'
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Username
        </Typography>
        <Typography variant="body2" color="text.secondary">
            User info
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Change Profile Picture</Button>
      </CardActions>
    </Card>
    </div>
  );
}
