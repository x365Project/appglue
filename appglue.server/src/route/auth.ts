import express, {Router} from 'express';
import {Auth} from '@appglue/node';

const router: Router = express.Router();

router.get('/login', (req, res) => {
    (new Auth).login();
    res.send('logged in');
});

export default router;
