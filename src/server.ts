import { APP, PORT } from '../src/app';
import loggin from './config/logging'
APP.listen(PORT, () => {
   loggin.info('SERVER', `MESSAGE: Server running on port http://localhost:${PORT}`)
})