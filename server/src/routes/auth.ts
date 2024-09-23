import express from 'express';
import AuthServices from '../services/authServices';

const router = express.Router();

router.post('/api/login', AuthServices.login);

router.post('/api/signup', AuthServices.signup);

router.post('/api/validateToken', AuthServices.validateToken);


export default router;
