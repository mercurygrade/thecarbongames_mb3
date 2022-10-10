import express from 'express'; 
import { loginCustomToken, validateQRCode } from '../controller/dashboardController';
const dashboardRoute = express()
dashboardRoute.post('/login', loginCustomToken)
dashboardRoute.post('/qr-validate', validateQRCode)
module.exports = dashboardRoute