import 'dotenv/config';
import App from './index';
import AuthenticationController from './src/Controllers/routes/auth'
import UserDataController from './src/Controllers/routes/user_data';
const app = new App([
    new AuthenticationController(),
    new UserDataController(),
],
);

app.listen();