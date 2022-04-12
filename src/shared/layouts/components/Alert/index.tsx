/* eslint-disable @typescript-eslint/ban-types */
import React, {useCallback, useEffect, useState} from 'react';

import {
  Alert as MuiAlert,
  CircularProgress,
  Container,
  Snackbar,
} from '@mui/material';
import {AlertService, AlertTypes} from 'shared/services/alertService';

interface IAlertState {
  isOpen: boolean;
  message: string;
  type: AlertTypes;
  onClose?: Function;
}

export const Alert: React.FC = () => {
  const [alert, setAlert] = useState<IAlertState>({
    type: undefined,
    isOpen: false,
    message: '',
  });

  useEffect(() => {
    const subscription = AlertService.subscribe((msg: any) =>
      setAlert({
        message: msg.message,
        type: msg.type,
        isOpen: true,
        onClose: msg.onClose,
      }),
    );
    return () => {
      subscription.unsubscribe();
      setAlert({message: '', type: undefined, isOpen: false});
    };
  }, []);

  const handleOnCloseAlert = useCallback(() => {
    setAlert({
      ...alert,
      isOpen: false,
      type: undefined,
    });
    alert.onClose && alert.onClose();
  }, [setAlert, alert]);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (alert.isOpen && alert.type !== 'loading') {
      timer = setTimeout(handleOnCloseAlert, 6000);
      return () => clearTimeout(timer);
    }
  }, [alert, handleOnCloseAlert]);

  return (
    <Snackbar
      open={alert.isOpen}
      anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
      <Container>
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleOnCloseAlert}
          action={alert.type !== 'loading' ? null : <></>}
          severity={alert.type !== 'loading' ? alert.type : 'info'}
          icon={
            alert.type !== 'loading' ? undefined : (
              <CircularProgress color="inherit" size={20} />
            )
          }>
          {alert.message}
        </MuiAlert>
      </Container>
    </Snackbar>
  );
};
