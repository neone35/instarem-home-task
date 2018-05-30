import withRedux from 'next-redux-wrapper';
import React from 'react';
import Link from 'next/link';
import { initStore, fetchBattleLocationList, fetchBattleCount } from '../server/store';
import '../static/style.css';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listClicked: false,
      countClicked: false,
    };
    this.handleListClick = this.handleListClick.bind(this);
    this.handleCountClick = this.handleCountClick.bind(this);
  }

  componentDidMount() {
    this.props.fetchBattleLocationList();
    this.props.fetchBattleCount();
  }

  handleListClick() {
    this.setState({ countClicked: false });
    this.setState({ listClicked: !this.state.listClicked });
  }
  handleCountClick() {
    this.setState({ listClicked: false });
    this.setState({ countClicked: !this.state.countClicked });
  }

  render() {
    const { listData, listRoute } = this.props.battleList;
    const { countData, countRoute } = this.props.battleCount;
    const { listClicked, countClicked } = this.state;
    let output = null;
    let route = null;
    if (listClicked) {
      output = JSON.stringify(listData);
      route = listRoute;
    } else if (countClicked) {
      output = JSON.stringify(countData);
      route = countRoute;
    } else {
      output = 'No data received';
      route = '/';
    }
    return (
      <div className="container">
        <h1>Hello game of thrones API task!</h1>
        <div className="row">
          <div className="list-group col-6">
            <button
              onClick={this.handleListClick}
              className="btn btn-primary"
            >Get Battle places
            </button>
            <button
              onClick={this.handleCountClick}
              className="btn btn-secondary"
            >Get battles count
            </button>
          </div>
          <div className="list-group col-6">
            <p>
              <span><b>Route:</b></span>
              {route}
            </p>
            <span>{output}</span>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    battleList: state.battleListReducer,
    battleCount: state.battleCountReducer,
  };
}

export default withRedux(initStore, mapStateToProps, {
  fetchBattleLocationList,
  fetchBattleCount,
})(Index);
