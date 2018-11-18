import org.w3c.dom.Document;
import org.w3c.dom.NamedNodeMap;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

import javax.xml.XMLConstants;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.Source;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamSource;
import javax.xml.validation.Schema;
import javax.xml.validation.SchemaFactory;
import javax.xml.validation.Validator;
import java.io.File;
import java.io.IOException;
import java.sql.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Main {
    private static String user;
    private static String password;
    private static String dbName;
    private static String fileName;

    private static Connection conn;
    private static Document xmlDoc = null;

    public static void main(String[] args) {
        if (args.length != 4){
            System.out.println("Usage: Main <mysql username> <mysql password> <dbname> <SAF-T filename>");
            System.exit(1);
        }

        try { Class.forName("com.mysql.jdbc.Driver"); }
        catch(ClassNotFoundException ex) {
            System.err.println("Driver not found: " + ex.getMessage());
        }

        user = args[0];
        password = args[1];
        dbName = args[2];
        fileName = args[3];


        //validateXML();
        initDB();

        createHeader();
        createSalesInvoices();
        createSalesLines();
        createCustomers();
        createSuppliers();
        createProducts();
        createTransactionLines();
        createJournalTransactions();
        createJournals();
        createGeneralLedgerEntries();
        createGeneralLedgerAccounts();

        insertIntoHeader();
        insertIntoSalesInvoices();
        insertIntoSalesLines();
        insertIntoCustomers();
        insertIntoSuppliers();
        insertIntoProducts();
        insertIntoTransactionLines();
        insertIntoJournalTransactions();
        insertIntoJournals();
        insertIntoGeneralLedgerEntries();
        insertIntoGeneralLedgerAccounts();

        //getSales();
        //getSalesBy("CustomerID", "SOFRIO");
        //getSalesBy("ProductCode", "B0004");
        //getSalesBy("InvoiceNo", "FA 2016/1");
        //getCustomers();
        //getProducts();
    }

    public static String getTextContent(Node parentNode,String childName)
    {
        NodeList nlist = parentNode.getChildNodes();
        for (int i = 0 ; i < nlist.getLength() ; i++) {
            Node n = nlist.item(i);
            String name = n.getNodeName();
            if ( name != null && name.equals(childName) )
                return n.getTextContent();
        }
        return null;
    }

    public static void validateXML() {
        DocumentBuilderFactory parserFactory = DocumentBuilderFactory.newInstance();
        parserFactory.setNamespaceAware(true);

        DocumentBuilder parser = null;
        Document document = null;
        File file = null;

        try {
            parser = parserFactory.newDocumentBuilder();
        } catch (ParserConfigurationException e) {
            e.printStackTrace();
        }

        try {
            try {
                document = parser.parse(new File(fileName));
            } catch (SAXException e) {
                e.printStackTrace();
            }
        } catch (IOException e){
            e.printStackTrace();
        }


        // create a SchemaFactory capable of understanding WXS schemas
        SchemaFactory factory = SchemaFactory.newInstance("http://www.w3.org/XML/XMLSchema/v1.1");

        // load a WXS schema, represented by a Schema instance
        Source schemaFile = new StreamSource(new File("resources/SAFTPT1.04_01.xsd"));
        Schema schema = null;

        try {
            schema = factory.newSchema(schemaFile);
        } catch (SAXException e) {
            e.printStackTrace();
        }

        // create a Validator instance, which can be used to validate an instance document
        Validator validator = schema.newValidator();

        // validate the DOM tree
        try {
            try {
                validator.validate(new DOMSource(document));
            } catch (SAXException e) {
                e.printStackTrace();
            }
        } catch (IOException e){
            e.printStackTrace();
        }

        System.out.println("XML validated");

        /*
        File schemaFile = new File("resources/SAFTPT1.04_01.xsd");


        Source xmlFile = new StreamSource(new File(fileName));
        SchemaFactory schemaFactory = SchemaFactory
                .newInstance(XMLConstants.W3C_XML_SCHEMA_NS_URI);
        try {
            Schema schema = schemaFactory.newSchema(schemaFile);
            Validator validator = schema.newValidator();
            validator.validate(xmlFile);
            System.out.println(xmlFile.getSystemId() + " is valid");
        } catch (SAXException e) {
            System.out.println(xmlFile.getSystemId() + " is NOT valid reason:" + e);
        } catch (IOException e) {
            e.printStackTrace();
        }*/
    }

    public static void initDB() {
        String dbUrl = "jdbc:mysql://localhost/?useSSL=false";

        try {
            conn = DriverManager.getConnection(dbUrl, user, password);

            conn.createStatement().executeUpdate("CREATE DATABASE IF NOT EXISTS " + dbName + ";");
            conn.createStatement().executeUpdate("USE " + dbName + ";");

        } catch (SQLException e){
            e.printStackTrace();
            System.exit(1);
        }

        File file = new File(fileName);
        DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
        DocumentBuilder builder;

        try {
            builder = factory.newDocumentBuilder();
        } catch (ParserConfigurationException e) {
            e.printStackTrace();
            return;
        }

        try {
            xmlDoc = builder.parse(file);

        } catch (Exception e) {
            e.printStackTrace();
            System.exit(1);
        }
    }

    public static void createHeader() {
        try {
            conn.createStatement().execute("DROP TABLE IF EXISTS header;");

            conn.createStatement().execute(
                    "CREATE TABLE IF NOT EXISTS header (" +
                            "auditFileVersion VARCHAR(15), " +
                            "companyID VARCHAR(10), " +
                            "companyName VARCHAR(100), " +
                            "fiscalYear VARCHAR(4)" +
                            ");"
            );

        } catch (SQLException e){
            e.printStackTrace();
            System.exit(1);
        }
    }

    public static void insertIntoHeader() {
        PreparedStatement stmt;

        try {
            stmt = conn.prepareStatement("INSERT INTO header (" +
                    "auditFileVersion, companyID, companyName, fiscalYear)" +
                    " VALUES (?, ?, ?, ?);");

            NodeList nlist = xmlDoc.getElementsByTagName("Header");
            for (int i = 0 ; i < nlist.getLength() ; i++) {
                Node node = nlist.item(i);
                List<String> columns = Arrays
                        .asList(getTextContent(node, "AuditFileVersion"),
                                getTextContent(node, "CompanyID"),
                                getTextContent(node, "CompanyName"),
                                getTextContent(node, "FiscalYear"));
                for (int n = 0 ; n < columns.size() ; n++) {
                    stmt.setString(n+1, columns.get(n));
                }
                stmt.execute();
                stmt.clearBatch();
                stmt.clearParameters();
                stmt.cancel();
                stmt.close();
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public static void createSalesInvoices() {
        try {
            conn.createStatement().execute("DROP TABLE IF EXISTS salesInvoices;");

            conn.createStatement().execute(
                    "CREATE TABLE IF NOT EXISTS salesInvoices (" +
                            "InvoiceNo VARCHAR(15), " +
                            "ATCUD INTEGER, " +
                            "InvoiceStatus VARCHAR(2), " +
                            "InvoiceStatusDate DATETIME, " +
                            "DocStatusSourceID VARCHAR(15), " +
                            "SourceBilling VARCHAR(2), " +
                            "Period INTEGER, " +
                            "InvoiceDate DATE, " +
                            "SourceID VARCHAR(15), " +
                            "SystemEntryDate DATETIME, " +
                            "CustomerID VARCHAR(20), " +
                            "ShipToDeliveryDate DATE, " +
                            "ShipToAddress VARCHAR(30), " +
                            "ShipToCity VARCHAR(20), " +
                            "ShipToPostalCode VARCHAR(15), " +
                            "ShipToCountry VARCHAR(15), " +
                            "ShipFromDeliveryDate DATE, " +
                            "ShipFromAddress VARCHAR(30), " +
                            "ShipFromCity VARCHAR(20), " +
                            "ShipFromPostalCode VARCHAR(15), " +
                            "ShipFromCountry VARCHAR(15), " +
                            "MovementStartTime DATETIME, " +
                            "TaxPayable DOUBLE, " +
                            "NetTotal DOUBLE, " +
                            "GrossTotal DOUBLE ," +
                            "WithholdingTaxAmount DOUBLE " +
                            ");"
            );

        } catch (SQLException e){
            e.printStackTrace();
            System.exit(1);
        }
    }

    public static void insertIntoSalesInvoices() {
        PreparedStatement stmt;
        try {
            stmt = conn.prepareStatement("INSERT INTO salesInvoices (" +
                    "InvoiceNo, " +
                    "ATCUD, " +
                    "InvoiceStatus, " +
                    "InvoiceStatusDate, " +
                    "DocStatusSourceID, " +
                    "SourceBilling, " +
                    "Period, " +
                    "InvoiceDate, " +
                    "SourceID, " +
                    "SystemEntryDate, " +
                    "CustomerID, " +
                    "ShipToDeliveryDate, " +
                    "ShipToAddress, " +
                    "ShipToCity, " +
                    "ShipToPostalCode, " +
                    "ShipToCountry, " +
                    "ShipFromDeliveryDate, " +
                    "ShipFromAddress, " +
                    "ShipFromCity, " +
                    "ShipFromPostalCode, " +
                    "ShipFromCountry, " +
                    "MovementStartTime, " +
                    "TaxPayable, " +
                    "NetTotal, " +
                    "GrossTotal, " +
                    "WithholdingTaxAmount)" +
                    " VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);");

            NodeList nlist = xmlDoc.getElementsByTagName("Invoice");
            for (int i = 0 ; i < nlist.getLength() ; i++) {
                Node node = nlist.item(i);
                ArrayList<String> columns = new ArrayList<>(Arrays
                        .asList(getTextContent(node, "InvoiceNo"),
                                getTextContent(node, "ATCUD")
                        ));

                for (int j = 0; j < node.getChildNodes().getLength(); j++){
                    Node n = node.getChildNodes().item(j);

                    if (n.getNodeName().equals("DocumentStatus")){
                        columns.add(getTextContent(n, "InvoiceStatus"));
                        columns.add(getTextContent(n, "InvoiceStatusDate"));
                        columns.add(getTextContent(n, "DocStatusSourceID"));
                        columns.add(getTextContent(n, "SourceBilling"));
                        break;
                    }
                }

                columns.add(getTextContent(node, "Period"));
                columns.add(getTextContent(node, "InvoiceDate"));
                columns.add(getTextContent(node, "SourceID"));
                columns.add(getTextContent(node, "SystemEntryDate"));
                columns.add(getTextContent(node, "CustomerID"));

                int done = 0;
                for (int j = 0; j < node.getChildNodes().getLength(); j++){
                    Node n = node.getChildNodes().item(j);

                    if (done == 2) {
                        break;
                    }

                    if (n.getNodeName().equals("ShipTo") || n.getNodeName().equals("ShipFrom")){
                        columns.add(getTextContent(n, "DeliveryDate"));

                        for (int k = 0; k < n.getChildNodes().getLength(); k++) {
                            Node nn = n.getChildNodes().item(k);

                            if (nn.getNodeName().equals("Address")) {
                                columns.add(getTextContent(nn, "AddressDetail"));
                                columns.add(getTextContent(nn, "City"));
                                columns.add(getTextContent(nn, "PostalCode"));
                                columns.add(getTextContent(nn, "Country"));
                                done++;
                                break;
                            }
                        }
                    }
                }

                columns.add(getTextContent(node, "MovementStartTime"));

                for (int j = 0; j < node.getChildNodes().getLength(); j++){
                    Node n = node.getChildNodes().item(j);

                    if (n.getNodeName().equals("DocumentTotals")){
                        columns.add(getTextContent(n, "TaxPayable"));
                        columns.add(getTextContent(n, "NetTotal"));
                        columns.add(getTextContent(n, "GrossTotal"));
                    }

                    if (n.getNodeName().equals("WithholdingTax")) {
                        columns.add(getTextContent(n, "WithholdingTaxAmount"));
                    }
                }

                for (int n = 0 ; n < columns.size() ; n++) {
                    stmt.setString(n+1, columns.get(n));
                }
                stmt.clearWarnings();
                stmt.execute();
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public static void createSalesLines() {
        try {
            conn.createStatement().execute("DROP TABLE IF EXISTS salesLines;");

            conn.createStatement().execute(
                    "CREATE TABLE IF NOT EXISTS salesLines (" +
                            "InvoiceNo VARCHAR(20), " +
                            "LineNumber INTEGER, " +
                            "ProductCode VARCHAR(10), " +
                            "ProductDescription VARCHAR(60), " +
                            "Quantity INTEGER, " +
                            "UnitOfMeasure VARCHAR(10), " +
                            "UnitPrice DOUBLE, " +
                            "TaxPointDate DATE DEFAULT NULL, " +
                            "CreditAmount DOUBLE, " +
                            "SettlementAmount DOUBLE, " +
                            "TaxType VARCHAR(5), " +
                            "TaxCountryRegion VARCHAR(5), " +
                            "TaxCode VARCHAR(5), " +
                            "TaxPercentage DOUBLE" +
                            ");"
            );

        } catch (SQLException e){
            e.printStackTrace();
            System.exit(1);
        }
    }

    public static void insertIntoSalesLines() {
        PreparedStatement stmt;
        ArrayList<String> columns = null;
        try {
            stmt = conn.prepareStatement("INSERT INTO salesLines (" +
                    "InvoiceNo," +
                    "LineNumber," +
                    "ProductCode," +
                    "ProductDescription," +
                    "Quantity," +
                    "UnitOfMeasure," +
                    "UnitPrice," +
                    "TaxPointDate," +
                    "CreditAmount," +
                    "SettlementAmount," +
                    "TaxType," +
                    "TaxCountryRegion," +
                    "TaxCode," +
                    "TaxPercentage)" +
                    " VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);");

            NodeList nlist = xmlDoc.getElementsByTagName("Line");
            for (int i = 0 ; i < nlist.getLength() ; i++) {
                Node node = nlist.item(i);

                if (node.getParentNode().getParentNode().getNodeName().equals("SalesInvoices")) {
                    columns = new ArrayList<>(Arrays
                            .asList(getTextContent(node.getParentNode(), "InvoiceNo"),
                                    getTextContent(node, "LineNumber"),
                                    getTextContent(node, "ProductCode"),
                                    getTextContent(node, "ProductDescription"),
                                    getTextContent(node, "Quantity"),
                                    getTextContent(node, "UnitOfMeasure"),
                                    getTextContent(node, "UnitPrice"),
                                    getTextContent(node, "TaxPointDate"),
                                    getTextContent(node, "CreditAmount"),
                                    getTextContent(node, "SettlementAmount")
                            ));

                    for (int j = 0; j < node.getChildNodes().getLength(); j++){
                        Node n = node.getChildNodes().item(j);
                        if (n.getNodeName().equals("Tax")){
                            columns.add(getTextContent(n, "TaxType"));
                            columns.add(getTextContent(n, "TaxCountryRegion"));
                            columns.add(getTextContent(n, "TaxCode"));
                            columns.add(getTextContent(n, "TaxPercentage"));
                            break;
                        }

                    }

                    for (int n = 0 ; n < columns.size() ; n++) {
                        stmt.setString(n+1, columns.get(n));
                    }
                    stmt.clearWarnings();
                    stmt.execute();
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();

            System.err.println(columns);
        }
    }

    public static void createCustomers() {
        try {
            conn.createStatement().execute("DROP TABLE IF EXISTS customers;");

            conn.createStatement().execute(
                    "CREATE TABLE IF NOT EXISTS customers (" +
                            "CustomerID VARCHAR(20), " +
                            "AccountID VARCHAR(15), " +
                            "CustomerTaxID VARCHAR(15), " +
                            "CompanyName VARCHAR(200), " +
                            "BillingAddressDetail VARCHAR(60)DEFAULT NULL, " +
                            "BillingCity VARCHAR(30) DEFAULT NULL, " +
                            "BillingPostalCode VARCHAR(15) DEFAULT NULL, " +
                            "BillingCountry VARCHAR(15) DEFAULT NULL, " +
                            "ShipToAddressDetail VARCHAR(60) DEFAULT NULL, " +
                            "ShipToCity VARCHAR(30) DEFAULT NULL, " +
                            "ShipToPostalCode VARCHAR(15) DEFAULT NULL, " +
                            "ShipToCountry VARCHAR(15) DEFAULT NULL, " +
                            "Telephone VARCHAR(20) DEFAULT NULL, " +
                            "Fax VARCHAR(20) DEFAULT NULL, " +
                            "Email VARCHAR(30) DEFAULT NULL, " +
                            "Website VARCHAR(30) DEFAULT NULL, " +
                            "SelfBillingIndicator INTEGER DEFAULT NULL" +
                            ");"
            );

        } catch (SQLException e){
            e.printStackTrace();
            System.exit(1);
        }
    }

    public static void insertIntoCustomers() {
        PreparedStatement stmt;
        try {
            stmt = conn.prepareStatement("INSERT INTO customers (" +
                    "CustomerID," +
                    "AccountID," +
                    "CustomerTaxID," +
                    "CompanyName," +
                    "BillingAddressDetail," +
                    "BillingCity," +
                    "BillingPostalCode," +
                    "BillingCountry," +
                    /*"ShipToAddressDetail," +
                    "ShipToCity," +
                    "ShipToPostalCode," +
                    "ShipToCountry," +*/
                    "Telephone," +
                    "Fax," +
                    "Email," +
                    "Website," +
                    "SelfBillingIndicator) " +
                    "VALUES (?, ?, ?, ?, ?, ?, ?, /*?, ?, ?, ?, */?, ?, ?, ?, ?, ?);");

            NodeList nlist = xmlDoc.getElementsByTagName("Customer");
            for (int i = 0 ; i < nlist.getLength() ; i++) {
                Node node = nlist.item(i);
                ArrayList<String> columns = new ArrayList<>(Arrays
                        .asList(getTextContent(node, "CustomerID"),
                                getTextContent(node, "AccountID"),
                                getTextContent(node, "CustomerTaxID"),
                                getTextContent(node, "CompanyName")
                        ));

                int done = 0;
                for (int j = 0; j < node.getChildNodes().getLength(); j++){
                    if (done == 2) {
                        break;
                    }

                    Node n = node.getChildNodes().item(j);
                    if (n.getNodeName().equals("BillingAddress") || n.getNodeName().equals("ShipToAddress")){
                        columns.add(getTextContent(n, "AddressDetail"));
                        columns.add(getTextContent(n, "City"));
                        columns.add(getTextContent(n, "PostalCode"));
                        columns.add(getTextContent(n, "Country"));
                        done++;
                    }
                }

                columns.add(getTextContent(node, "Telephone"));
                columns.add(getTextContent(node, "Fax"));
                columns.add(getTextContent(node, "Email"));
                columns.add(getTextContent(node, "Website"));
                columns.add(getTextContent(node, "SelfBillingIndicator"));

                for (int n = 0 ; n < columns.size() ; n++) {
                    stmt.setString(n+1, columns.get(n));
                }
                stmt.clearWarnings();
                stmt.execute();
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public static void createSuppliers() {
        try {
            conn.createStatement().execute("DROP TABLE IF EXISTS suppliers;");

            conn.createStatement().execute(
                    "CREATE TABLE IF NOT EXISTS suppliers (" +
                            "SupplierID VARCHAR(20), " +
                            "AccountID VARCHAR(15), " +
                            "SupplierTaxID VARCHAR(15), " +
                            "CompanyName VARCHAR(60), " +
                            "BillingAddressDetail VARCHAR(60), " +
                            "BillingCity VARCHAR(60), " +
                            "BillingPostalCode VARCHAR(15), " +
                            "BillingCountry VARCHAR(15), " +
                            "ShipFromAddressDetail VARCHAR(60), " +
                            "ShipFromCity VARCHAR(30), " +
                            "ShipFromPostalCode VARCHAR(15), " +
                            "ShipFromCountry VARCHAR(15), " +
                            "Telephone VARCHAR(20) DEFAULT NULL, " +
                            "Fax VARCHAR(20) DEFAULT NULL, " +
                            "Email VARCHAR(30) DEFAULT NULL, " +
                            "Website VARCHAR(30) DEFAULT NULL, " +
                            "SelfBillingIndicator INTEGER DEFAULT NULL" +
                            ");"
            );

        } catch (SQLException e){
            e.printStackTrace();
            System.exit(1);
        }
    }

    public static void insertIntoSuppliers() {
        PreparedStatement stmt;
        try {
            stmt = conn.prepareStatement("INSERT INTO suppliers (" +
                    "SupplierID," +
                    "AccountID," +
                    "SupplierTaxID," +
                    "CompanyName," +
                    "BillingAddressDetail," +
                    "BillingCity," +
                    "BillingPostalCode," +
                    "BillingCountry," +
                    /*"ShipFromAddressDetail," +
                    "ShipFromCity," +
                    "ShipFromPostalCode," +
                    "ShipFromCountry," +*/
                    "Telephone," +
                    "Fax," +
                    "Email," +
                    "Website," +
                    "SelfBillingIndicator) " +
                    "VALUES (?, ?, ?, ?, ?, ?, ?, ?, /*?, ?, ?, ?, */?, ?, ?, ?, ?);");

            NodeList nlist = xmlDoc.getElementsByTagName("Supplier");
            for (int i = 0 ; i < nlist.getLength() ; i++) {
                Node node = nlist.item(i);
                ArrayList<String> columns = new ArrayList<>(Arrays
                        .asList(getTextContent(node, "SupplierID"),
                                getTextContent(node, "AccountID"),
                                getTextContent(node, "SupplierTaxID"),
                                getTextContent(node, "CompanyName")
                        ));

                int done = 0;
                for (int j = 0; j < node.getChildNodes().getLength(); j++){
                    if (done == 2) {
                        break;
                    }

                    Node n = node.getChildNodes().item(j);
                    if (n.getNodeName().equals("BillingAddress") || n.getNodeName().equals("ShipFromAddress")){
                        columns.add(getTextContent(n, "AddressDetail"));
                        columns.add(getTextContent(n, "City"));
                        columns.add(getTextContent(n, "PostalCode"));
                        columns.add(getTextContent(n, "Country"));
                        done++;
                    }
                }

                columns.add(getTextContent(node, "Telephone"));
                columns.add(getTextContent(node, "Fax"));
                columns.add(getTextContent(node, "Email"));
                columns.add(getTextContent(node, "Website"));
                columns.add(getTextContent(node, "SelfBillingIndicator"));

                for (int n = 0 ; n < columns.size() ; n++) {
                    stmt.setString(n+1, columns.get(n));
                }
                stmt.clearWarnings();
                stmt.execute();
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public static void createProducts() {
        try {
            conn.createStatement().execute("DROP TABLE IF EXISTS products;");

            conn.createStatement().execute(
                    "CREATE TABLE IF NOT EXISTS products (" +
                            "ProductType VARCHAR(5), " +
                            "ProductCode VARCHAR(45), " +
                            "ProductGroup VARCHAR(30), " +
                            "ProductDescription VARCHAR(60), " +
                            "ProductNumberCode VARCHAR(30) " +
                            ");"
            );

        } catch (SQLException e){
            e.printStackTrace();
            System.exit(1);
        }
    }

    public static void insertIntoProducts() {
        PreparedStatement stmt;
        try {
            stmt = conn.prepareStatement("INSERT INTO products (" +
                    "ProductType," +
                    "ProductCode," +
                    "ProductGroup," +
                    "ProductDescription," +
                    "ProductNumberCode)" +
                    " VALUES (?, ?, ?, ?, ?);");

            NodeList nlist = xmlDoc.getElementsByTagName("Product");
            for (int i = 0 ; i < nlist.getLength() ; i++) {
                Node node = nlist.item(i);
                ArrayList<String> columns = new ArrayList<>(Arrays
                        .asList(getTextContent(node, "ProductType"),
                                getTextContent(node, "ProductCode"),
                                getTextContent(node, "ProductGroup"),
                                getTextContent(node, "ProductDescription"),
                                getTextContent(node, "ProductNumberCode")
                        ));

                for (int n = 0 ; n < columns.size() ; n++) {
                    stmt.setString(n+1, columns.get(n));
                }
                stmt.clearWarnings();
                stmt.execute();
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public static void createTransactionLines() {
        try {
            conn.createStatement().execute("DROP TABLE IF EXISTS transactionLines;");

            conn.createStatement().execute(
                    "CREATE TABLE IF NOT EXISTS transactionLines (" +
                            "TransactionID VARCHAR(30), " +
                            "TransactionType VARCHAR(6), " +
                            "RecordID INTEGER , " +
                            "AccountID VARCHAR(45), " +
                            "SourceDocumentID VARCHAR(20), " +
                            "SystemEntryDate DATETIME, " +
                            "Description VARCHAR(60), " +
                            "Amount FLOAT " +
                            ");"
            );

        } catch (SQLException e){
            e.printStackTrace();
            System.exit(1);
        }
    }

    public static void insertIntoTransactionLines() {
        PreparedStatement stmt;
        ArrayList<String> columns = null;
        try {
            stmt = conn.prepareStatement("INSERT INTO transactionLines (" +
                    "TransactionID," +
                    "TransactionType," +
                    "RecordID," +
                    "AccountID," +
                    "SourceDocumentID," +
                    "SystemEntryDate," +
                    "Description," +
                    "Amount)" +
                    " VALUES (?, ?, ?, ?, ?, ?, ?, ?);");

            NodeList nlist = xmlDoc.getElementsByTagName("Lines");
            for (int i = 0 ; i < nlist.getLength() ; i++) {
                Node node = nlist.item(i);

                if (node.getParentNode().getParentNode().getParentNode().getNodeName().equals("GeneralLedgerEntries")) {

                    String d1 = node.getNodeName();
                    String d2 = node.getParentNode().getNodeName();
                    NodeList nl = node.getChildNodes();

                    NodeList LinesList = node.getChildNodes();
                    for (int j = 0; j < LinesList.getLength(); j++) {
                        Node n = LinesList.item(j);
                        String transactionType = "";

                        if (n.getNodeName().equals("CreditLine")) {
                            transactionType = "Credit";
                        }
                        else if (n.getNodeName().equals("DebitLine")) {
                            transactionType = "Debit";
                        }

                        if (!transactionType.equals("")) {
                            columns = new ArrayList<>(Arrays
                                    .asList(getTextContent(node.getParentNode(), "TransactionID"),
                                            transactionType,
                                            getTextContent(n, "RecordID"),
                                            getTextContent(n, "AccountID"),
                                            getTextContent(n, "SourceDocumentID"),
                                            getTextContent(n, "SystemEntryDate"),
                                            getTextContent(n, "Description"),
                                            getTextContent(n, "Amount")
                                    ));

                            for (int k = 0 ; k < columns.size() ; k++) {
                                stmt.setString(k+1, columns.get(k));
                            }
                            stmt.clearWarnings();
                            stmt.execute();
                        }
                    }
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();

            System.err.println(columns);
        }

    }

    public static void createJournalTransactions() {
        try {
            conn.createStatement().execute("DROP TABLE IF EXISTS journalTransactions;");

            conn.createStatement().execute(
                    "CREATE TABLE IF NOT EXISTS journalTransactions (" +
                            "JournalID VARCHAR(10), " +
                            "TransactionID VARCHAR(30), " +
                            "Period INTEGER , " +
                            "TransactionDate DATE , " +
                            "SourceID VARCHAR(30), " +
                            "Description VARCHAR(60), " +
                            "DocArchivalNumber VARCHAR(10) , " +
                            "TransactionType VARCHAR(5), " +
                            "GLPostingDate DATE " +
                            ");"
            );

        } catch (SQLException e){
            e.printStackTrace();
            System.exit(1);
        }

    }

    public static void insertIntoJournalTransactions() {
        PreparedStatement stmt;
        ArrayList<String> columns = null;
        try {
            stmt = conn.prepareStatement("INSERT INTO journalTransactions (" +
                    "JournalID," +
                    "TransactionID," +
                    "Period," +
                    "TransactionDate," +
                    "SourceID," +
                    "Description," +
                    "DocArchivalNumber," +
                    "TransactionType," +
                    "GLPostingDate)" +
                    " VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);");

            NodeList nlist = xmlDoc.getElementsByTagName("Transaction");

            for (int i = 0 ; i < nlist.getLength() ; i++) {
                Node node = nlist.item(i);

                if (node.getParentNode().getParentNode().getNodeName().equals("GeneralLedgerEntries")) {
                    columns = new ArrayList<>(Arrays
                            .asList(getTextContent(node.getParentNode(), "JournalID"),
                                    getTextContent(node, "TransactionID"),
                                    getTextContent(node, "Period"),
                                    getTextContent(node, "TransactionDate"),
                                    getTextContent(node, "SourceID"),
                                    getTextContent(node, "Description"),
                                    getTextContent(node, "DocArchivalNumber"),
                                    getTextContent(node, "TransactionType"),
                                    getTextContent(node, "GLPostingDate")
                            ));

                    for (int n = 0 ; n < columns.size() ; n++) {
                        stmt.setString(n+1, columns.get(n));
                    }
                    stmt.clearWarnings();
                    stmt.execute();
                }

            }
        } catch (SQLException e) {
            e.printStackTrace();

            System.err.println(columns);
        }

    }

    public static void createJournals() {
        try {
            conn.createStatement().execute("DROP TABLE IF EXISTS journals;");

            conn.createStatement().execute(
                    "CREATE TABLE IF NOT EXISTS journals (" +
                            "JournalID VARCHAR(10), " +
                            "Description VARCHAR(30) " +
                            ");"
            );

        } catch (SQLException e){
            e.printStackTrace();
            System.exit(1);
        }

    }

    public static void insertIntoJournals() {
        PreparedStatement stmt;
        ArrayList<String> columns = null;
        try {
            stmt = conn.prepareStatement("INSERT INTO journals (" +
                    "JournalID," +
                    "Description)" +
                    " VALUES (?, ?);");

            NodeList nlist = xmlDoc.getElementsByTagName("Journal");

            for (int i = 0 ; i < nlist.getLength() ; i++) {
                Node node = nlist.item(i);

                if (node.getParentNode().getNodeName().equals("GeneralLedgerEntries")) {
                    columns = new ArrayList<>(Arrays
                            .asList(getTextContent(node, "JournalID"),
                                    getTextContent(node, "Description")
                            ));

                    for (int n = 0 ; n < columns.size() ; n++) {
                        stmt.setString(n+1, columns.get(n));
                    }
                    stmt.clearWarnings();
                    stmt.execute();
                }

            }
        } catch (SQLException e) {
            e.printStackTrace();

            System.err.println(columns);
        }

    }

    public static void createGeneralLedgerEntries() {
        try {
            conn.createStatement().execute("DROP TABLE IF EXISTS generalLedgerEntries;");

            conn.createStatement().execute(
                    "CREATE TABLE IF NOT EXISTS generalLedgerEntries (" +
                            "NumberOfEntries INTEGER , " +
                            "TotalDebit FLOAT , " +
                            "TotalCredit FLOAT " +
                            ");"
            );

        } catch (SQLException e){
            e.printStackTrace();
            System.exit(1);
        }

    }

    public static void insertIntoGeneralLedgerEntries() {
        PreparedStatement stmt;
        ArrayList<String> columns = null;
        try {
            stmt = conn.prepareStatement("INSERT INTO generalLedgerEntries (" +
                    "NumberOfEntries," +
                    "TotalDebit," +
                    "TotalCredit)" +
                    " VALUES (?, ?, ?);");

            NodeList nlist = xmlDoc.getElementsByTagName("GeneralLedgerEntries");

            for (int i = 0 ; i < nlist.getLength() ; i++) {
                Node node = nlist.item(i);

                columns = new ArrayList<>(Arrays
                        .asList(getTextContent(node, "NumberOfEntries"),
                                getTextContent(node, "TotalDebit"),
                                getTextContent(node, "TotalCredit")
                        ));

                for (int n = 0 ; n < columns.size() ; n++) {
                    stmt.setString(n+1, columns.get(n));
                }
                stmt.clearWarnings();
                stmt.execute();
            }

        } catch (SQLException e) {
            e.printStackTrace();

            System.err.println(columns);
        }

    }

    public static void createGeneralLedgerAccounts() {
        try {
            conn.createStatement().execute("DROP TABLE IF EXISTS generalLedgerAccounts;");

            conn.createStatement().execute(
                    "CREATE TABLE IF NOT EXISTS generalLedgerAccounts (" +
                            "AccountID VARCHAR(15) , " +
                            "AccountDescription VARCHAR(40) , " +
                            "OpeningDebitBalance FLOAT , " +
                            "OpeningCreditBalance FLOAT , " +
                            "ClosingDebitBalance FLOAT , " +
                            "ClosingCreditBalance FLOAT , " +
                            "GroupingCategory VARCHAR(10) , " +
                            "GroupingCode VARCHAR(10), " +
                            "TaxonomyCode VARCHAR(5) DEFAULT NULL " +
                            ");"
            );

        } catch (SQLException e){
            e.printStackTrace();
            System.exit(1);
        }

    }

    public static void insertIntoGeneralLedgerAccounts() {
        PreparedStatement stmt;
        ArrayList<String> columns = null;
        try {
            stmt = conn.prepareStatement("INSERT INTO generalLedgerAccounts (" +
                    "AccountID," +
                    "AccountDescription," +
                    "OpeningDebitBalance," +
                    "OpeningCreditBalance," +
                    "ClosingDebitBalance," +
                    "ClosingCreditBalance," +
                    "GroupingCategory," +
                    "GroupingCode," +
                    "TaxonomyCode )" +
                    " VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);");

            NodeList nlist = xmlDoc.getElementsByTagName("Account");

            for (int i = 0 ; i < nlist.getLength() ; i++) {
                Node node = nlist.item(i);

                if (node.getParentNode().getNodeName().equals("GeneralLedgerAccounts")) {
                    columns = new ArrayList<>(Arrays
                            .asList(getTextContent(node, "AccountID"),
                                    getTextContent(node, "AccountDescription"),
                                    getTextContent(node, "OpeningDebitBalance"),
                                    getTextContent(node, "OpeningCreditBalance"),
                                    getTextContent(node, "ClosingDebitBalance"),
                                    getTextContent(node, "ClosingCreditBalance"),
                                    getTextContent(node, "GroupingCategory"),
                                    getTextContent(node, "GroupingCode"),
                                    getTextContent(node, "TaxonomyCode")
                            ));

                    for (int n = 0 ; n < columns.size() ; n++) {
                        stmt.setString(n+1, columns.get(n));
                    }
                    stmt.clearWarnings();
                    stmt.execute();
                }
            }

        } catch (SQLException e) {
            e.printStackTrace();

            System.err.println(columns);
        }

    }

    /** Interoperability (access functions) */

    public static void getSales(){
        try {
            ResultSet rs = conn.createStatement().executeQuery("SELECT " +
                    "salesInvoices.InvoiceNo, salesLines.ProductCode, CustomerID, salesLines.Quantity, " +
                    "InvoiceDate, SystemEntryDate, salesLines.UnitPrice, salesLines.CreditAmount " +
                    "FROM " +
                    "salesInvoices " +
                    "INNER JOIN " +
                    "salesLines " +
                    "ON " +
                    "salesInvoices.InvoiceNo = salesLines.InvoiceNo;");

            printQuery(rs);

        } catch (SQLException e){
            e.printStackTrace();
            System.exit(1);
        }
    }

    /**
     *
     * @param field Can be one of: "CustomerID", "ProductCode", "InvoiceNo"
     * @param value
     */
    public static void getSalesBy(String field, String value){
        try {
            if (!field.equals("CustomerID") &&
                    !field.equals("ProductCode") &&
                    !field.equals("InvoiceNo")){
                System.err.println("Invalid field: " + field);
                System.exit(1);
            }

            if (field.equals("InvoiceNo")) {
                field = "salesInvoices.InvoiceNo";
            }

            String condition = "WHERE " + field + " = \"" + value + "\";";

            ResultSet rs = conn.createStatement().executeQuery("SELECT " +
                    "salesInvoices.InvoiceNo, salesLines.ProductCode, CustomerID, salesLines.Quantity, " +
                    "InvoiceDate, SystemEntryDate, salesLines.UnitPrice, salesLines.CreditAmount " +
                    "FROM " +
                    "salesInvoices " +
                    "INNER JOIN " +
                    "salesLines " +
                    "ON " +
                    "salesInvoices.InvoiceNo = salesLines.InvoiceNo " +
                    condition);

            printQuery(rs);

        } catch (SQLException e){
            e.printStackTrace();
            System.exit(1);
        }
    }

    public static void getCustomers() {
        try {
            ResultSet rs = conn.createStatement().executeQuery("SELECT " +
                    "CustomerID, AccountID, CompanyName, AddressDetail, City, Telephone " +
                    "FROM " +
                    "customers;");

            printQuery(rs);

        } catch (SQLException e){
            e.printStackTrace();
            System.exit(1);
        }
    }

    public static void getProducts() {
        try {
            ResultSet rs = conn.createStatement().executeQuery("SELECT * FROM products;");

            printQuery(rs);

        } catch (SQLException e){
            e.printStackTrace();
            System.exit(1);
        }
    }

    public static void printQuery(ResultSet rs) throws SQLException {
        System.out.println("=============================================================================");

        while (rs.next()) {
            int numColumns = rs.getMetaData().getColumnCount();

            for (int i = 1; i <= numColumns; i++){
                System.out.print(rs.getObject(i) + "  ");
            }
            System.out.println();
        }

        System.out.println("=============================================================================");
    }
}