import React, {useEffect} from 'react';

import {LinearProgress, Stack, Typography} from '@mui/material';

export const LinearDeterminate: React.FC = () => {
  const [progress, setProgress] = React.useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 250);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Stack
      width="100%"
      height="80vh"
      justifyContent="center"
      alignItems="center">
      <Stack
        width="80%"
        display="flex"
        justifyContent="space-between"
        spacing={3}>
        <Typography variant="h4" align="center">
          🍀 Technical Challenge
        </Typography>

        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{height: 10, borderRadius: 5}}
        />

        <Typography variant="h6" align="center">
          Liven
        </Typography>
      </Stack>
    </Stack>
  );
};
