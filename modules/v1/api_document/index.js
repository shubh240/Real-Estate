const express = require('express');
const app = express();
var session = require('express-session');
const api_doc = require('./route')

app.use(
    session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false, maxAge: (60000 * 120) }
    })
)

app.get('/', api_doc.index);
app.get('/login', api_doc.index);
app.post('/login', api_doc.login);
app.get('/dashboard', api_doc.dashboard);
app.get('/company_list', api_doc.company_list);
app.get('/client_list', api_doc.client_list);
app.get('/employee_list', api_doc.employee_list);
app.get('/code', api_doc.code);
app.get('/enc_dec', api_doc.enc_dec);
app.get('/logout', api_doc.logout);

module.exports = app;