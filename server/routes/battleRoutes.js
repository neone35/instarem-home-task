import Battle from '../models/Battle';

export default function battleRoutes(server) {
  server.get('/api/battles', async (req, res) => {
    const battles = await Battle.findOne({ name: 'Battle of the Golden Tooth' })
      .select('name year');
    res.send(battles);
  });
}
