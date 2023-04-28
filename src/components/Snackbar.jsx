// import React from 'react';
// import { Snackbar, Alert as MuiAlert, } from '@mui/material';

// const Alert = React.forwardRef(function Alert(props, ref) {
// 	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
// });
// export default function MySnackbar(props) {
// 	const { open, onClose, autoHideDuration = 3000, severity, message, ...others } = props;
// 	return (
// 		<Snackbar open={open} autoHideDuration={autoHideDuration} onClose={onClose}>
// 			<Alert severity={severity}>{message}</Alert>
// 		</Snackbar >
// 	)
// }



import React, { forwardRef } from 'react';
import { Snackbar, Alert as MuiAlert, AlertColor, SnackbarCloseReason } from '@mui/material';

const Alert = forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function MySnackbar(props) {
	const { open, onClose, autoHideDuration = 3000, severity, message, ...others } = props;
	return (
		<Snackbar open={open} autoHideDuration={autoHideDuration}
			anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			onClose={onClose} {...others}
		>
			<Alert severity={severity}>{message}</Alert>
		</Snackbar>
	)
}