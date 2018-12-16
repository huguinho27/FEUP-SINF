const express = require('express');
let mysql = require('mysql');
let request = require('request');
let bodyParser = require('body-parser');
 
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());

//const hostname = '10.227.151.135';
const hostname = '192.168.0.194';
//const hostname = '169.254.73.28';

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'sinfdemo'
});
connection.connect();

app.get('/dashboard/:start/:end', (req, res)=>{
  //FIRST REQUEST - SALES
  let options = {
    method: 'get',
    url: 'http://localhost:5000/dashboard/salestotal/'+req.params.start+'/'+req.params.end
  };
  request(options, (error, results)=> {
    if (error) {
      console.log(error);
    }
    let sales = Math.floor(JSON.parse(results.body)[0]['sum(CreditAmount)']).toLocaleString();
    
    //SECOND REQUEST - PURCHASES
    let options2 = {
      method: 'get',
      url: 'http://localhost:5000/dashboard/purchasestotal/'+req.params.start+'/'+req.params.end
    };
    request(options2, (error2, results2)=> {
      if (error2) {
        console.log(error2);
      }
      console.log(results2.body);
      let purchases = Math.floor(JSON.parse(results2.body)['Column1']).toLocaleString();
      console.log('Primavera connected');
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
          
          // Request to get inventory value
          let options3 = {
            method: 'get',
            url: 'http://localhost:5000/inventory'
          };

          request(options3, (error3, results3)=> {
            if (error3) {
              res.status(500);
              res.set('Content-Type', 'application/json');
              res.send({error: 'Server error'});
              console.log(error3);
            }
            let obj2 = JSON.parse(results3.body);

            let dashboard = {
              totalSales: sales,
              totalPurchases: purchases,
              topCustomersCompany: topcustomerscompany,
              topCustomersTotal: topcustomerstotal,
              suppliersName: suppliersname,
              suppliersWebsite: supplierswebsite,
              suppliersAddress: suppliersaddress,
              inventoryValue: obj2.inventoryValue
            };
            res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
            res.set('Content-Type', 'application/json');
            res.send(JSON.stringify(dashboard));
          });
        });
      });
    });
  });
});

app.get('/dashboard/salestotal/:start/:end', (req,res)=>{
  connection.query('SELECT sum(CreditAmount) FROM saleslines where TaxPointDate > ' + '\'' + req.params.start + '\'' + ' AND TaxPointDate < ' + '\'' + req.params.end + '\'', (error, results, fields)=>{
    if (error) throw error;
    res.set('Content-Type', 'application/json');
    res.status(200);
    res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.send(results);
  });
});

app.get('/dashboard/purchasestotal/:start/:end', (req,res)=>{
  let headers = {
    'Content-type': 'application/x-www-form-urlencoded'
  };

  let options = {
    method: 'post',
    form: {
      username: 'feup',
      password: 'qualquer1',
      company: 'belaflor',
      instance: 'Default',
      grant_type: 'password',
      line: 'professional'
    },
    url: 'http://' + hostname + ':2018/WebApi/token',
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
      url: 'http://' + hostname + ':2018/WebApi/Administrador/Consulta',
      body: '"SELECT abs(sum(TotalMerc)) FROM CabecCompras where DataDoc < ' + '\'' + req.params.end + '\'' + ' and DataDoc > ' + '\'' + req.params.start + '\'' + '"'
    };
    console.log(options2.body);
    request(options2, (error2, results2)=> {
      if (error2) {
        console.log(error2);
      }
      let obj = results2;
      let obj2 = JSON.parse(results2.body);
      res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
      res.send(obj2.DataSet.Table[0]);
    });
  });
});


/**
 * Get customers from DB
 */
app.get('/customers', (req, res)=>{
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
  //connectDB();
  connection.query('select customers.CompanyName, salesinvoices.GrossTotal ' + 
          'from salesinvoices, customers ' + 
          ' where salesinvoices.CustomerID = customers.CustomerID ' + 
          ' group by customers.CompanyName ' + 
          ' order by salesinvoices.GrossTotal desc ' + 
          ' limit 5;',
        (error, results, fields)=>{
    if (error) throw error;
    res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
    //connection.end();
    res.send(results);
  });
});

/**
 * Get invoices from DB
 */
app.get('/invoices', (req, res)=>{
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
  connection.query('SELECT * FROM products', (error, results, fields)=>{
    if (error) throw error;
    console.log('Db returned: ', results);
    res.send(results);
  });
});

/**
 * Get sales from DB
 */
app.get('/sales/:start/:end', (req, res)=>{
  connection.query('SELECT salesInvoices.InvoiceNo, salesInvoices.InvoiceDate, products.ProductType, products.ProductCode, products.ProductGroup, ' +
  'products.ProductDescription, salesLines.UnitPrice, salesLines.CreditAmount FROM salesLines INNER JOIN salesInvoices ' +
  'ON salesInvoices.InvoiceNo = salesLines.InvoiceNo INNER JOIN products ON ' +
  'products.ProductCode = salesLines.ProductCode where salesInvoices.InvoiceDate < ' + '\'' + req.params.end + '\'' + ' and salesInvoices.InvoiceDate > ' + '\'' + req.params.start + '\'', (error, results, fields)=>{
    if (error) throw error;
    console.log('Db returned: ', results);
    res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.send(results);
  });
});

/**
 * Get inventory data from Primavera
 */
