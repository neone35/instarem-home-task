import Battle from '../models/Battle';

const _ = require('lodash'); //eslint-disable-line

function countInArray(array, what) {
  let count = 0;
  for (let i = 0; i < array.length; i += 1) {
    if (array[i] === what) {
      count += 1;
    }
  }
  return count;
}

async function getMostActive(who) {
  let mostActive = null;
  const mostActiveList = await Battle.aggregate([{
    $sortByCount: ['$', who].join(''),
  }]);
  mostActive = mostActiveList[0]._id; //eslint-disable-line
  return mostActive;
}

async function fetchObjectArray(key) {
  const fetchObject = await Battle.find({})
    .select(key);
  const winsLosesArray = fetchObject.map(a => a[key]);
  return winsLosesArray;
}

function formatNumber(number) {
  return Number(number.toFixed(2));
}

export default function battleRoutes(server) {
  server.get('/api/list', async (req, res) => {
    const battles = await Battle.find({})
      .select('location region');
    if (battles != null) {
      res.send(battles);
    } else {
      res.send(404);
    }
  });

  server.get('/api/count', async (req, res) => {
    let battlesNum = null;
    battlesNum = await Battle.count({});
    if (battlesNum != null) {
      const jsonRes = JSON.stringify({
        battle_count: battlesNum,
      });
      res.send(jsonRes);
    } else {
      res.send(404);
    }
  });

  server.get('/api/stats', async (req, res) => {
    const winsLosesArray = await fetchObjectArray('attacker_outcome');
    const battleTypesArray = await fetchObjectArray('battle_type');
    const defenderSizeArray = await fetchObjectArray('defender_size');

    const jsonRes = JSON.stringify({
      most_active: {
        attacker_king: await getMostActive('attacker_king'),
        defender_king: await getMostActive('defender_king'),
        region: await getMostActive('region'),
        name: await getMostActive('name'),
      },
      attacker_outcome: {
        win: countInArray(winsLosesArray, 'win'),
        loss: countInArray(winsLosesArray, 'loss'),
      },
      // ES6 Set stores unique values && filter removes empty strings
      battle_type: [...new Set(battleTypesArray)].filter(Boolean),
      defender_size: {
        average: formatNumber(_.mean(defenderSizeArray.filter(Boolean))),
        min: _.min(defenderSizeArray.filter(Boolean)),
        max: _.max(defenderSizeArray.filter(Boolean)),
      },
    });


    if (jsonRes != null) {
      res.send(jsonRes);
    } else {
      res.send(404);
    }
  });

  server.get('/api/search', async (req, res) => {
    const { king, location, type } = req.query;
    const searchResult = await Battle.find({
      $or: [{ attacker_king: king }, { defender_king: king }],
      location,
      battle_type: type,
    }).select('attacker_king defender_king location battle_type');
    res.send(searchResult);
  });
}

