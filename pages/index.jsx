import withRedux from 'next-redux-wrapper';
import React from 'react';
import Textarea from 'react-textarea-autosize';
import {
  initStore,
  fetchBattleLocationList,
  fetchBattleCount,
  fetchBattleStats,
  submitSearch,
} from '../server/store';
import '../static/style.css';
import { Router } from '../server/routes';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      output: 'No data received',
      route: '/',
    };
    this.handleListClick = this.handleListClick.bind(this);
    this.handleCountClick = this.handleCountClick.bind(this);
    this.handleStatsClick = this.handleStatsClick.bind(this);
    this.handleSearchClick = this.handleSearchClick.bind(this);
  }

  componentDidMount() {
    this.props.fetchBattleLocationList();
    this.props.fetchBattleCount();
    this.props.fetchBattleStats();
  }

  runSearch(times) {
    let counter = 0;
    for (let i = 0; i < times; i += 1) {
      if (counter < times) {
        // eslint-disable-next-line
        setTimeout(() => {
          this.props.submitSearch(this.props.url.asPath);
          const { searchData, searchRoute } = this.props.battleSearch;
          this.setState({
            output: JSON.stringify(searchData, null, 2),
            route: searchRoute,
          });
          this.runSearch(counter);
          counter += 1;
        }, 500);
      }
    }
  }

  handleListClick() {
    Router.pushRoute('index');
    const { listData, listRoute } = this.props.battleList;
    this.setState({
      output: JSON.stringify(listData, null, 2),
      route: listRoute,
    });
  }
  handleCountClick() {
    Router.pushRoute('index');
    const { countData, countRoute } = this.props.battleCount;
    this.setState({
      output: JSON.stringify(countData, null, 2),
      route: countRoute,
    });
  }
  handleStatsClick() {
    Router.pushRoute('index');
    const { statsData, statsRoute } = this.props.battleStats;
    this.setState({
      output: JSON.stringify(statsData, null, 2),
      route: statsRoute,
    });
  }
  handleSearchClick() {
    Router.pushRoute('search', {
      king: 'Robb Stark',
      location: 'Riverrun',
      type: 'siege',
    });
    // run 3 times to:
    // set url params
    // send async req to back
    // set state
    this.runSearch(3);
  }

  renderPlacesBtn() {
    const placesBtn = (
      <button
        onClick={this.handleListClick}
        className="btn btn-primary"
      >Get battles places
      </button>
    );
    return placesBtn;
  }

  renderCountBtn() {
    const countBtn = (
      <button
        onClick={this.handleCountClick}
        className="btn btn-info"
      >Get battles count
      </button>
    );
    return countBtn;
  }

  renderStatsBtn() {
    const statsBtn = (
      <button
        onClick={this.handleStatsClick}
        className="btn btn-success"
      >Get battles stats
      </button>
    );
    return statsBtn;
  }

  renderSearchBtn() {
    const searchBtn = (
      <button
        className="btn btn-dark"
        onClick={this.handleSearchClick}
      >Search
      </button>
    );
    return searchBtn;
  }

  render() {
    return (
      <div className="jumbotron">
        <h3>Game of thrones <span className="badge badge-secondary">API task</span></h3>
        <p className="lead">Using data to build an API Server using Node.JS/Express which exposes 4 endpoints.</p>
        <hr className="my-4" />
        <div className="row">
          <div className="list-group col-6">
            {this.renderPlacesBtn()}
            {this.renderCountBtn()}
            {this.renderStatsBtn()}
            {this.renderSearchBtn()}
          </div>
          <div className="list-group col-6">
            <p><span><b>Route: </b></span>{this.state.route}</p>
            <Textarea name="textarea" value={this.state.output} />
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
    battleSearch: state.battleSearchReducer,
  };
}

export default withRedux(initStore, mapStateToProps, {
  fetchBattleLocationList,
  fetchBattleCount,
  fetchBattleStats,
  submitSearch,
})(Index);
