// import express, { Router } from 'express';
// import dotenv from 'dotenv';
// import cors from 'cors';
// import bodyParser from 'body-parser';
// import  connection  from './database/db.js';
// import DefaultData from './default.js';
// import router from './routes/route.js';
// import { v4 as uuid } from 'uuid';

// import fashionRoutes from "./routes/fashionRoutes.js";
// app.use("/api/ai", require("./ai/routes/aiRoutes"));

// const app = express();

// dotenv.config(); // Load environment variables from .env file
// app.use(cors());
// app.use(bodyParser.json({extended: true}));
// app.use(bodyParser.urlencoded({ extended: true })); // Enable CORS for all routes
// app.use('/',router);
// app.use("/", fashionRoutes);
// const PORT = process.env.PORT || 8000;

// const USERNAME = process.env.DB_USERNAME || 'user';
// const PASSWORD = process.env.DB_PASSWORD || '%40%23Kushagra51';

// connection(USERNAME, PASSWORD); // Initialize the database connection
// app.listen(PORT, () => console.log(`Server is running successfully on port ${PORT}`));
// DefaultData(); // Insert default data into the database

// export let paytmMerchantkey = process.env.PAYTM_MERCHANT_KEY;
// export let paytmParams = {};
// paytmParams['MID'] = process.env.PAYTM_MID;
// paytmParams['WEBSITE'] = process.env.PAYTM_WEBSITE;
// paytmParams['CHANNEL_ID'] = process.env.PAYTM_CHANNEL_ID;
// paytmParams['INDUSTRY_TYPE_ID'] = process.env.PAYTM_INDUSTRY_TYPE_ID;
// paytmParams['ORDER_ID'] = uuid();
// paytmParams['CUST_ID'] = process.env.PAYTM_CUSTOMER_ID;
// paytmParams['TXN_AMOUNT'] = '100';
// paytmParams['CALLBACK_URL'] = 'http://localhost:8000/callback';
// paytmParams['EMAIL'] = '2k22.csai.2213254@gmail.com';
// paytmParams['MOBILE_NO'] = '1234567852';

import express, { Router } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import connection from './database/db.js';
import DefaultData from './default.js';
import router from './routes/route.js';
import { v4 as uuid } from 'uuid';

import fashionRoutes from "./routes/fashionRoutes.js";
import aiRoutes from "./ai/routes/aiRoutes.js"; // ✅ ADDED

const app = express();

dotenv.config();

app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

// ✅ ADDED (correct place)
app.use("/api/ai", aiRoutes);

app.use('/', router);
app.use("/", fashionRoutes);

const PORT = process.env.PORT || 8000;

const USERNAME = process.env.DB_USERNAME || 'user';
const PASSWORD = process.env.DB_PASSWORD || '%40%23Kushagra51';

connection(USERNAME, PASSWORD);

app.listen(PORT, () => console.log(`Server is running successfully on port ${PORT}`));

DefaultData();

export let paytmMerchantkey = process.env.PAYTM_MERCHANT_KEY;
export let paytmParams = {};
paytmParams['MID'] = process.env.PAYTM_MID;
paytmParams['WEBSITE'] = process.env.PAYTM_WEBSITE;
paytmParams['CHANNEL_ID'] = process.env.PAYTM_CHANNEL_ID;
paytmParams['INDUSTRY_TYPE_ID'] = process.env.PAYTM_INDUSTRY_TYPE_ID;
paytmParams['ORDER_ID'] = uuid();
paytmParams['CUST_ID'] = process.env.PAYTM_CUSTOMER_ID;
paytmParams['TXN_AMOUNT'] = '100';
paytmParams['CALLBACK_URL'] = 'http://localhost:8000/callback';
paytmParams['EMAIL'] = '2k22.csai.2213254@gmail.com';
paytmParams['MOBILE_NO'] = '1234567852';