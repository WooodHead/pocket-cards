import express from 'express';
import { json, urlencoded } from 'body-parser';
import { login, common, healthCheck, initiateAuth } from './app';

// Instantiate application
const app = express();

// Configure middleware
app.use(json());
app.use(
  urlencoded({
    extended: false,
  })
);

// health check
app.get('/auth/health', async (req, res) => await common(req, res, healthCheck));

// process login request
app.post('/auth/login', async (req, res) => await common(req, res, login));

// refresh tokens
app.post('/auth/refresh', async (req, res) => await common(req, res, initiateAuth));

// get system version no
// app.get('/system/version', async (req, res) => await common(req, res, version));

// // get release information
// app.get('/system/releases', async (req, res) => await common(req, res, release));

export default app;
