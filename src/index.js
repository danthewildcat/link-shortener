/* @flow */

import express, {
  type $Request as Request,
  type $Response as Response,
} from 'express';

const port = 3000;
const app = express();
app.get('/', (req: Request, res: Response) => res.send('Hello World!'));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
