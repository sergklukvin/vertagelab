import React, { useEffect, useState } from 'react';
import { getAllColors, removeColor } from '../../services/http.service';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import LoopIcon from '@material-ui/icons/Loop';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { AlertBar } from '../Alert/AlertBar';
import GradientItem from './GradientItem';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  container: {
    marginTop: 30,
    marginBottom: 30,
  },
  table: {
    minWidth: 350,
  },
  btn: {
    textDecoration: 'none',
    color: 'white',
    fontSize: '16px',
  },
  btnAdd: {
    textDecoration: 'none',
    color: 'white',
    fontSize: '16px',
    backgroundColor: 'black',
  },
  mainDiv: {
    marginBottom: 30,
  },
  loop: {
    color: 'black',
  },
  delete: {
    cursor: 'pointer',
  },
  titleGradient: {
    width: '85%',
  },
});

export default function CustomizedTables() {
  const classes = useStyles();
  const [rows, setRows] = useState([null]);
  const [alertMeta, setAlertMeta] = useState({ severity: '', message: '' });
  const [isListManipulated, setListManipulated] = useState(false);
  const [isAlertOpen, setAlertOpen] = useState(false);

  useEffect(() => {
    let cleanupFunction = false;
    getAllColors().then((res) => {
      if (!cleanupFunction) setRows(res.data);
    });

    return () => (cleanupFunction = true);
  }, []);

  const remove = (id) => {
    removeColor(id).then(() => {
      getAllColors()
        .then((res) => setRows(res.data))
        .then(() => showAlert('success', 'Delete success'))
        .catch(() => showAlert('error', 'Update failed'));
    });
  };

  const showAlert = (severity, message) => {
    setListManipulated(true);
    setAlertMeta({ severity, message });
    setAlertOpen(true);

    setTimeout(() => {
      handleAlertClose();
    }, 2000);
  };

  const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertOpen(false);
  };

  if (rows[0] === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className={classes.mainDiv}>
      <AlertBar
        open={isAlertOpen}
        onClose={handleAlertClose}
        alertMeta={alertMeta}
      />
      <TableContainer component={Paper} className={classes.container}>
        <Table className={classes.table} aria-label='customized table'>
          <TableHead>
            <TableRow>
              <StyledTableCell className={classes.titleGradient}>
                GRADIENTS
              </StyledTableCell>
              <StyledTableCell align='right'></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell component='th' scope='row'>
                  <GradientItem data={[row.colorOne, row.colorTwo]} />
                </StyledTableCell>
                <StyledTableCell align='right'>
                  {' '}
                  <Link
                    to={{
                      pathname: '/add',
                      gradientId: row.id,
                    }}
                    className={classes.btn}
                  >
                    <LoopIcon className={classes.loop} />
                  </Link>{' '}
                  <HighlightOffIcon
                    className={classes.delete}
                    onClick={() => remove(row.id)}
                  />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button className={classes.btnAdd}>
        <Link
          to={{
            pathname: '/add',
            checkAdd: true,
          }}
          className={classes.btnAdd}
        >
          Add new gradient
        </Link>
      </Button>
    </div>
  );
}
