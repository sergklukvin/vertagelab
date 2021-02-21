import React from 'react';
import App from '../src/App';
import GradientItem from '../src/components/Gradients/GradientItem';
import AddUpdateComponent from '../src/components/Gradients/ListGradients';
import Form from '../src/components/AddUpdateGradients/Form';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import { Redirect } from 'react-router-dom';

configure({ adapter: new Adapter() });

describe('Vertagelab tests', () => {
  it('render correctly App component', () => {
    const AppComponent = renderer.create(<App />).toJSON();
    expect(AppComponent).toMatchSnapshot();
  });

  it('render redirect FormComponent', () => {
    const wrapper = shallow(
      <Form listGradients={{ id: '', colorOne: '', colorTwo: '' }}></Form>
    );
    expect(wrapper.find(Redirect)).toBeTruthy();
  });

  it('render correctly AddUpdateComponent component', () => {
    const AddUpdate = renderer
      .create(
        <AddUpdateComponent
          props={{ location: { pathname: '/add', checkAdd: true } }}
        />
      )
      .toJSON();
    expect(AddUpdate).toMatchSnapshot();
  });

  it('GradientItem should contain gradientBox-class', () => {
    const component = shallow(<GradientItem data={[1, 2]} />);
    const wrapper = component.find('.gradientBox');
    expect(wrapper.length).toBe(1);
  });

  it('Form should contain tag <form>', () => {
    const component = shallow(
      <Form listGradients={{ id: '', colorOne: '', colorTwo: '' }} />
    );
    const wrapper = component.find('form');
    expect(wrapper.length).toBe(1);
  });

  it('Form should contain tag <input>', () => {
    const component = shallow(
      <Form listGradients={{ id: '', colorOne: '', colorTwo: '' }} />
    );
    const wrapper = component.find('input');
    expect(wrapper.length).toBe(3);
  });
});
