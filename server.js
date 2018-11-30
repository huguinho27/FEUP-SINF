const express = require('express');
let mysql = require('mysql');
let request = require('request');
 
const app = express();
const port = process.env.PORT || 5000;

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'sinfdemo'
});

function connectDB() { 
 if (connection.state === 'disconnected') {
   connection.connect();
 }
}

/**
 * Get customers from DB
 */
app.get('/customers', (req, res)=>{
  connectDB();
  connection.query('SELECT CustomerID, AccountID, CustomerID, CompanyName, BillingAddressDetail, ' + 
  'BillingCity, BillingPostalCode, BillingCountry, ShipToAddressDetail, ShipToCity, ShipToPostalCode, ' +
  'ShipToCountry, Telephone, Fax, Website FROM customers', (error, results, fields)=>{
    if (error) throw error;
    console.log('Db returned: ', results);
    res.send(results);
  });
});

/**
 * Get invoices from DB
 */
app.get('/invoices', (req, res)=>{
  connectDB();
  connection.query('SELECT salesinvoices.InvoiceNo, salesinvoices.InvoiceDate, salesinvoices.GrossTotal, ' +
  'customers.CompanyName FROM salesinvoices, customers' + 
  'WHERE salesinvoices.CustomerID = customers.CustomerID', (error, results, fields)=>{
    if (error) throw error;
    console.log('Db returned: ', results);
    res.send(results);
  });
});

/**
 * Get products from DB
 */
app.get('/products', (req, res)=>{
  connectDB();
  connection.query('SELECT * FROM products', (error, results, fields)=>{
    if (error) throw error;
    console.log('Db returned: ', results);
    res.send(results);
  });
});

/**
 * Get sales from DB
 */
app.get('/sales', (req, res)=>{
  connectDB();
  connection.query('SELECT salesInvoices.InvoiceNo, products.ProductType, products.ProductCode, products.ProductGroup, ' +
  'products.ProductDescription, salesLines.UnitPrice, salesLines.CreditAmount FROM salesLines INNER JOIN salesInvoices ' +
  'ON salesInvoices.InvoiceNo = salesLines.InvoiceNo INNER JOIN products ON ' +
  'products.ProductCode = salesLines.ProductCode', (error, results, fields)=>{
    if (error) throw error;
    console.log('Db returned: ', results);
    res.send(results);
  });
});

/**
 * Get suppliers from DB
 */
app.get('/suppliers', (req, res)=>{
  connectDB();
  connection.query('SELECT SupplierID, AccountID, SupplierTaxID, CompanyName, BillingAddressDetail, BillingCity, ' +
  'BillingPostalCode, BillingCountry, ShipFromAddressDetail, ShipFromCity, ShipFromPostalCode, ShipFromCountry, ' +
  'Telephone, Fax, Website FROM suppliers', (error, results, fields)=>{
    if (error) throw error;
    console.log('Db returned: ', results);
    res.send(results);
  });
});

/**
 * Get purchases from Primavera WebApi
 */
app.get('/purchases', (req, res)=>{

  let headers = {
    'Content-type': 'application/x-www-form-urlencoded'
  };

  let options = {
    method: 'post',
    form: {
      username: 'feup',
      password: 'qualquer1',
      company: 'DEMO',
      instance: 'Default',
      grant_type: 'password',
      line: 'professional'
    },
    url: 'http://10.227.149.42:2018/WebApi/token',
    headers
  };

  //Request to get authentication token
  request(options, (error1, results1)=> {
    if (error1) throw error1;
    let parsedAuthentication = JSON.parse(results1.body);
    let bearerToken = parsedAuthentication.access_token;
    let bearer = parsedAuthentication.token_type;
    
    //Request to get purchases, providing the token
    let headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer' + ' ' + bearerToken
    };
  
    let options2 = {
      headers,
      method: 'get',
      url: 'http://10.227.149.42:2018/WebApi/Administrador/Consulta',
      body: '"Select DataVencimento, PrecoLiquido, Quantidade FROM LinhasCompras, CabecCompras '+
      'WHERE LinhasCompras.IdCabecCompras = CabecCompras.Id"'
    };
  
    request(options2, (error2, results2)=> {
      if (error2) {
        console.log(error2);
      }
      console.log(results2.body);
      res.set('Content-Type', 'application/json');
      res.status(200);
      res.send(results2.body);
    });
  });
});

app.get('/dashboard/sales/total', (req,res)=>{
  connectDB();
  connection.query('SELECT sum(CreditAmount) FROM saleslines', (error, results, fields)=>{
    if (error) throw error;
    console.log('Db returned: ', results);
    res.set('Content-Type', 'application/json');
    res.status(200);
    res.send(results);
  });
});

app.get('/dashboard', (req, res)=>{
  connectDB();
  connection.query('SELECT sum(CreditAmount) AS sum FROM saleslines', (error, results, fields)=>{
    if (error) throw error;
    console.log('Db returned: ', results[0].sum);
    let totalSales = Math.floor(results[0].sum).toLocaleString();
    let dashboard = {
      totalSales
    };
    res.set('Content-Type', 'application/json');
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.status(200);
    res.send(dashboard);
  });  
});

app.listen(port, () => console.log(`Listening on port ${port}`));