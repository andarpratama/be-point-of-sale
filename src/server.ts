import { APP, PORT } from './app';
import loggin from './config/logging'
APP.listen(process.env.PORT || 5000, () => {
   loggin.info('SERVER', `MESSAGE: Server running on port http://localhost:${process.env.PORT}`)
})