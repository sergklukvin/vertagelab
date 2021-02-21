import React from 'react';
import HeaderCard from './components/Header/HeaderCard';
import ListBooks from './components/Gradients/ListGradients';
import Container from '@material-ui/core/Container';
import AddUpdateComponent from './components/AddUpdateGradients/AddUpdateComponent';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
  return (
    <Container maxWidth='md'>
      <HeaderCard />
      <Router>
        <Switch>
          <Route exact path='/' component={ListBooks} />
          <Route path='/add' component={AddUpdateComponent} />
        </Switch>
      </Router>
    </Container>
  );
}

export default App;
