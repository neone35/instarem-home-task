import withRedux from 'next-redux-wrapper';
import Dropdown from 'react-dropdown';
import React from 'react';
import { initStore, fetchSkycopResponse } from '../server/store';
import '../static/style.css';

class Index extends React.Component {
  // static getInitialProps ({ store, isServer }) {
  //   store.dispatch(fetchSkycopResponse(isServer))
  //   return { isServer }
  // }
  constructor(props) {
    super(props);
    this.state = {
      selected: { value: null, label: null },
    };
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(option) {
    this.setState({
      selected: option,
    });
  }

  render() {
    const { value } = this.state.selected;
    // const defaultOption = payload[0].title;
    return (
      <div className="formWrapper">
        <h1>Hello game of thrones API task!</h1>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    skycopRes: state.skycopReducer,
  };
}

export default withRedux(initStore, mapStateToProps, { fetchSkycopResponse })(Index);
