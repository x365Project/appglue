import express, {Router} from 'express';
import bodyParser from 'body-parser';
import capitalize from '../../appglue.common/helpers/capitalize';
import router from './route';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('dist'));

const routes: Router[] = Object.values(router);
app.use('/api', routes);

const port: number = 4000;
app.listen(port, () => {
    console.log(`${capitalize('app')} listening on ${port}`);
});
