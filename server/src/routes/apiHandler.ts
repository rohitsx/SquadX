import express from 'express';
import ApiService from '../services/apiService';

const router = express.Router();

router.post('/api/login', ApiService.login);

router.post('/api/signup', ApiService.signup);

router.post('/api/validateToken', ApiService.validateToken);



export default router;
