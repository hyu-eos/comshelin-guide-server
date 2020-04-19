import express, {Request, Response, NextFunction} from 'express';
import config from './common/config';

const app = express();

app.get('/', (request: Request, response: Response, next: NextFunction) => {
    response.send(JSON.stringify(config));
});

app.listen(3000, () => {
    console.log('start')
});
