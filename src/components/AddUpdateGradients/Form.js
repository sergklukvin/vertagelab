import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  createColor,
  getAllColors,
  updateColor,
} from '../../services/http.service';
import { useForm } from 'react-hook-form';
import './Form.scss';
import { Redirect } from 'react-router-dom';
import { AlertBar } from '../Alert/AlertBar';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '80%',
    },
  },
  mainBlock: {
    marginTop: 30,
    marginBottom: 30,
  },
  btn: {
    color: 'white',
  },
  btnSubmit: {
    cursor: 'pointer',
  },
  btnDisable: {
    backgroundColor: 'grey',
  },
}));

export default function MultilineTextFields(props) {
  let curId = '';
  const classes = useStyles();
  const listGradients = props.listGradients;
  const [redirect, setRedirect] = useState(false);
  const [alertMeta, setAlertMeta] = useState({ severity: '', message: '' });
  const [isListManipulated, setListManipulated] = useState(false);
  const [isAlertOpen, setAlertOpen] = useState(false);

  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    if (props.listGradients.id !== '') {
      updateColor(props.listGradients.id, {
        id: props.listGradients.id,
        colorOne: data.colorOne.toLowerCase(),
        colorTwo: data.colorTwo.toLowerCase(),
      })
        .then(() => showAlert('success', 'Update success'))
        .catch(() => showAlert('error', 'Update failed'))
        .then(
          setTimeout(() => {
            setRedirect(true);
          }, 1000)
        );
    } else {
      getAllColors()
        .then((res) => {
          if (res.data.length === 0) {
            curId = 1;
          } else {
            curId = res.data[res.data.length - 1].id + 1;
          }
        })
        .then(
          createColor({
            id: curId,
            colorOne: data.colorOne.toLowerCase(),
            colorTwo: data.colorTwo.toLowerCase(),
          })
        )
        .then(() => showAlert('success', 'Create success'))
        .catch(() => showAlert('error', 'Create error'))
        .then(
          setTimeout(() => {
            setRedirect(true);
          }, 1000)
        );
    }
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

  if (redirect) {
    return (
      <div>
        <Redirect to='/' />
      </div>
    );
  }

  return (
    <>
      <AlertBar
        open={isAlertOpen}
        onClose={handleAlertClose}
        alertMeta={alertMeta}
      />

      <form onSubmit={handleSubmit(onSubmit)} className={classes.root}>
        <input
          name='colorOne'
          ref={register({ required: true, pattern: /#[a-fA-F0-9]{3,6}\b/gi })}
          placeholder='Color 1'
          defaultValue={listGradients.colorOne}
        />
        {errors.colorOne && <p>Field 'Color 1' is required</p>}

        <input
          name='colorTwo'
          ref={register({ required: true, pattern: /#[a-fA-F0-9]{3,6}\b/gi })}
          placeholder='Color 2'
          defaultValue={listGradients.colorTwo}
        />
        {errors.colorTwo && <p>Field 'Color 2' is required</p>}

        <input type='submit' value='SUBMIT' className={classes.btnSubmit} />
      </form>
    </>
  );
}
