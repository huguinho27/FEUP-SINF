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
 * Get customers by sales value from DB
 */
app.get('/customersales', (req, res)=>{
  connectDB();
  connection.query('select customers.CompanyName, salesinvoices.GrossTotal ' + 
          'from salesinvoices, customers ' + 
          ' where salesinvoices.CustomerID = customers.CustomerID ' + 
          ' group by customers.CompanyName ' + 
          ' order by salesinvoices.GrossTotal desc ' + 
          ' limit 5;',
        (error, results, fields)=>{
    if (error) throw error;
    res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
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
  connection.query('SELECT salesInvoices.InvoiceNo, salesInvoices.InvoiceDate, products.ProductType, products.ProductCode, products.ProductGroup, ' +
  'products.ProductDescription, salesLines.UnitPrice, salesLines.CreditAmount FROM salesLines INNER JOIN salesInvoices ' +
  'ON salesInvoices.InvoiceNo = salesLines.InvoiceNo INNER JOIN products ON ' +
  'products.ProductCode = salesLines.ProductCode', (error, results, fields)=>{
    if (error) throw error;
    console.log('Db returned: ', results);
    res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
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
app.get('/purchases', (req, res)=> {

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
      //console.log(results2.body);
      res.set('Content-Type', 'application/json');
      res.status(200);
      res.send(results2.body);
    });
  });
});

/**
 * Get suppliers from DB
 */
app.get('/dashboard/suppliers', (req, res)=>{
  connectDB();
  connection.query('SELECT Website, CompanyName, BillingAddressDetail FROM suppliers', (error, results, fields)=> {
    if (error) throw error;
    res.send(results);
  });
});

app.get('/dashboard/sales/total', (req,res)=>{
  connectDB();
  connection.query('SELECT sum(CreditAmount) FROM saleslines', (error, results, fields)=>{
    if (error) throw error;
    res.set('Content-Type', 'application/json');
    res.status(200);
    res.send(results);
  });
});

app.get('/dashboard/purchases/total', (req,res)=>{
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
      body: '"SELECT abs(sum(TotalMerc)) FROM CabecCompras"'
    };
  
    request(options2, (error2, results2)=> {
      if (error2) {
        console.log(error2);
      }
      let obj = results2;
      let obj2 = JSON.parse(results2.body);
      res.send(obj2.DataSet.Table[0]);
    });
  });
});

/*app.get('/dashboard/inventoryvalue', (req, res) => {
  
});*/

app.get('/dashboard', (req, res)=>{
  connectDB();

  //FIRST REQUEST - SALES
  let options = {
    method: 'get',
    url: 'http://localhost:5000/dashboard/sales/total'
  };
  request(options, (error, results)=> {
    if (error) {
      console.log(error);
    }
    let sales = Math.floor(JSON.parse(results.body)[0]['sum(CreditAmount)']).toLocaleString();
    console.log(sales);
    //SECOND REQUEST - PURCHASES
    let options2 = {
      method: 'get',
      url: 'http://localhost:5000/dashboard/purchases/total'
    };
    request(options2, (error2, results2)=> {
      if (error2) {
        console.log(error2);
      }
      let purchases = Math.floor(JSON.parse(results2.body)['Column1']).toLocaleString();
      console.log(purchases);
      //THIRD REQUEST - TOP 5 CUSTOMERS
      let options = {
        method: 'get',
        url: 'http://localhost:5000/customersales'
      };
      request(options, (error3, results3)=> {
        if (error3) {
          console.log(error3);
        }
        let topcustomerscompany = [];
        let topcustomerstotal = [];
        let topcustomers = JSON.parse(results3.body);
        for (const key of Object.keys(topcustomers)) {
          topcustomerscompany.push(topcustomers[key].CompanyName);
          topcustomerstotal.push(topcustomers[key].GrossTotal)
        }
        /*console.log('company ', topcustomerscompany);
        console.log('total ', topcustomerstotal);*/
        //FOURTH REQUEST - SUPPLIERS
        let options = {
          method: 'get',
          url: 'http://localhost:5000/dashboard/suppliers'
        };
        request(options, (error4, results4)=> {
          if (error4) {
            console.log(error4);
          }
          let suppliersname = [];
          let supplierswebsite = [];
          let suppliersaddress = [];
          let suppliers = JSON.parse(results4.body);
          for (const key of Object.keys(suppliers)) {
            if (suppliers[key].Website === null) {
            supplierswebsite.push('--');
            } else {
              supplierswebsite.push(suppliers[key].Website);
            }
            suppliersaddress.push(suppliers[key].BillingAddressDetail);
            suppliersname.push(suppliers[key].CompanyName);
          }

          let dashboard = {
            totalSales: sales,
            totalPurchases: purchases,
            topCustomersCompany: topcustomerscompany,
            topCustomersTotal: topcustomerstotal,
            suppliersName: suppliersname,
            suppliersWebsite: supplierswebsite,
            suppliersAddress: suppliersaddress
          };
          res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
          res.set('Content-Type', 'application/json');
          res.send(JSON.stringify(dashboard));
        });
      });
    });
  });

  /*
  let dashboard = {
    totalSales: results2.body
  };
  */
});

app.listen(port, () => console.log(`Listening on port ${port}`));