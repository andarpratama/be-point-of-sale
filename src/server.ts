import { APP, PORT } from '../src/app';
APP.listen(PORT, () =>console.log(`Server is running http://localhost:${PORT}`))