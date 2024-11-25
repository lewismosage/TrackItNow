const cors = require('cors');

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true  // If you're using cookies
})); 