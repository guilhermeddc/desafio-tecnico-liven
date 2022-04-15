import React, {useCallback} from 'react';
import {useQueryClient} from 'react-query';

import {ErrorRounded} from '@mui/icons-material';
import {Button, Stack, Typography} from '@mui/material';

interface IProps {
  queryKey: string;
}

export const ErrorPage: React.FC<IProps> = ({queryKey}) => {
  const queryClient = useQueryClient();

  const handleReset = useCallback(() => {
    queryClient.invalidateQueries(queryKey);
  }, [queryClient, queryKey]);

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
        alignItems="center"
        spacing={3}>
        <ErrorRounded color="secondary" sx={{fontSize: 100}} />

        <Typography variant="h4" align="center">
          Error loading data!
        </Typography>

        <Button variant="outlined" onClick={handleReset}>
          Reset Page
        </Button>
      </Stack>
    </Stack>
  );
};
