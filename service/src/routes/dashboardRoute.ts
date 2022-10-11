import express from 'express'; 
import { loginCustomToken, validateQRCode ,userAccountUpgrade} from '../controller/dashboardController';
const dashboardRoute = express()
dashboardRoute.post('/login', loginCustomToken)
dashboardRoute.post('/qr-validate', validateQRCode)
dashboardRoute.post('/upgrade-account', userAccountUpgrade)
module.exports = dashboardRoute