import express from 'express'; 
import { loginCustomToken, validateQRCode ,userAccountUpgrade,addEvent} from '../controller/dashboardController';
const dashboardRoute = express()
dashboardRoute.post('/login', loginCustomToken)
dashboardRoute.post('/qr-validate', validateQRCode)
dashboardRoute.post('/upgrade-account', userAccountUpgrade)
dashboardRoute.post('/add-event',  addEvent)

module.exports = dashboardRoute