import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { getColor } from '../../services/http.service';
import Form from './Form';

const useStyles = makeStyles({
  mainBlock: {
    marginTop: 30,
    marginBottom: 30,
  },
  btn: {
    textDecoration: 'none',
    color: 'black',
    backgroundColor: 'black',
  },
});

function AddUpdateComponent(props) {

  const classes = useStyles();
  const [info, setInfo] = useState(null);

  useEffect(() => {
    let cleanupFunction = false;

    if (
      props.location.checkAdd === true ||
      props.location.gradientId === undefined
    ) {
      setInfo({id:'', colorOne: '', colorTwo: ''});
    } else {
      getColor(props.location.gradientId).then((res) => {
        if (!cleanupFunction) setInfo(res.data);
      });
    }

    return () => (cleanupFunction = true);
  }, []);

  if (info === null) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className={classes.mainBlock}>
        <Link to='/' className={classes.btn}>
          <Button className={classes.btn}>GO BACK</Button>
        </Link>
      </div>
      <div className={classes.mainBlock}>
        <Form listGradients={info} />
      </div>
    </div>
  );
}

export default AddUpdateComponent;
