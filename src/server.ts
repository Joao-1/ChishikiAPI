import 'express-async-errors';
import App from './app';

const app = new App();

(async ()=> {
    await app.load();
    app.start(3000);
})();
