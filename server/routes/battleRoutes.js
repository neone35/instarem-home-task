import Battle from '../models/Battle';

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
}
