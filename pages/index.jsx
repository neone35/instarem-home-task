import withRedux from 'next-redux-wrapper';
import React from 'react';
import Link from 'next/link';
import Textarea from 'react-textarea-autosize';
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
      <div className="jumbotron">
        <h2 className="display-4">Game of thrones API task</h2>
        <p className="lead">Using data to build an API Server using Node.JS/Express which exposes 4 endpoints.</p>
        <hr className="my-4" />
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
            <p><b>{['Route: ', route].join('')}</b></p>
            <Textarea name="textarea" value={output} />
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
