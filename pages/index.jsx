import withRedux from 'next-redux-wrapper';
import React from 'react';
import Textarea from 'react-textarea-autosize';
import {
  initStore,
  fetchBattleLocationList,
  fetchBattleCount,
  fetchBattleStats,
} from '../server/store';
import '../static/style.css';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listClicked: false,
      countClicked: false,
      statsClicked: false,
    };
    this.handleListClick = this.handleListClick.bind(this);
    this.handleCountClick = this.handleCountClick.bind(this);
    this.handleStatsClick = this.handleStatsClick.bind(this);
  }

  componentDidMount() {
    this.props.fetchBattleLocationList();
    this.props.fetchBattleCount();
    this.props.fetchBattleStats();
  }

  handleListClick() {
    this.setState({ countClicked: false, statsClicked: false });
    this.setState({ listClicked: !this.state.listClicked });
  }
  handleCountClick() {
    this.setState({ listClicked: false, statsClicked: false });
    this.setState({ countClicked: !this.state.countClicked });
  }
  handleStatsClick() {
    this.setState({ listClicked: false, countClicked: false });
    this.setState({ statsClicked: !this.state.statsClicked });
  }

  render() {
    const { listData, listRoute } = this.props.battleList;
    const { countData, countRoute } = this.props.battleCount;
    const { statsData, statsRoute } = this.props.battleStats;
    const { listClicked, countClicked, statsClicked } = this.state;
    let output = null;
    let route = null;
    if (listClicked) {
      output = JSON.stringify(listData, null, 2);
      route = listRoute;
    } else if (countClicked) {
      output = JSON.stringify(countData, null, 2);
      route = countRoute;
    } else if (statsClicked) {
      output = JSON.stringify(statsData, null, 2);
      route = statsRoute;
    } else {
      output = 'No data received';
      route = '/';
    }
    return (
      <div className="jumbotron">
        <h3>Game of thrones <span className="badge badge-secondary">API task</span></h3>
        <p className="lead">Using data to build an API Server using Node.JS/Express which exposes 4 endpoints.</p>
        <hr className="my-4" />
        <div className="row">
          <div className="list-group col-6">
            <button
              onClick={this.handleListClick}
              className="btn btn-primary"
            >Get battles places
            </button>
            <button
              onClick={this.handleCountClick}
              className="btn btn-secondary"
            >Get battles count
            </button>
            <button
              onClick={this.handleStatsClick}
              className="btn btn-success"
            >Get battles stats
            </button>
          </div>
          <div className="list-group col-6">
            <p><span><b>Route: </b></span>{route}</p>
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
    battleStats: state.battleStatsReducer,
  };
}

export default withRedux(initStore, mapStateToProps, {
  fetchBattleLocationList,
  fetchBattleCount,
  fetchBattleStats,
})(Index);