app.get('/inventory', (req, res)=>{
  let headers = {
    'Content-type': 'application/x-www-form-urlencoded'
  };

  let options = {
    method: 'post',
    form: {
      username: 'feup',
      password: 'qualquer1',
      company: 'belaflor',
      instance: 'Default',
      grant_type: 'password',
      line: 'professional'
    },
    url: 'http://' + hostname + ':2018/WebApi/token',
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
      url: 'http://' + hostname + ':2018/WebApi/Administrador/Consulta',
      body: '"Select SUM(StkActual), PCMedio, Artigo FROM V_INV_ArtigoArmazem GROUP BY PCMedio, Artigo"'
    };
  
    request(options2, (error2, results2)=> {
      if (error2) {
        res.status(500);
        res.set('Content-Type', 'application/json');
        res.send({error: 'Server error'});
        console.log(error2);
      }

      let options3 = {
        headers,
        method: 'get',
        url: 'http://' + hostname + ':2018/WebApi/Administrador/Consulta',
        body: '"Select Artigo.Descricao as Name, Artigo.Artigo, Artigo.STKMinimo FROM ArtigoMoeda, Artigo WHERE ArtigoMoeda.Artigo = Artigo.Artigo"'
      };
    
      request(options3, (error3, results3)=> {
        if (error3) {
          res.status(500);
          res.set('Content-Type', 'application/json');
          res.send({error: 'Server error'});
          console.log(error3);
        }
        let invValueAndStock = JSON.parse(results2.body).DataSet.Table;
        let productDetails = JSON.parse(results3.body).DataSet.Table;

        let invValue = 0;
        let belowMinStock = [];
        let inventoryProducts = [];
  
        for (let i = 0; i < invValueAndStock.length; i++) {
          // Get Total Inventory Value
          invValue += invValueAndStock[i].Column1 * invValueAndStock[i].PCMedio;

          for (let k = 0; k < productDetails.length; k++) {
            if (productDetails[k].Artigo == invValueAndStock[i].Artigo) {
              inventoryProducts.push({
                name: productDetails[k].Name,
                valuePerUnit: invValueAndStock[i].PCMedio,
                quantity: invValueAndStock[i].Column1,
                prodTotalValue: invValueAndStock[i].Column1 * invValueAndStock[i].PCMedio
              })
              if (invValueAndStock[i].Column1 < productDetails[k].STKMinimo) {
                belowMinStock.push({name:  productDetails[k].Name});
              }
            }
          }
        }
  
        let inventory = {
          inventoryValue: invValue.toLocaleString(),
          productsBelowSecurityStock: belowMinStock,
          productsInventory: inventoryProducts
        };
        res.status(200);
        res.set('Content-Type', 'application/json');
        res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
        res.send(JSON.stringify(inventory));

      });
    });
  });
});

/**
 * Get suppliers from DB
 */
app.get('/suppliers', (req, res)=>{
  //connectDB();
  connection.query('SELECT SupplierID, AccountID, SupplierTaxID, CompanyName, BillingAddressDetail, BillingCity, ' +
  'BillingPostalCode, BillingCountry, ShipFromAddressDetail, ShipFromCity, ShipFromPostalCode, ShipFromCountry, ' +
  'Telephone, Fax, Website FROM suppliers', (error, results, fields)=>{
    if (error) throw error;
    console.log('Db returned: ', results);
    //connection.end();
    res.send(results);
  });
});

app.get('/purchases/ytd/:start/:end', (req,res)=>{
  let headers = {
    'Content-type': 'application/x-www-form-urlencoded'
  };

  let options = {
    method: 'post',
    form: {
      username: 'feup',
      password: 'qualquer1',
      company: 'belaflor',
      instance: 'Default',
      grant_type: 'password',
      line: 'professional'
    },
    url: 'http://' + hostname + ':2018/WebApi/token',
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
      url: 'http://' + hostname + ':2018/WebApi/Administrador/Consulta',
      body: '"Select abs(TotalMerc), DataDoc FROM CabecCompras where DataDoc >= ' + '\'' + req.params.start + '\''  + ' AND DataDoc < ' + '\'' + req.params.end + '\''  + '"'
    };
  
    request(options2, (error2, results2)=> {
      if (error2) {
        console.log(error2);
      }
      let obj = results2;
      let obj2 = JSON.parse(results2.body);
      res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
      res.send(obj2);
    });
  });
});

/**
 * Get suppliers from DB
 */
app.get('/dashboard/suppliers', (req, res)=>{
  //connectDB();
  connection.query('SELECT Website, CompanyName, BillingAddressDetail FROM suppliers', (error, results, fields)=> {
    if (error) throw error;
    res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
    //connection.end();
    res.send(results);
  });
});

/**
 * Get purchases from Primavera WebApi
 */
app.get('/purchases/:start/:end', (req, res)=> {

  let options = {
    method: 'get',
    url: 'http://localhost:5000/dashboard/purchasestotal/'+req.params.start+'/'+req.params.end
  };
  request(options, (error, results)=> {
    if (error) {
      console.log(error);
    }
    let obj = JSON.parse(results.body);
    let purchasesTotal = obj.Column1;

    let options2 = {
      method: 'get',
      url: 'http://localhost:5000/dashboard/suppliers'
    };
    request(options2, (error2, results2)=> {
      if (error2) console.log(error2);
      let suppliers = JSON.parse(results2.body);

      let options3 = {
        method: 'get',
        url: 'http://localhost:5000/purchases/ytd/'+req.params.start+'/'+req.params.end
      };

      request(options3, (error3, results3)=> {
        if (error3) console.log(error3);
        let purchasesChart = JSON.parse(results3.body).DataSet.Table;

        let purchases = {
          'purchases': purchasesTotal,
          'suppliers': suppliers,
          'chartData': purchasesChart
        };
        res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
        res.set('Content-Type', 'application/json');
        res.send(JSON.stringify(purchases));
      });
    });
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));