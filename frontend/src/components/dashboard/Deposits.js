import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

export default function Deposits() {
  return (
    <React.Fragment>
      <Title>Post Count</Title>
      <Typography component="p" variant="h4">
        16
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        as of Today
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View all
        </Link>
      </div>
    </React.Fragment>
  );
}
