/* @flow */

import express, {
  type $Request as Request,
  type $Response as Response,
} from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import getConfig from './config';

import {
  decodeObjectId,
  encodeObjectId,
} from './encoder';

import {
  getVisitedLink,
  Link,
  sequelize,
} from './models';

sequelize.sync();
const port = 3000;
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.post('/getlink', async (req: Request, res: Response) => {
  const {numberSystemArray} = getConfig();
  const {
    body: {
      url,
    },
  } = req;
  const linkInstance = await getVisitedLink(url);
  const shortUrl = await encodeObjectId(numberSystemArray, linkInstance.id);
  return res.json({
    link: `http://${req.headers.host}/${shortUrl}`,
  });
});
app.get('/:shortLinkValue', async (req: Request, res: Response) => {
  const {numberSystemArray} = getConfig();
  const {
    params: {
      shortLinkValue,
    },
  } = req;
  const instanceId = decodeObjectId(numberSystemArray, shortLinkValue);
  const instance = await Link.findByPk(instanceId);
  if (instance == null) {
    return res.send(500, 'Invalid link');
  }
  return res.redirect(instance.url);
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
