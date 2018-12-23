-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: 23-Dez-2018 às 21:21
-- Versão do servidor: 5.7.23
-- versão do PHP: 7.2.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sinfdemo`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `customers`
--

DROP TABLE IF EXISTS `customers`;
CREATE TABLE IF NOT EXISTS `customers` (
  `CustomerID` varchar(20) DEFAULT NULL,
  `AccountID` varchar(15) DEFAULT NULL,
  `CustomerTaxID` varchar(15) DEFAULT NULL,
  `CompanyName` varchar(60) DEFAULT NULL,
  `BillingAddressDetail` varchar(60) DEFAULT NULL,
  `BillingCity` varchar(30) DEFAULT NULL,
  `BillingPostalCode` varchar(15) DEFAULT NULL,
  `BillingCountry` varchar(15) DEFAULT NULL,
  `ShipToAddressDetail` varchar(60) DEFAULT NULL,
  `ShipToCity` varchar(30) DEFAULT NULL,
  `ShipToPostalCode` varchar(15) DEFAULT NULL,
  `ShipToCountry` varchar(15) DEFAULT NULL,
  `Telephone` varchar(20) DEFAULT NULL,
  `Fax` varchar(20) DEFAULT NULL,
  `Email` varchar(30) DEFAULT NULL,
  `Website` varchar(30) DEFAULT NULL,
  `SelfBillingIndicator` int(11) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `customers`
--

INSERT INTO `customers` (`CustomerID`, `AccountID`, `CustomerTaxID`, `CompanyName`, `BillingAddressDetail`, `BillingCity`, `BillingPostalCode`, `BillingCountry`, `ShipToAddressDetail`, `ShipToCity`, `ShipToPostalCode`, `ShipToCountry`, `Telephone`, `Fax`, `Email`, `Website`, `SelfBillingIndicator`) VALUES
('Consumidor final', 'Desconhecido', '999999990', 'Consumidor final', 'Desconhecido', 'Desconhecido', 'Desconhecido', 'Desconhecido', 'Desconhecido', 'Desconhecido', 'Desconhecido', 'Desconhecido', NULL, NULL, NULL, NULL, 0),
('PT513076549_C', '2111122', '513076549', 'XYZ Lda', 'Rua A', 'Porto', '4000-000', 'PT', 'Rua A', 'Porto', '4000-000', 'PT', NULL, NULL, NULL, NULL, 0);

-- --------------------------------------------------------

--
-- Estrutura da tabela `generalledgeraccounts`
--

DROP TABLE IF EXISTS `generalledgeraccounts`;
CREATE TABLE IF NOT EXISTS `generalledgeraccounts` (
  `AccountID` varchar(15) DEFAULT NULL,
  `AccountDescription` varchar(40) DEFAULT NULL,
  `OpeningDebitBalance` float DEFAULT NULL,
  `OpeningCreditBalance` float DEFAULT NULL,
  `ClosingDebitBalance` float DEFAULT NULL,
  `ClosingCreditBalance` float DEFAULT NULL,
  `GroupingCategory` varchar(10) DEFAULT NULL,
  `GroupingCode` varchar(10) DEFAULT NULL,
  `TaxonomyCode` varchar(5) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `generalledgeraccounts`
--

INSERT INTO `generalledgeraccounts` (`AccountID`, `AccountDescription`, `OpeningDebitBalance`, `OpeningCreditBalance`, `ClosingDebitBalance`, `ClosingCreditBalance`, `GroupingCategory`, `GroupingCode`, `TaxonomyCode`) VALUES
('21', 'Clientes', 0, 0, 4730.72, 0, 'GR', NULL, NULL),
('211', 'Clientes c/c', 0, 0, 4730.72, 0, 'GA', '21', NULL),
('2111', 'Clientes gerais', 0, 0, 4730.72, 0, 'GA', '211', NULL),
('21111', 'Clientes - gr - mercado nacional', 0, 0, 4730.72, 0, 'GA', '2111', NULL),
('2111122', 'XYZ Lda', 0, 0, 1435.45, 0, 'GM', '21111', ''),
('2111123', 'TRO, Lda', 0, 0, 1867.19, 0, 'GM', '21111', ''),
('2111124', 'ZWM LDA', 0, 0, 1428.08, 0, 'GM', '21111', ''),
('22', 'Fornecedores', 0, 0, 0, 2174.76, 'GR', NULL, NULL),
('221', 'Fornecedores c/c', 0, 0, 0, 2174.76, 'GA', '22', NULL),
('2211', 'Fornecedores gerais', 0, 0, 0, 2174.76, 'GA', '221', NULL),
('22111', 'Fornecedores - gr - mercado nacional', 0, 0, 0, 2174.76, 'GA', '2211', NULL),
('221111', 'ABC Lda', 0, 0, 0, 858.25, 'GM', '22111', ''),
('221112', 'XYZ S.A.', 0, 0, 0, 1316.51, 'GM', '22111', ''),
('24', 'Estado e outros entes públicos', 0, 0, 0, 478.03, 'GR', NULL, NULL),
('243', 'Imposto sobre o valor acrescentado (IVA)', 0, 0, 0, 478.03, 'GA', '24', NULL),
('2432', 'Iva - Dedutível', 0, 0, 406.69, 0, 'GA', '243', NULL),
('24321', 'Existências', 0, 0, 406.69, 0, 'GA', '2432', NULL),
('243211', 'Existências Continente', 0, 0, 406.69, 0, 'GA', '24321', NULL),
('2432113', 'Ex. - Taxa Normal', 0, 0, 406.69, 0, 'GA', '243211', NULL),
('243211323', 'Ex. - Taxa Normal-Tx.23%', 0, 0, 406.69, 0, 'GA', '2432113', NULL),
('2432113231', 'Ex. Tx. Nm. - Mercado Nacional', 0, 0, 406.69, 0, 'GA', '243211323', NULL),
('24321132311', 'Ex. Tx. Nm..- MN-TT/Dedutível', 0, 0, 406.69, 0, 'GM', '2432113231', ''),
('2433', 'Iva - Liquidado', 0, 0, 0, 884.72, 'GA', '243', NULL),
('24331', 'Operacoes Gerais', 0, 0, 0, 884.72, 'GA', '2433', NULL),
('243311', 'Iva Liq. - Vendas', 0, 0, 0, 884.72, 'GA', '24331', NULL),
('2433111', 'Iva Liq. - Vendas-Continente', 0, 0, 0, 884.72, 'GA', '243311', NULL),
('24331113', 'Iva Liq. - Taxa Normal', 0, 0, 0, 884.72, 'GA', '2433111', NULL),
('2433111323', 'Iva Liq. - Taxa Normal-Tx.23%', 0, 0, 0, 884.72, 'GA', '24331113', NULL),
('24331113231', 'Iva Liq.- Tx. Nm.- Mercado Nacional', 0, 0, 0, 884.72, 'GM', '2433111323', ''),
('31', 'Compras', 0, 0, 1768.07, 0, 'GR', NULL, NULL),
('311', 'Mercadorias', 0, 0, 1768.07, 0, 'GA', '31', NULL),
('3111', 'Compras-merc-mercado nacional', 0, 0, 1768.07, 0, 'GM', '311', ''),
('71', 'Vendas', 0, 0, 0, 3846, 'GR', NULL, NULL),
('711', 'Mercadorias', 0, 0, 0, 3846, 'GA', '71', NULL),
('7111', 'Vendas-merc.-mercado nacional', 0, 0, 0, 3846, 'GM', '711', '');

-- --------------------------------------------------------

--
-- Estrutura da tabela `generalledgerentries`
--

DROP TABLE IF EXISTS `generalledgerentries`;
CREATE TABLE IF NOT EXISTS `generalledgerentries` (
  `NumberOfEntries` int(11) DEFAULT NULL,
  `TotalDebit` float DEFAULT NULL,
  `TotalCredit` float DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `generalledgerentries`
--

INSERT INTO `generalledgerentries` (`NumberOfEntries`, `TotalDebit`, `TotalCredit`) VALUES
(59, 6905.48, 6905.48);

-- --------------------------------------------------------

--
-- Estrutura da tabela `header`
--

DROP TABLE IF EXISTS `header`;
CREATE TABLE IF NOT EXISTS `header` (
  `auditFileVersion` varchar(15) DEFAULT NULL,
  `companyID` varchar(10) DEFAULT NULL,
  `companyName` varchar(60) DEFAULT NULL,
  `fiscalYear` varchar(4) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `header`
--

INSERT INTO `header` (`auditFileVersion`, `companyID`, `companyName`, `fiscalYear`) VALUES
('1.04_01', '513076549', 'Empresa BELAFLOR', '2019');

-- --------------------------------------------------------

--
-- Estrutura da tabela `journals`
--

DROP TABLE IF EXISTS `journals`;
CREATE TABLE IF NOT EXISTS `journals` (
  `JournalID` varchar(10) DEFAULT NULL,
  `Description` varchar(30) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `journals`
--

INSERT INTO `journals` (`JournalID`, `Description`) VALUES
('00041', 'Compras - MN'),
('00051', 'Vendas - Crédito - MN');

-- --------------------------------------------------------

--
-- Estrutura da tabela `journaltransactions`
--

DROP TABLE IF EXISTS `journaltransactions`;
CREATE TABLE IF NOT EXISTS `journaltransactions` (
  `JournalID` varchar(10) DEFAULT NULL,
  `TransactionID` varchar(30) DEFAULT NULL,
  `Period` int(11) DEFAULT NULL,
  `TransactionDate` date DEFAULT NULL,
  `SourceID` varchar(30) DEFAULT NULL,
  `Description` varchar(30) DEFAULT NULL,
  `DocArchivalNumber` varchar(10) DEFAULT NULL,
  `TransactionType` varchar(5) DEFAULT NULL,
  `GLPostingDate` date DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `journaltransactions`
--

INSERT INTO `journaltransactions` (`JournalID`, `TransactionID`, `Period`, `TransactionDate`, `SourceID`, `Description`, `DocArchivalNumber`, `TransactionType`, `GLPostingDate`) VALUES
('00041', '2019-01-01 00041 10001', 1, '2019-01-01', 'FEUP', 'VFA Nº 4/A', '10001', 'N', '2018-12-14'),
('00041', '2019-01-14 00041 10002', 1, '2019-01-14', 'FEUP', 'VFA Nº 6/A', '10002', 'N', '2018-12-14'),
('00041', '2019-01-15 00041 10003', 1, '2019-01-15', 'FEUP', 'VFA Nº 7/A', '10003', 'N', '2018-12-15'),
('00041', '2019-01-15 00041 10004', 1, '2019-01-15', 'FEUP', 'VFA Nº 8/A', '10004', 'N', '2018-12-15'),
('00041', '2019-02-10 00041 20001', 2, '2019-02-10', 'FEUP', 'VFA Nº 9/A', '20001', 'N', '2018-12-15'),
('00041', '2019-03-01 00041 30001', 3, '2019-03-01', 'FEUP', 'VFA Nº 10/A', '30001', 'N', '2018-12-15'),
('00041', '2019-03-15 00041 30002', 3, '2019-03-15', 'FEUP', 'VFA Nº 11/A', '30002', 'N', '2018-12-15'),
('00041', '2019-04-01 00041 40001', 4, '2019-04-01', 'FEUP', 'VFA Nº 12/A', '40001', 'N', '2018-12-15'),
('00041', '2019-04-20 00041 40002', 4, '2019-04-20', 'FEUP', 'VFA Nº 13/A', '40002', 'N', '2018-12-15'),
('00041', '2019-05-05 00041 50001', 5, '2019-05-05', 'FEUP', 'VFA Nº 14/A', '50001', 'N', '2018-12-15'),
('00041', '2019-05-15 00041 50002', 5, '2019-05-15', 'FEUP', 'VFA Nº 15/A', '50002', 'N', '2018-12-15'),
('00041', '2019-07-05 00041 70001', 7, '2019-07-05', 'FEUP', 'VFA Nº 16/A', '70001', 'N', '2018-12-15'),
('00041', '2019-09-15 00041 90001', 9, '2019-09-15', 'FEUP', 'VFA Nº 17/A', '90001', 'N', '2018-12-15'),
('00041', '2019-09-20 00041 90002', 9, '2019-09-20', 'FEUP', 'VFA Nº 18/A', '90002', 'N', '2018-12-15'),
('00041', '2019-10-05 00041 100001', 10, '2019-10-05', 'FEUP', 'VFA Nº 19/A', '100001', 'N', '2018-12-15'),
('00041', '2019-10-20 00041 100002', 10, '2019-10-20', 'FEUP', 'VFA Nº 20/A', '100002', 'N', '2018-12-15'),
('00041', '2019-11-15 00041 110001', 11, '2019-11-15', 'FEUP', 'VFA Nº 21/A', '110001', 'N', '2018-12-15'),
('00051', '2019-01-16 00051 10001', 1, '2019-01-16', 'FEUP', 'FA Nº 6/A', '10001', 'N', '2018-12-15'),
('00051', '2019-01-20 00051 10002', 1, '2019-01-20', 'FEUP', 'FA Nº 7/A', '10002', 'N', '2018-12-15'),
('00051', '2019-01-25 00051 10003', 1, '2019-01-25', 'FEUP', 'FA Nº 8/A', '10003', 'N', '2018-12-15'),
('00051', '2019-01-25 00051 10004', 1, '2019-01-25', 'FEUP', 'FA Nº 9/A', '10004', 'N', '2018-12-15'),
('00051', '2019-02-10 00051 20001', 2, '2019-02-10', 'FEUP', 'FA Nº 10/A', '20001', 'N', '2018-12-15'),
('00051', '2019-02-10 00051 20002', 2, '2019-02-10', 'FEUP', 'FA Nº 11/A', '20002', 'N', '2018-12-15'),
('00051', '2019-02-15 00051 20003', 2, '2019-02-15', 'FEUP', 'FA Nº 12/A', '20003', 'N', '2018-12-15'),
('00051', '2019-03-03 00051 30001', 3, '2019-03-03', 'FEUP', 'FA Nº 13/A', '30001', 'N', '2018-12-15'),
('00051', '2019-03-10 00051 30002', 3, '2019-03-10', 'FEUP', 'FA Nº 14/A', '30002', 'N', '2018-12-15'),
('00051', '2019-03-20 00051 30003', 3, '2019-03-20', 'FEUP', 'FA Nº 15/A', '30003', 'N', '2018-12-15'),
('00051', '2019-03-28 00051 30004', 3, '2019-03-28', 'FEUP', 'FA Nº 16/A', '30004', 'N', '2018-12-15'),
('00051', '2019-04-05 00051 40001', 4, '2019-04-05', 'FEUP', 'FA Nº 17/A', '40001', 'N', '2018-12-15'),
('00051', '2019-04-10 00051 40002', 4, '2019-04-10', 'FEUP', 'FA Nº 18/A', '40002', 'N', '2018-12-15'),
('00051', '2019-04-15 00051 40003', 4, '2019-04-15', 'FEUP', 'FA Nº 19/A', '40003', 'N', '2018-12-15'),
('00051', '2019-04-25 00051 40004', 4, '2019-04-25', 'FEUP', 'FA Nº 20/A', '40004', 'N', '2018-12-15'),
('00051', '2019-04-30 00051 40005', 4, '2019-04-30', 'FEUP', 'FA Nº 21/A', '40005', 'N', '2018-12-15'),
('00051', '2019-05-10 00051 50001', 5, '2019-05-10', 'FEUP', 'FA Nº 22/A', '50001', 'N', '2018-12-15'),
('00051', '2019-05-20 00051 50002', 5, '2019-05-20', 'FEUP', 'FA Nº 23/A', '50002', 'N', '2018-12-15'),
('00051', '2019-05-25 00051 50003', 5, '2019-05-25', 'FEUP', 'FA Nº 24/A', '50003', 'N', '2018-12-15'),
('00051', '2019-05-30 00051 50004', 5, '2019-05-30', 'FEUP', 'FA Nº 25/A', '50004', 'N', '2018-12-15'),
('00051', '2019-06-05 00051 60001', 6, '2019-06-05', 'FEUP', 'FA Nº 26/A', '60001', 'N', '2018-12-15'),
('00051', '2019-06-15 00051 60002', 6, '2019-06-15', 'FEUP', 'FA Nº 27/A', '60002', 'N', '2018-12-15'),
('00051', '2019-06-25 00051 60003', 6, '2019-06-25', 'FEUP', 'FA Nº 28/A', '60003', 'N', '2018-12-15'),
('00051', '2019-07-10 00051 70001', 7, '2019-07-10', 'FEUP', 'FA Nº 29/A', '70001', 'N', '2018-12-15'),
('00051', '2019-07-20 00051 70002', 7, '2019-07-20', 'FEUP', 'FA Nº 30/A', '70002', 'N', '2018-12-15'),
('00051', '2019-07-30 00051 70003', 7, '2019-07-30', 'FEUP', 'FA Nº 31/A', '70003', 'N', '2018-12-15'),
('00051', '2019-08-05 00051 80001', 8, '2019-08-05', 'FEUP', 'FA Nº 32/A', '80001', 'N', '2018-12-15'),
('00051', '2019-08-15 00051 80002', 8, '2019-08-15', 'FEUP', 'FA Nº 33/A', '80002', 'N', '2018-12-15'),
('00051', '2019-08-25 00051 80003', 8, '2019-08-25', 'FEUP', 'FA Nº 34/A', '80003', 'N', '2018-12-15'),
('00051', '2019-09-01 00051 90001', 9, '2019-09-01', 'FEUP', 'FA Nº 35/A', '90001', 'N', '2018-12-15'),
('00051', '2019-09-05 00051 90002', 9, '2019-09-05', 'FEUP', 'FA Nº 36/A', '90002', 'N', '2018-12-15'),
('00051', '2019-09-15 00051 90003', 9, '2019-09-15', 'FEUP', 'FA Nº 37/A', '90003', 'N', '2018-12-15'),
('00051', '2019-09-25 00051 90004', 9, '2019-09-25', 'FEUP', 'FA Nº 38/A', '90004', 'N', '2018-12-15'),
('00051', '2019-09-30 00051 90005', 9, '2019-09-30', 'FEUP', 'FA Nº 39/A', '90005', 'N', '2018-12-15'),
('00051', '2019-10-10 00051 100001', 10, '2019-10-10', 'FEUP', 'FA Nº 40/A', '100001', 'N', '2018-12-15'),
('00051', '2019-10-25 00051 100002', 10, '2019-10-25', 'FEUP', 'FA Nº 41/A', '100002', 'N', '2018-12-15'),
('00051', '2019-11-05 00051 110001', 11, '2019-11-05', 'FEUP', 'FA Nº 42/A', '110001', 'N', '2018-12-15'),
('00051', '2019-11-10 00051 110002', 11, '2019-11-10', 'FEUP', 'FA Nº 43/A', '110002', 'N', '2018-12-15'),
('00051', '2019-11-20 00051 110003', 11, '2019-11-20', 'FEUP', 'FA Nº 44/A', '110003', 'N', '2018-12-15'),
('00051', '2019-11-30 00051 110004', 11, '2019-11-30', 'FEUP', 'FA Nº 45/A', '110004', 'N', '2018-12-15'),
('00051', '2019-12-05 00051 120001', 12, '2019-12-05', 'FEUP', 'FA Nº 46/A', '120001', 'N', '2018-12-15'),
('00051', '2019-12-10 00051 120002', 12, '2019-12-10', 'FEUP', 'FA Nº 47/A', '120002', 'N', '2018-12-15');

-- --------------------------------------------------------

--
-- Estrutura da tabela `products`
--

DROP TABLE IF EXISTS `products`;
CREATE TABLE IF NOT EXISTS `products` (
  `ProductType` varchar(5) DEFAULT NULL,
  `ProductCode` varchar(45) DEFAULT NULL,
  `ProductGroup` varchar(30) DEFAULT NULL,
  `ProductDescription` varchar(60) DEFAULT NULL,
  `ProductNumberCode` varchar(30) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `products`
--

INSERT INTO `products` (`ProductType`, `ProductCode`, `ProductGroup`, `ProductDescription`, `ProductNumberCode`) VALUES
('P', 'A0001', 'Sem família', 'Marcador Preto', 'A0001'),
('P', 'A0002', 'Sem família', 'Pencil', 'A0002'),
('P', 'A0003', 'Sem família', 'Caneta', 'A0003'),
('P', 'A0004', 'Sem família', 'Apagador', 'A0004'),
('O', 'Especial', 'Sem família', 'Linha especial', 'Especial');

-- --------------------------------------------------------

--
-- Estrutura da tabela `salesinvoices`
--

DROP TABLE IF EXISTS `salesinvoices`;
CREATE TABLE IF NOT EXISTS `salesinvoices` (
  `InvoiceNo` varchar(15) DEFAULT NULL,
  `ATCUD` int(11) DEFAULT NULL,
  `InvoiceStatus` varchar(2) DEFAULT NULL,
  `InvoiceStatusDate` datetime DEFAULT NULL,
  `DocStatusSourceID` varchar(15) DEFAULT NULL,
  `SourceBilling` varchar(2) DEFAULT NULL,
  `Period` int(11) DEFAULT NULL,
  `InvoiceDate` date DEFAULT NULL,
  `SourceID` varchar(15) DEFAULT NULL,
  `SystemEntryDate` datetime DEFAULT NULL,
  `CustomerID` varchar(20) DEFAULT NULL,
  `ShipToDeliveryDate` date DEFAULT NULL,
  `ShipToAddress` varchar(60) DEFAULT NULL,
  `ShipToCity` varchar(60) DEFAULT NULL,
  `ShipToPostalCode` varchar(15) DEFAULT NULL,
  `ShipToCountry` varchar(15) DEFAULT NULL,
  `ShipFromDeliveryDate` date DEFAULT NULL,
  `ShipFromAddress` varchar(30) DEFAULT NULL,
  `ShipFromCity` varchar(20) DEFAULT NULL,
  `ShipFromPostalCode` varchar(15) DEFAULT NULL,
  `ShipFromCountry` varchar(15) DEFAULT NULL,
  `MovementStartTime` datetime DEFAULT NULL,
  `TaxPayable` double DEFAULT NULL,
  `NetTotal` double DEFAULT NULL,
  `GrossTotal` double DEFAULT NULL,
  `WithholdingTaxAmount` double DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `salesinvoices`
--

INSERT INTO `salesinvoices` (`InvoiceNo`, `ATCUD`, `InvoiceStatus`, `InvoiceStatusDate`, `DocStatusSourceID`, `SourceBilling`, `Period`, `InvoiceDate`, `SourceID`, `SystemEntryDate`, `CustomerID`, `ShipToDeliveryDate`, `ShipToAddress`, `ShipToCity`, `ShipToPostalCode`, `ShipToCountry`, `ShipFromDeliveryDate`, `ShipFromAddress`, `ShipFromCity`, `ShipFromPostalCode`, `ShipFromCountry`, `MovementStartTime`, `TaxPayable`, `NetTotal`, `GrossTotal`, `WithholdingTaxAmount`) VALUES
('FA A/6', 0, 'N', '2018-12-15 12:05:25', NULL, 'P', 1, '2019-01-16', 'FEUP', '2018-12-15 12:05:25', 'PT513076549_C', '2018-12-15', 'Rua Z nº 24', 'Porto', '4000-999', 'PT', '2018-12-15', 'Desconhecido', 'Desconhecido', 'Desconhecido', 'PT', '2018-12-15 12:07:00', 1.73, 7.5, 9.23, 0),
('FA A/7', 0, 'N', '2018-12-15 12:06:15', NULL, 'P', 1, '2019-01-20', 'FEUP', '2018-12-15 12:06:15', 'PT513076549_C', '2018-12-15', 'Rua Z nº 24', 'Porto', '4000-999', 'PT', '2018-12-15', 'Desconhecido', 'Desconhecido', 'Desconhecido', 'PT', '2018-12-15 12:08:00', 1.73, 7.5, 9.23, 0),
('FA A/8', 0, 'N', '2018-12-15 12:08:19', NULL, 'P', 1, '2019-01-25', 'FEUP', '2018-12-15 12:08:19', 'PT513076549_C', '2018-12-15', 'Rua Z', 'Desconhecido', '1000-000', 'PT', '2018-12-15', 'Desconhecido', 'Desconhecido', 'Desconhecido', 'PT', '2018-12-15 12:10:00', 1.73, 7.5, 9.23, 0),
('FA A/9', 0, 'N', '2018-12-15 12:09:34', NULL, 'P', 1, '2019-01-25', 'FEUP', '2018-12-15 12:09:34', 'PT513076549_C', '2018-12-15', 'Rua A', 'Porto', '4000-000', 'PT', '2018-12-15', 'Desconhecido', 'Desconhecido', 'Desconhecido', 'PT', '2018-12-15 12:11:00', 16.1, 70, 86.1, 0),
('FA A/10', 0, 'N', '2018-12-15 12:24:22', NULL, 'P', 2, '2019-02-10', 'FEUP', '2018-12-15 12:24:22', 'PT513076549_C', '2018-12-15', 'Rua A', 'Porto', '4000-000', 'PT', '2018-12-15', 'Desconhecido', 'Desconhecido', 'Desconhecido', 'PT', '2018-12-15 12:26:00', 2.88, 12.5, 15.38, 0),
('FA A/11', 0, 'N', '2018-12-15 12:25:50', NULL, 'P', 2, '2019-02-10', 'FEUP', '2018-12-15 12:25:50', 'PT513076549_C', '2018-12-15', 'Rua Z nº 24', 'Porto', '4000-999', 'PT', '2018-12-15', 'Desconhecido', 'Desconhecido', 'Desconhecido', 'PT', '2018-12-15 12:27:00', 10.35, 45, 55.35, 0),
('FA A/12', 0, 'N', '2018-12-15 12:26:23', NULL, 'P', 2, '2019-02-20', 'FEUP', '2018-12-15 12:26:23', 'PT513076549_C', '2018-12-15', 'Rua A', 'Porto', '4000-000', 'PT', '2018-12-15', 'Desconhecido', 'Desconhecido', 'Desconhecido', 'PT', '2018-12-15 12:28:00', 10.35, 45, 55.35, 0),
('FA A/13', 0, 'N', '2018-12-15 12:39:37', NULL, 'P', 3, '2019-03-03', 'FEUP', '2018-12-15 12:39:37', 'PT513076549_C', '2018-12-15', 'Rua A', 'Porto', '4000-000', 'PT', '2018-12-15', 'Desconhecido', 'Desconhecido', 'Desconhecido', 'PT', '2018-12-15 12:41:00', 28.18, 122.5, 150.68, 0),
('FA A/14', 0, 'N', '2018-12-15 12:40:08', NULL, 'P', 3, '2019-03-20', 'FEUP', '2018-12-15 12:40:08', 'PT513076549_C', '2018-12-15', 'Rua Z', 'Desconhecido', '1000-000', 'PT', '2018-12-15', 'Desconhecido', 'Desconhecido', 'Desconhecido', 'PT', '2018-12-15 12:42:00', 28.18, 122.5, 150.68, 0),
('FA A/15', 0, 'N', '2018-12-15 12:44:31', NULL, 'P', 3, '2019-03-20', 'FEUP', '2018-12-15 12:44:31', 'PT513076549_C', '2018-12-15', 'Rua Z', 'Desconhecido', '1000-000', 'PT', '2018-12-15', 'Desconhecido', 'Desconhecido', 'Desconhecido', 'PT', '2018-12-15 12:46:00', 28.18, 122.5, 150.68, 0),
('FA A/16', 0, 'N', '2018-12-15 12:45:10', NULL, 'P', 3, '2019-03-28', 'FEUP', '2018-12-15 12:45:10', 'PT513076549_C', '2018-12-15', 'Rua Z nº 24', 'Porto', '4000-999', 'PT', '2018-12-15', 'Desconhecido', 'Desconhecido', 'Desconhecido', 'PT', '2018-12-15 12:47:00', 27.03, 117.5, 144.53, 0),
('FA A/17', 0, 'N', '2018-12-15 12:48:56', NULL, 'P', 4, '2019-04-05', 'FEUP', '2018-12-15 12:48:56', 'PT513076549_C', '2018-12-15', 'Rua Z nº 24', 'Porto', '4000-999', 'PT', '2018-12-15', 'Desconhecido', 'Desconhecido', 'Desconhecido', 'PT', '2018-12-15 12:50:00', 31.05, 135, 166.05, 0),
('FA A/18', 0, 'N', '2018-12-15 12:49:46', NULL, 'P', 4, '2019-04-10', 'FEUP', '2018-12-15 12:49:46', 'PT513076549_C', '2018-12-15', 'Rua A', 'Porto', '4000-000', 'PT', '2018-12-15', 'Desconhecido', 'Desconhecido', 'Desconhecido', 'PT', '2018-12-15 12:51:00', 31.05, 135, 166.05, 0),
('FA A/19', 0, 'N', '2018-12-15 12:51:01', NULL, 'P', 4, '2019-04-15', 'FEUP', '2018-12-15 12:51:01', 'PT513076549_C', '2018-12-15', 'Rua A', 'Porto', '4000-000', 'PT', '2018-12-15', 'Desconhecido', 'Desconhecido', 'Desconhecido', 'PT', '2018-12-15 12:52:00', 27.6, 120, 147.6, 0),
('FA A/20', 0, 'N', '2018-12-15 12:54:22', NULL, 'P', 4, '2019-04-25', 'FEUP', '2018-12-15 12:54:22', 'PT513076549_C', '2018-12-15', 'Rua Z', 'Desconhecido', '1000-000', 'PT', '2018-12-15', 'Desconhecido', 'Desconhecido', 'Desconhecido', 'PT', '2018-12-15 12:56:00', 27.6, 120, 147.6, 0),
('FA A/21', 0, 'N', '2018-12-15 12:54:59', NULL, 'P', 4, '2019-04-30', 'FEUP', '2018-12-15 12:54:59', 'PT513076549_C', '2018-12-15', 'Rua Z', 'Desconhecido', '1000-000', 'PT', '2018-12-15', 'Desconhecido', 'Desconhecido', 'Desconhecido', 'PT', '2018-12-15 12:56:00', 23, 100, 123, 0),
('FA A/22', 0, 'N', '2018-12-15 12:59:05', NULL, 'P', 5, '2019-05-10', 'FEUP', '2018-12-15 12:59:05', 'PT513076549_C', '2018-12-15', 'Rua Z nº 24', 'Porto', '4000-999', 'PT', '2018-12-15', 'Desconhecido', 'Desconhecido', 'Desconhecido', 'PT', '2018-12-15 13:01:00', 21.62, 94, 115.62, 0),
('FA A/23', 0, 'N', '2018-12-15 13:02:37', NULL, 'P', 5, '2019-05-20', 'FEUP', '2018-12-15 13:02:37', 'PT513076549_C', '2018-12-15', 'Rua A', 'Porto', '4000-000', 'PT', '2018-12-15', 'Desconhecido', 'Desconhecido', 'Desconhecido', 'PT', '2018-12-15 13:04:00', 21.05, 91.5, 112.55, 0),
('FA A/24', 0, 'N', '2018-12-15 13:03:23', NULL, 'P', 5, '2019-05-25', 'FEUP', '2018-12-15 13:03:23', 'PT513076549_C', '2018-12-15', 'Rua A', 'Porto', '4000-000', 'PT', '2018-12-15', 'Desconhecido', 'Desconhecido', 'Desconhecido', 'PT', '2018-12-15 13:05:00', 21.05, 91.5, 112.55, 0),
('FA A/25', 0, 'N', '2018-12-15 13:04:02', NULL, 'P', 5, '2019-05-30', 'FEUP', '2018-12-15 13:04:02', 'PT513076549_C', '2018-12-15', 'Rua A', 'Porto', '4000-000', 'PT', '2018-12-15', 'Desconhecido', 'Desconhecido', 'Desconhecido', 'PT', '2018-12-15 13:05:00', 21.05, 91.5, 112.55, 0),
('FA A/26', 0, 'N', '2018-12-15 13:12:43', NULL, 'P', 6, '2019-06-15', 'FEUP', '2018-12-15 13:12:43', 'PT513076549_C', '2018-12-15', 'Rua Z', 'Desconhecido', '1000-000', 'PT', '2018-12-15', 'Desconhecido', 'Desconhecido', 'Desconhecido', 'PT', '2018-12-15 13:14:00', 21.05, 91.5, 112.55, 0),
('FA A/27', 0, 'N', '2018-12-15 13:14:51', NULL, 'P', 6, '2019-06-15', 'FEUP', '2018-12-15 13:14:51', 'PT513076549_C', '2018-12-15', 'Rua Z', 'Desconhecido', '1000-000', 'PT', '2018-12-15', 'Desconhecido', 'Desconhecido', 'Desconhecido', 'PT', '2018-12-15 13:16:00', 21.05, 91.5, 112.55, 0),
('FA A/28', 0, 'N', '2018-12-15 13:15:26', NULL, 'P', 6, '2019-06-25', 'FEUP', '2018-12-15 13:15:26', 'PT513076549_C', '2018-12-15', 'Rua Z nº 24', 'Porto', '4000-999', 'PT', '2018-12-15', 'Desconhecido', 'Desconhecido', 'Desconhecido', 'PT', '2018-12-15 13:17:00', 19.67, 85.5, 105.17, 0),
('FA A/29', 0, 'N', '2018-12-15 13:19:46', NULL, 'P', 7, '2019-07-10', 'FEUP', '2018-12-15 13:19:46', 'PT513076549_C', '2018-12-15', 'Rua A', 'Porto', '4000-000', 'PT', '2018-12-15', 'Desconhecido', 'Desconhecido', 'Desconhecido', 'PT', '2018-12-15 13:21:00', 19.09, 83, 102.09, 0),
('FA A/30', 0, 'N', '2018-12-15 13:20:30', NULL, 'P', 7, '2019-07-20', 'FEUP', '2018-12-15 13:20:30', 'PT513076549_C', '2018-12-15', 'Rua Z', 'Desconhecido', '1000-000', 'PT', '2018-12-15', 'Desconhecido', 'Desconhecido', 'Desconhecido', 'PT', '2018-12-15 13:22:00', 19.09, 83, 102.09, 0),
('FA A/31', 0, 'N', '2018-12-15 13:21:12', NULL, 'P', 7, '2019-07-30', 'FEUP', '2018-12-15 13:21:12', 'PT513076549_C', '2018-12-15', 'Rua Z', 'Desconhecido', '1000-000', 'PT', '2018-12-15', 'Desconhecido', 'Desconhecido', 'Desconhecido', 'PT', '2018-12-15 13:23:00', 19.09, 83, 102.09, 0),
('FA A/32', 0, 'N', '2018-12-15 15:41:24', NULL, 'P', 8, '2019-08-05', 'FEUP', '2018-12-15 15:41:24', 'PT513076549_C', '2018-12-15', 'Rua Z nº 24', 'Porto', '4000-999', 'PT', '2018-12-15', 'Desconhecido', 'Desconhecido', 'Desconhecido', 'PT', '2018-12-15 15:43:00', 7.48, 32.5, 39.98, 0),
('FA A/33', 0, 'N', '2018-12-15 15:42:18', NULL, 'P', 8, '2019-08-15', 'FEUP', '2018-12-15 15:42:18', 'PT513076549_C', '2018-12-15', 'Rua Z', 'Desconhecido', '1000-000', 'PT', '2018-12-15', 'Desconhecido', 'Desconhecido', 'Desconhecido', 'PT', '2018-12-15 15:44:00', 13.8, 60, 73.8, 0),
('FA A/34', 0, 'N', '2018-12-15 15:44:26', NULL, 'P', 8, '2019-08-25', 'FEUP', '2018-12-15 15:44:26', 'PT513076549_C', '2018-12-15', 'Rua A', 'Porto', '4000-000', 'PT', '2018-12-15', 'Desconhecido', 'Desconhecido', 'Desconhecido', 'PT', '2018-12-15 15:46:00', 6.21, 27, 33.21, 0),
('FA A/35', 0, 'N', '2018-12-15 15:45:54', NULL, 'P', 9, '2019-09-01', 'FEUP', '2018-12-15 15:45:54', 'PT513076549_C', '2018-12-15', 'Rua Z', 'Desconhecido', '1000-000', 'PT', '2018-12-15', 'Desconhecido', 'Desconhecido', 'Desconhecido', 'PT', '2018-12-15 15:47:00', 6.56, 28.5, 35.06, 0),
('FA A/36', 0, 'N', '2018-12-15 15:49:30', NULL, 'P', 9, '2019-09-05', 'FEUP', '2018-12-15 15:49:30', 'PT513076549_C', '2018-12-15', 'Rua Z nº 24', 'Porto', '4000-999', 'PT', '2018-12-15', 'Desconhecido', 'Desconhecido', 'Desconhecido', 'PT', '2018-12-15 15:51:00', 30.25, 131.5, 161.75, 0),
('FA A/37', 0, 'N', '2018-12-15 15:50:15', NULL, 'P', 9, '2019-09-15', 'FEUP', '2018-12-15 15:50:15', 'PT513076549_C', '2018-12-15', 'Rua Z', 'Desconhecido', '1000-000', 'PT', '2018-12-15', 'Desconhecido', 'Desconhecido', 'Desconhecido', 'PT', '2018-12-15 15:52:00', 30.25, 131.5, 161.75, 0),
('FA A/38', 0, 'N', '2018-12-15 15:52:48', NULL, 'P', 9, '2019-09-25', 'FEUP', '2018-12-15 15:52:48', 'PT513076549_C', '2018-12-15', 'Rua Z', 'Desconhecido', '1000-000', 'PT', '2018-12-15', 'Desconhecido', 'Desconhecido', 'Desconhecido', 'PT', '2018-12-15 15:54:00', 30.25, 131.5, 161.75, 0),
('FA A/39', 0, 'N', '2018-12-15 15:54:12', NULL, 'P', 9, '2019-09-30', 'FEUP', '2018-12-15 15:54:12', 'PT513076549_C', '2018-12-15', 'Rua Z', 'Desconhecido', '1000-000', 'PT', '2018-12-15', 'Desconhecido', 'Desconhecido', 'Desconhecido', 'PT', '2018-12-15 15:55:00', 28.41, 123.5, 151.91, 0),
('FA A/40', 0, 'N', '2018-12-15 15:57:24', NULL, 'P', 10, '2019-10-10', 'FEUP', '2018-12-15 15:57:24', 'PT513076549_C', '2018-12-15', 'Rua Z', 'Desconhecido', '1000-000', 'PT', '2018-12-15', 'Desconhecido', 'Desconhecido', 'Desconhecido', 'PT', '2018-12-15 15:59:00', 28.41, 123.5, 151.91, 0),
('FA A/41', 0, 'N', '2018-12-15 15:59:48', NULL, 'P', 10, '2019-10-25', 'FEUP', '2018-12-15 15:59:48', 'PT513076549_C', '2018-12-15', 'Rua Z nº 24', 'Porto', '4000-999', 'PT', '2018-12-15', 'Desconhecido', 'Desconhecido', 'Desconhecido', 'PT', '2018-12-15 16:01:00', 28.41, 123.5, 151.91, 0),
('FA A/42', 0, 'N', '2018-12-15 16:00:21', NULL, 'P', 11, '2019-11-05', 'FEUP', '2018-12-15 16:00:21', 'PT513076549_C', '2018-12-15', 'Rua Z nº 24', 'Porto', '4000-999', 'PT', '2018-12-15', 'Desconhecido', 'Desconhecido', 'Desconhecido', 'PT', '2018-12-15 16:02:00', 28.41, 123.5, 151.91, 0),
('FA A/43', 0, 'N', '2018-12-15 16:03:14', NULL, 'P', 11, '2019-11-10', 'FEUP', '2018-12-15 16:03:14', 'PT513076549_C', '2018-12-15', 'Rua Z nº 24', 'Porto', '4000-999', 'PT', '2018-12-15', 'Desconhecido', 'Desconhecido', 'Desconhecido', 'PT', '2018-12-15 16:05:00', 28.41, 123.5, 151.91, 0),
('FA A/44', 0, 'N', '2018-12-15 16:06:03', NULL, 'P', 11, '2019-11-20', 'FEUP', '2018-12-15 16:06:03', 'PT513076549_C', '2018-12-15', 'Rua Z', 'Desconhecido', '1000-000', 'PT', '2018-12-15', 'Desconhecido', 'Desconhecido', 'Desconhecido', 'PT', '2018-12-15 16:07:00', 28.41, 123.5, 151.91, 0),
('FA A/45', 0, 'N', '2018-12-15 16:06:51', NULL, 'P', 11, '2019-11-30', 'FEUP', '2018-12-15 16:06:51', 'PT513076549_C', '2018-12-15', 'Rua Z', 'Desconhecido', '1000-000', 'PT', '2018-12-15', 'Desconhecido', 'Desconhecido', 'Desconhecido', 'PT', '2018-12-15 16:08:00', 28.41, 123.5, 151.91, 0),
('FA A/46', 0, 'N', '2018-12-15 16:07:47', NULL, 'P', 12, '2019-12-05', 'FEUP', '2018-12-15 16:07:47', 'PT513076549_C', '2018-12-15', 'Rua Z nº 24', 'Porto', '4000-999', 'PT', '2018-12-15', 'Desconhecido', 'Desconhecido', 'Desconhecido', 'PT', '2018-12-15 16:09:00', 28.41, 123.5, 151.91, 0),
('FA A/47', 0, 'N', '2018-12-15 16:08:45', NULL, 'P', 12, '2019-12-10', 'FEUP', '2018-12-15 16:08:45', 'PT513076549_C', '2018-12-15', 'Rua A', 'Porto', '4000-000', 'PT', '2018-12-15', 'Desconhecido', 'Desconhecido', 'Desconhecido', 'PT', '2018-12-15 16:10:00', 21.51, 93.5, 115.01, 0),
('FS A/3', 0, 'N', '2018-12-15 12:17:38', NULL, 'P', 1, '2019-01-28', 'FEUP', '2018-12-15 12:17:38', 'Consumidor final', '2019-01-28', 'Desconhecido', 'Desconhecido', 'Desconhecido', 'Desconhecido', '2019-01-28', 'Desconhecido', 'Desconhecido', 'Desconhecido', 'Desconhecido', '2019-01-28 00:00:00', 7.94, 34.5, 42.44, 0),
('FS A/4', 0, 'N', '2018-12-15 12:19:07', NULL, 'P', 2, '2019-02-05', 'FEUP', '2018-12-15 12:19:07', 'Consumidor final', '2019-02-05', 'Desconhecido', 'Desconhecido', 'Desconhecido', 'Desconhecido', '2019-02-05', 'Desconhecido', 'Desconhecido', 'Desconhecido', 'Desconhecido', '2019-02-05 00:00:00', 8.86, 38.5, 47.36, 0),
('FS A/5', 0, 'N', '2018-12-15 12:29:34', NULL, 'P', 2, '2019-02-20', 'FEUP', '2018-12-15 12:29:34', 'Consumidor final', '2019-02-20', 'Desconhecido', 'Desconhecido', 'Desconhecido', 'Desconhecido', '2019-02-20', 'Desconhecido', 'Desconhecido', 'Desconhecido', 'Desconhecido', '2019-02-20 00:00:00', 12.65, 55, 67.65, 0),
('FS A/6', 0, 'N', '2018-12-15 12:30:07', NULL, 'P', 2, '2019-02-23', 'FEUP', '2018-12-15 12:30:07', 'Consumidor final', '2019-02-23', 'Desconhecido', 'Desconhecido', 'Desconhecido', 'Desconhecido', '2019-02-23', 'Desconhecido', 'Desconhecido', 'Desconhecido', 'Desconhecido', '2019-02-23 00:00:00', 12.65, 55, 67.65, 0),
('FS A/7', 0, 'N', '2018-12-15 12:31:30', NULL, 'P', 2, '2019-02-26', 'FEUP', '2018-12-15 12:31:30', 'Consumidor final', '2019-02-26', 'Desconhecido', 'Desconhecido', 'Desconhecido', 'Desconhecido', '2019-02-26', 'Desconhecido', 'Desconhecido', 'Desconhecido', 'Desconhecido', '2019-02-26 00:00:00', 12.65, 55, 67.65, 0),
('FS A/8', 0, 'N', '2018-12-15 12:32:21', NULL, 'P', 2, '2019-02-28', 'FEUP', '2018-12-15 12:32:21', 'Consumidor final', '2019-02-28', 'Desconhecido', 'Desconhecido', 'Desconhecido', 'Desconhecido', '2019-02-28', 'Desconhecido', 'Desconhecido', 'Desconhecido', 'Desconhecido', '2019-02-28 00:00:00', 12.65, 55, 67.65, 0);

-- --------------------------------------------------------

--
-- Estrutura da tabela `saleslines`
--

DROP TABLE IF EXISTS `saleslines`;
CREATE TABLE IF NOT EXISTS `saleslines` (
  `InvoiceNo` varchar(20) DEFAULT NULL,
  `LineNumber` int(11) DEFAULT NULL,
  `ProductCode` varchar(60) DEFAULT NULL,
  `ProductDescription` varchar(60) DEFAULT NULL,
  `Quantity` int(11) DEFAULT NULL,
  `UnitOfMeasure` varchar(10) DEFAULT NULL,
  `UnitPrice` double DEFAULT NULL,
  `TaxPointDate` date DEFAULT NULL,
  `CreditAmount` double DEFAULT NULL,
  `SettlementAmount` double DEFAULT NULL,
  `TaxType` varchar(5) DEFAULT NULL,
  `TaxCountryRegion` varchar(5) DEFAULT NULL,
  `TaxCode` varchar(5) DEFAULT NULL,
  `TaxPercentage` double DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `saleslines`
--

INSERT INTO `saleslines` (`InvoiceNo`, `LineNumber`, `ProductCode`, `ProductDescription`, `Quantity`, `UnitOfMeasure`, `UnitPrice`, `TaxPointDate`, `CreditAmount`, `SettlementAmount`, `TaxType`, `TaxCountryRegion`, `TaxCode`, `TaxPercentage`) VALUES
('FA A/6', 1, 'A0001', 'Marcador Preto', 3, 'UN', 1.5, '2019-01-16', 4.5, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/6', 2, 'A0004', 'Apagador', 1, 'UN', 3, '2019-01-16', 3, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/7', 1, 'A0001', 'Marcador Preto', 3, 'UN', 1.5, '2019-01-20', 4.5, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/7', 2, 'A0004', 'Apagador', 1, 'UN', 3, '2019-01-20', 3, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/8', 1, 'A0001', 'Marcador Preto', 3, 'UN', 1.5, '2019-01-25', 4.5, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/8', 2, 'A0004', 'Apagador', 1, 'UN', 3, '2019-01-25', 3, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/9', 1, 'A0002', 'Pencil', 35, 'UN', 2, '2019-01-25', 70, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/10', 1, 'A0001', 'Marcador Preto', 5, 'UN', 1.5, '2019-02-10', 7.5, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/10', 2, 'A0003', 'Caneta', 5, 'UN', 1, '2019-02-10', 5, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/11', 1, 'A0003', 'Caneta', 15, 'UN', 1, '2019-02-10', 15, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/11', 2, 'A0004', 'Apagador', 10, 'UN', 3, '2019-02-10', 30, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/12', 1, 'A0003', 'Caneta', 15, 'UN', 1, '2019-02-20', 15, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/12', 2, 'A0004', 'Apagador', 10, 'UN', 3, '2019-02-20', 30, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/13', 1, 'A0001', 'Marcador Preto', 25, 'UN', 1.5, '2019-03-03', 37.5, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/13', 2, 'A0002', 'Pencil', 20, 'UN', 2, '2019-03-03', 40, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/13', 3, 'A0003', 'Caneta', 15, 'UN', 1, '2019-03-03', 15, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/13', 4, 'A0004', 'Apagador', 10, 'UN', 3, '2019-03-03', 30, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/14', 1, 'A0001', 'Marcador Preto', 25, 'UN', 1.5, '2019-03-20', 37.5, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/14', 2, 'A0002', 'Pencil', 20, 'UN', 2, '2019-03-20', 40, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/14', 3, 'A0003', 'Caneta', 15, 'UN', 1, '2019-03-20', 15, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/14', 4, 'A0004', 'Apagador', 10, 'UN', 3, '2019-03-20', 30, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/15', 1, 'A0001', 'Marcador Preto', 25, 'UN', 1.5, '2019-03-20', 37.5, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/15', 2, 'A0002', 'Pencil', 20, 'UN', 2, '2019-03-20', 40, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/15', 3, 'A0003', 'Caneta', 15, 'UN', 1, '2019-03-20', 15, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/15', 4, 'A0004', 'Apagador', 10, 'UN', 3, '2019-03-20', 30, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/16', 1, 'A0001', 'Marcador Preto', 25, 'UN', 1.5, '2019-03-28', 37.5, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/16', 2, 'A0002', 'Pencil', 20, 'UN', 2, '2019-03-28', 40, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/16', 3, 'A0003', 'Caneta', 10, 'UN', 1, '2019-03-28', 10, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/16', 4, 'A0004', 'Apagador', 10, 'UN', 3, '2019-03-28', 30, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/17', 1, 'A0001', 'Marcador Preto', 20, 'UN', 1.5, '2019-04-05', 30, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/17', 2, 'A0002', 'Pencil', 25, 'UN', 2, '2019-04-05', 50, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/17', 3, 'A0003', 'Caneta', 10, 'UN', 1, '2019-04-05', 10, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/17', 4, 'A0004', 'Apagador', 15, 'UN', 3, '2019-04-05', 45, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/18', 1, 'A0001', 'Marcador Preto', 20, 'UN', 1.5, '2019-04-10', 30, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/18', 2, 'A0002', 'Pencil', 25, 'UN', 2, '2019-04-10', 50, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/18', 3, 'A0003', 'Caneta', 10, 'UN', 1, '2019-04-10', 10, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/18', 4, 'A0004', 'Apagador', 15, 'UN', 3, '2019-04-10', 45, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/19', 1, 'A0001', 'Marcador Preto', 10, 'UN', 1.5, '2019-04-15', 15, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/19', 2, 'A0002', 'Pencil', 25, 'UN', 2, '2019-04-15', 50, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/19', 3, 'A0003', 'Caneta', 10, 'UN', 1, '2019-04-15', 10, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/19', 4, 'A0004', 'Apagador', 15, 'UN', 3, '2019-04-15', 45, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/20', 1, 'A0001', 'Marcador Preto', 10, 'UN', 1.5, '2019-04-25', 15, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/20', 2, 'A0002', 'Pencil', 25, 'UN', 2, '2019-04-25', 50, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/20', 3, 'A0003', 'Caneta', 10, 'UN', 1, '2019-04-25', 10, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/20', 4, 'A0004', 'Apagador', 15, 'UN', 3, '2019-04-25', 45, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/21', 1, 'A0001', 'Marcador Preto', 10, 'UN', 1.5, '2019-04-30', 15, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/21', 2, 'A0002', 'Pencil', 15, 'UN', 2, '2019-04-30', 30, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/21', 3, 'A0003', 'Caneta', 10, 'UN', 1, '2019-04-30', 10, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/21', 4, 'A0004', 'Apagador', 15, 'UN', 3, '2019-04-30', 45, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/22', 1, 'A0001', 'Marcador Preto', 20, 'UN', 1.5, '2019-05-10', 30, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/22', 2, 'A0002', 'Pencil', 23, 'UN', 2, '2019-05-10', 46, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/22', 3, 'A0003', 'Caneta', 18, 'UN', 1, '2019-05-10', 18, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/23', 1, 'A0001', 'Marcador Preto', 19, 'UN', 1.5, '2019-05-20', 28.5, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/23', 2, 'A0003', 'Caneta', 21, 'UN', 1, '2019-05-20', 21, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/23', 3, 'A0004', 'Apagador', 14, 'UN', 3, '2019-05-20', 42, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/24', 1, 'A0001', 'Marcador Preto', 19, 'UN', 1.5, '2019-05-25', 28.5, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/24', 2, 'A0003', 'Caneta', 21, 'UN', 1, '2019-05-25', 21, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/24', 3, 'A0004', 'Apagador', 14, 'UN', 3, '2019-05-25', 42, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/25', 1, 'A0001', 'Marcador Preto', 19, 'UN', 1.5, '2019-05-30', 28.5, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/25', 2, 'A0003', 'Caneta', 21, 'UN', 1, '2019-05-30', 21, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/25', 3, 'A0004', 'Apagador', 14, 'UN', 3, '2019-05-30', 42, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/26', 1, 'A0001', 'Marcador Preto', 19, 'UN', 1.5, '2019-06-15', 28.5, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/26', 2, 'A0003', 'Caneta', 21, 'UN', 1, '2019-06-15', 21, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/26', 3, 'A0004', 'Apagador', 14, 'UN', 3, '2019-06-15', 42, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/27', 1, 'A0001', 'Marcador Preto', 19, 'UN', 1.5, '2019-06-15', 28.5, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/27', 2, 'A0003', 'Caneta', 21, 'UN', 1, '2019-06-15', 21, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/27', 3, 'A0004', 'Apagador', 14, 'UN', 3, '2019-06-15', 42, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/28', 1, 'A0001', 'Marcador Preto', 15, 'UN', 1.5, '2019-06-25', 22.5, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/28', 2, 'A0003', 'Caneta', 21, 'UN', 1, '2019-06-25', 21, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/28', 3, 'A0004', 'Apagador', 14, 'UN', 3, '2019-06-25', 42, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/29', 1, 'A0001', 'Marcador Preto', 16, 'UN', 1.5, '2019-07-10', 24, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/29', 2, 'A0002', 'Pencil', 14, 'UN', 2, '2019-07-10', 28, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/29', 3, 'A0003', 'Caneta', 7, 'UN', 1, '2019-07-10', 7, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/29', 4, 'A0004', 'Apagador', 8, 'UN', 3, '2019-07-10', 24, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/30', 1, 'A0001', 'Marcador Preto', 16, 'UN', 1.5, '2019-07-20', 24, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/30', 2, 'A0002', 'Pencil', 14, 'UN', 2, '2019-07-20', 28, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/30', 3, 'A0003', 'Caneta', 7, 'UN', 1, '2019-07-20', 7, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/30', 4, 'A0004', 'Apagador', 8, 'UN', 3, '2019-07-20', 24, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/31', 1, 'A0001', 'Marcador Preto', 16, 'UN', 1.5, '2019-07-30', 24, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/31', 2, 'A0002', 'Pencil', 14, 'UN', 2, '2019-07-30', 28, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/31', 3, 'A0003', 'Caneta', 7, 'UN', 1, '2019-07-30', 7, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/31', 4, 'A0004', 'Apagador', 8, 'UN', 3, '2019-07-30', 24, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/32', 1, 'A0001', 'Marcador Preto', 13, 'UN', 1.5, '2019-08-05', 19.5, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/32', 2, 'A0003', 'Caneta', 13, 'UN', 1, '2019-08-05', 13, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/33', 1, 'A0004', 'Apagador', 20, 'UN', 3, '2019-08-15', 60, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/34', 1, 'A0001', 'Marcador Preto', 18, 'UN', 1.5, '2019-08-25', 27, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/35', 1, 'A0001', 'Marcador Preto', 19, 'UN', 1.5, '2019-09-01', 28.5, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/36', 1, 'A0001', 'Marcador Preto', 19, 'UN', 1.5, '2019-09-05', 28.5, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/36', 2, 'A0002', 'Pencil', 17, 'UN', 2, '2019-09-05', 34, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/36', 3, 'A0003', 'Caneta', 21, 'UN', 1, '2019-09-05', 21, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/36', 4, 'A0004', 'Apagador', 16, 'UN', 3, '2019-09-05', 48, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/37', 1, 'A0001', 'Marcador Preto', 19, 'UN', 1.5, '2019-09-15', 28.5, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/37', 2, 'A0002', 'Pencil', 17, 'UN', 2, '2019-09-15', 34, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/37', 3, 'A0003', 'Caneta', 21, 'UN', 1, '2019-09-15', 21, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/37', 4, 'A0004', 'Apagador', 16, 'UN', 3, '2019-09-15', 48, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/38', 1, 'A0001', 'Marcador Preto', 19, 'UN', 1.5, '2019-09-25', 28.5, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/38', 2, 'A0002', 'Pencil', 17, 'UN', 2, '2019-09-25', 34, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/38', 3, 'A0003', 'Caneta', 21, 'UN', 1, '2019-09-25', 21, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/38', 4, 'A0004', 'Apagador', 16, 'UN', 3, '2019-09-25', 48, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/39', 1, 'A0001', 'Marcador Preto', 19, 'UN', 1.5, '2019-09-30', 28.5, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/39', 2, 'A0002', 'Pencil', 17, 'UN', 2, '2019-09-30', 34, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/39', 3, 'A0003', 'Caneta', 13, 'UN', 1, '2019-09-30', 13, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/39', 4, 'A0004', 'Apagador', 16, 'UN', 3, '2019-09-30', 48, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/40', 1, 'A0001', 'Marcador Preto', 19, 'UN', 1.5, '2019-10-10', 28.5, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/40', 2, 'A0002', 'Pencil', 17, 'UN', 2, '2019-10-10', 34, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/40', 3, 'A0003', 'Caneta', 13, 'UN', 1, '2019-10-10', 13, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/40', 4, 'A0004', 'Apagador', 16, 'UN', 3, '2019-10-10', 48, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/41', 1, 'A0001', 'Marcador Preto', 19, 'UN', 1.5, '2019-10-25', 28.5, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/41', 2, 'A0002', 'Pencil', 17, 'UN', 2, '2019-10-25', 34, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/41', 3, 'A0003', 'Caneta', 13, 'UN', 1, '2019-10-25', 13, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/41', 4, 'A0004', 'Apagador', 16, 'UN', 3, '2019-10-25', 48, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/42', 1, 'A0001', 'Marcador Preto', 19, 'UN', 1.5, '2019-11-05', 28.5, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/42', 2, 'A0002', 'Pencil', 17, 'UN', 2, '2019-11-05', 34, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/42', 3, 'A0003', 'Caneta', 13, 'UN', 1, '2019-11-05', 13, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/42', 4, 'A0004', 'Apagador', 16, 'UN', 3, '2019-11-05', 48, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/43', 1, 'A0001', 'Marcador Preto', 19, 'UN', 1.5, '2019-11-10', 28.5, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/43', 2, 'A0002', 'Pencil', 17, 'UN', 2, '2019-11-10', 34, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/43', 3, 'A0003', 'Caneta', 13, 'UN', 1, '2019-11-10', 13, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/43', 4, 'A0004', 'Apagador', 16, 'UN', 3, '2019-11-10', 48, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/44', 1, 'A0001', 'Marcador Preto', 19, 'UN', 1.5, '2019-11-20', 28.5, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/44', 2, 'A0002', 'Pencil', 17, 'UN', 2, '2019-11-20', 34, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/44', 3, 'A0003', 'Caneta', 13, 'UN', 1, '2019-11-20', 13, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/44', 4, 'A0004', 'Apagador', 16, 'UN', 3, '2019-11-20', 48, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/45', 1, 'A0001', 'Marcador Preto', 19, 'UN', 1.5, '2019-11-30', 28.5, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/45', 2, 'A0002', 'Pencil', 17, 'UN', 2, '2019-11-30', 34, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/45', 3, 'A0003', 'Caneta', 13, 'UN', 1, '2019-11-30', 13, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/45', 4, 'A0004', 'Apagador', 16, 'UN', 3, '2019-11-30', 48, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/46', 1, 'A0001', 'Marcador Preto', 19, 'UN', 1.5, '2019-12-05', 28.5, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/46', 2, 'A0002', 'Pencil', 17, 'UN', 2, '2019-12-05', 34, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/46', 3, 'A0003', 'Caneta', 13, 'UN', 1, '2019-12-05', 13, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/46', 4, 'A0004', 'Apagador', 16, 'UN', 3, '2019-12-05', 48, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/47', 1, 'A0001', 'Marcador Preto', 19, 'UN', 1.5, '2019-12-10', 28.5, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/47', 2, 'A0002', 'Pencil', 17, 'UN', 2, '2019-12-10', 34, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/47', 3, 'A0003', 'Caneta', 13, 'UN', 1, '2019-12-10', 13, 0, 'IVA', 'PT', 'NOR', 23),
('FA A/47', 4, 'A0004', 'Apagador', 6, 'UN', 3, '2019-12-10', 18, 0, 'IVA', 'PT', 'NOR', 23),
('FS A/3', 1, 'A0001', 'Marcador Preto', 5, 'UN', 1.5, '2019-01-28', 7.5, 0, 'IVA', 'PT', 'NOR', 23),
('FS A/3', 2, 'A0002', 'Pencil', 10, 'UN', 2, '2019-01-28', 20, 0, 'IVA', 'PT', 'NOR', 23),
('FS A/3', 3, 'A0004', 'Apagador', 2, 'UN', 3, '2019-01-28', 6, 0, 'IVA', 'PT', 'NOR', 23),
('FS A/3', 4, 'A0003', 'Caneta', 1, 'UN', 1, '2019-01-28', 1, 0, 'IVA', 'PT', 'NOR', 23),
('FS A/4', 1, 'A0001', 'Marcador Preto', 5, 'UN', 1.5, '2019-02-05', 7.5, 0, 'IVA', 'PT', 'NOR', 23),
('FS A/4', 2, 'A0002', 'Pencil', 10, 'UN', 2, '2019-02-05', 20, 0, 'IVA', 'PT', 'NOR', 23),
('FS A/4', 3, 'A0004', 'Apagador', 2, 'UN', 3, '2019-02-05', 6, 0, 'IVA', 'PT', 'NOR', 23),
('FS A/4', 4, 'A0003', 'Caneta', 5, 'UN', 1, '2019-02-05', 5, 0, 'IVA', 'PT', 'NOR', 23),
('FS A/5', 1, 'A0004', 'Apagador', 15, 'UN', 3, '2019-02-20', 45, 0, 'IVA', 'PT', 'NOR', 23),
('FS A/5', 2, 'A0003', 'Caneta', 10, 'UN', 1, '2019-02-20', 10, 0, 'IVA', 'PT', 'NOR', 23),
('FS A/6', 1, 'A0004', 'Apagador', 15, 'UN', 3, '2019-02-23', 45, 0, 'IVA', 'PT', 'NOR', 23),
('FS A/6', 2, 'A0003', 'Caneta', 10, 'UN', 1, '2019-02-23', 10, 0, 'IVA', 'PT', 'NOR', 23),
('FS A/7', 1, 'A0004', 'Apagador', 15, 'UN', 3, '2019-02-26', 45, 0, 'IVA', 'PT', 'NOR', 23),
('FS A/7', 2, 'A0003', 'Caneta', 10, 'UN', 1, '2019-02-26', 10, 0, 'IVA', 'PT', 'NOR', 23),
('FS A/8', 1, 'A0004', 'Apagador', 15, 'UN', 3, '2019-02-28', 45, 0, 'IVA', 'PT', 'NOR', 23),
('FS A/8', 2, 'A0003', 'Caneta', 10, 'UN', 1, '2019-02-28', 10, 0, 'IVA', 'PT', 'NOR', 23);

-- --------------------------------------------------------

--
-- Estrutura da tabela `suppliers`
--

DROP TABLE IF EXISTS `suppliers`;
CREATE TABLE IF NOT EXISTS `suppliers` (
  `SupplierID` varchar(20) DEFAULT NULL,
  `AccountID` varchar(15) DEFAULT NULL,
  `SupplierTaxID` varchar(15) DEFAULT NULL,
  `CompanyName` varchar(60) DEFAULT NULL,
  `BillingAddressDetail` varchar(60) DEFAULT NULL,
  `BillingCity` varchar(30) DEFAULT NULL,
  `BillingPostalCode` varchar(15) DEFAULT NULL,
  `BillingCountry` varchar(15) DEFAULT NULL,
  `ShipFromAddressDetail` varchar(60) DEFAULT NULL,
  `ShipFromCity` varchar(30) DEFAULT NULL,
  `ShipFromPostalCode` varchar(15) DEFAULT NULL,
  `ShipFromCountry` varchar(15) DEFAULT NULL,
  `Telephone` varchar(20) DEFAULT NULL,
  `Fax` varchar(20) DEFAULT NULL,
  `Email` varchar(30) DEFAULT NULL,
  `Website` varchar(30) DEFAULT NULL,
  `SelfBillingIndicator` int(11) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `suppliers`
--

INSERT INTO `suppliers` (`SupplierID`, `AccountID`, `SupplierTaxID`, `CompanyName`, `BillingAddressDetail`, `BillingCity`, `BillingPostalCode`, `BillingCountry`, `ShipFromAddressDetail`, `ShipFromCity`, `ShipFromPostalCode`, `ShipFromCountry`, `Telephone`, `Fax`, `Email`, `Website`, `SelfBillingIndicator`) VALUES
('513076549_F', '221111', '513076549', 'ABC Lda', 'Rua Z', 'Desconhecido', '1000-000', 'PT', 'Rua Z', 'Desconhecido', '1000-000', 'PT', NULL, NULL, NULL, NULL, 0);

-- --------------------------------------------------------

--
-- Estrutura da tabela `transactionlines`
--

DROP TABLE IF EXISTS `transactionlines`;
CREATE TABLE IF NOT EXISTS `transactionlines` (
  `TransactionID` varchar(30) DEFAULT NULL,
  `TransactionType` varchar(6) DEFAULT NULL,
  `RecordID` int(11) DEFAULT NULL,
  `AccountID` varchar(45) DEFAULT NULL,
  `SourceDocumentID` varchar(20) DEFAULT NULL,
  `SystemEntryDate` datetime DEFAULT NULL,
  `Description` varchar(30) DEFAULT NULL,
  `Amount` float DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `transactionlines`
--

INSERT INTO `transactionlines` (`TransactionID`, `TransactionType`, `RecordID`, `AccountID`, `SourceDocumentID`, `SystemEntryDate`, `Description`, `Amount`) VALUES
('2019-01-01 00041 10001', 'Credit', 1, '221111', 'VFA A/4', '2018-12-14 17:51:44', 'VFA Nº 4/A', NULL),
('2019-01-01 00041 10001', 'Debit', 2, '3111', 'VFA A/4', '2018-12-14 17:51:44', 'VFA Nº 4/A', NULL),
('2019-01-01 00041 10001', 'Debit', 3, '24321132311', 'VFA A/4', '2018-12-14 17:51:44', 'VFA Nº 4/A', NULL),
('2019-01-14 00041 10002', 'Credit', 1, '221111', 'VFA A/6', '2018-12-14 18:28:30', 'VFA Nº 6/A', NULL),
('2019-01-14 00041 10002', 'Debit', 2, '3111', 'VFA A/6', '2018-12-14 18:28:30', 'VFA Nº 6/A', NULL),
('2019-01-14 00041 10002', 'Debit', 3, '24321132311', 'VFA A/6', '2018-12-14 18:28:30', 'VFA Nº 6/A', NULL),
('2019-01-15 00041 10003', 'Credit', 1, '221112', 'VFA A/7', '2018-12-15 11:49:53', 'VFA Nº 7/A', NULL),
('2019-01-15 00041 10003', 'Debit', 2, '3111', 'VFA A/7', '2018-12-15 11:49:53', 'VFA Nº 7/A', NULL),
('2019-01-15 00041 10003', 'Debit', 3, '24321132311', 'VFA A/7', '2018-12-15 11:49:53', 'VFA Nº 7/A', NULL),
('2019-01-15 00041 10004', 'Credit', 1, '221111', 'VFA A/8', '2018-12-15 11:57:42', 'VFA Nº 8/A', NULL),
('2019-01-15 00041 10004', 'Debit', 2, '3111', 'VFA A/8', '2018-12-15 11:57:42', 'VFA Nº 8/A', NULL),
('2019-01-15 00041 10004', 'Debit', 3, '24321132311', 'VFA A/8', '2018-12-15 11:57:42', 'VFA Nº 8/A', NULL),
('2019-02-10 00041 20001', 'Credit', 1, '221112', 'VFA A/9', '2018-12-15 12:22:17', 'VFA Nº 9/A', NULL),
('2019-02-10 00041 20001', 'Debit', 2, '3111', 'VFA A/9', '2018-12-15 12:22:17', 'VFA Nº 9/A', NULL),
('2019-02-10 00041 20001', 'Debit', 3, '24321132311', 'VFA A/9', '2018-12-15 12:22:17', 'VFA Nº 9/A', NULL),
('2019-03-01 00041 30001', 'Credit', 1, '221111', 'VFA A/10', '2018-12-15 12:33:50', 'VFA Nº 10/A', NULL),
('2019-03-01 00041 30001', 'Debit', 2, '3111', 'VFA A/10', '2018-12-15 12:33:50', 'VFA Nº 10/A', NULL),
('2019-03-01 00041 30001', 'Debit', 3, '24321132311', 'VFA A/10', '2018-12-15 12:33:50', 'VFA Nº 10/A', NULL),
('2019-03-15 00041 30002', 'Credit', 1, '221112', 'VFA A/11', '2018-12-15 12:42:24', 'VFA Nº 11/A', NULL),
('2019-03-15 00041 30002', 'Debit', 2, '3111', 'VFA A/11', '2018-12-15 12:42:24', 'VFA Nº 11/A', NULL),
('2019-03-15 00041 30002', 'Debit', 3, '24321132311', 'VFA A/11', '2018-12-15 12:42:24', 'VFA Nº 11/A', NULL),
('2019-04-01 00041 40001', 'Credit', 1, '221112', 'VFA A/12', '2018-12-15 12:47:17', 'VFA Nº 12/A', NULL),
('2019-04-01 00041 40001', 'Debit', 2, '3111', 'VFA A/12', '2018-12-15 12:47:17', 'VFA Nº 12/A', NULL),
('2019-04-01 00041 40001', 'Debit', 3, '24321132311', 'VFA A/12', '2018-12-15 12:47:17', 'VFA Nº 12/A', NULL),
('2019-04-20 00041 40002', 'Credit', 1, '221111', 'VFA A/13', '2018-12-15 12:53:28', 'VFA Nº 13/A', NULL),
('2019-04-20 00041 40002', 'Debit', 2, '3111', 'VFA A/13', '2018-12-15 12:53:28', 'VFA Nº 13/A', NULL),
('2019-04-20 00041 40002', 'Debit', 3, '24321132311', 'VFA A/13', '2018-12-15 12:53:28', 'VFA Nº 13/A', NULL),
('2019-05-05 00041 50001', 'Credit', 1, '221112', 'VFA A/14', '2018-12-15 12:57:32', 'VFA Nº 14/A', NULL),
('2019-05-05 00041 50001', 'Debit', 2, '3111', 'VFA A/14', '2018-12-15 12:57:32', 'VFA Nº 14/A', NULL),
('2019-05-05 00041 50001', 'Debit', 3, '24321132311', 'VFA A/14', '2018-12-15 12:57:32', 'VFA Nº 14/A', NULL),
('2019-05-15 00041 50002', 'Credit', 1, '221111', 'VFA A/15', '2018-12-15 13:00:38', 'VFA Nº 15/A', NULL),
('2019-05-15 00041 50002', 'Debit', 2, '3111', 'VFA A/15', '2018-12-15 13:00:38', 'VFA Nº 15/A', NULL),
('2019-05-15 00041 50002', 'Debit', 3, '24321132311', 'VFA A/15', '2018-12-15 13:00:38', 'VFA Nº 15/A', NULL),
('2019-07-05 00041 70001', 'Credit', 1, '221112', 'VFA A/16', '2018-12-15 13:17:47', 'VFA Nº 16/A', NULL),
('2019-07-05 00041 70001', 'Debit', 2, '3111', 'VFA A/16', '2018-12-15 13:17:47', 'VFA Nº 16/A', NULL),
('2019-07-05 00041 70001', 'Debit', 3, '24321132311', 'VFA A/16', '2018-12-15 13:17:47', 'VFA Nº 16/A', NULL),
('2019-09-15 00041 90001', 'Credit', 1, '221112', 'VFA A/17', '2018-12-15 15:48:12', 'VFA Nº 17/A', NULL),
('2019-09-15 00041 90001', 'Debit', 2, '3111', 'VFA A/17', '2018-12-15 15:48:12', 'VFA Nº 17/A', NULL),
('2019-09-15 00041 90001', 'Debit', 3, '24321132311', 'VFA A/17', '2018-12-15 15:48:12', 'VFA Nº 17/A', NULL),
('2019-09-20 00041 90002', 'Credit', 1, '221112', 'VFA A/18', '2018-12-15 15:51:27', 'VFA Nº 18/A', NULL),
('2019-09-20 00041 90002', 'Debit', 2, '3111', 'VFA A/18', '2018-12-15 15:51:27', 'VFA Nº 18/A', NULL),
('2019-09-20 00041 90002', 'Debit', 3, '24321132311', 'VFA A/18', '2018-12-15 15:51:27', 'VFA Nº 18/A', NULL),
('2019-10-05 00041 100001', 'Credit', 1, '221111', 'VFA A/19', '2018-12-15 15:55:50', 'VFA Nº 19/A', NULL),
('2019-10-05 00041 100001', 'Debit', 2, '3111', 'VFA A/19', '2018-12-15 15:55:50', 'VFA Nº 19/A', NULL),
('2019-10-05 00041 100001', 'Debit', 3, '24321132311', 'VFA A/19', '2018-12-15 15:55:50', 'VFA Nº 19/A', NULL),
('2019-10-20 00041 100002', 'Credit', 1, '221112', 'VFA A/20', '2018-12-15 15:58:48', 'VFA Nº 20/A', NULL),
('2019-10-20 00041 100002', 'Debit', 2, '3111', 'VFA A/20', '2018-12-15 15:58:48', 'VFA Nº 20/A', NULL),
('2019-10-20 00041 100002', 'Debit', 3, '24321132311', 'VFA A/20', '2018-12-15 15:58:48', 'VFA Nº 20/A', NULL),
('2019-11-15 00041 110001', 'Credit', 1, '221112', 'VFA A/21', '2018-12-15 16:04:58', 'VFA Nº 21/A', NULL),
('2019-11-15 00041 110001', 'Debit', 2, '3111', 'VFA A/21', '2018-12-15 16:04:58', 'VFA Nº 21/A', NULL),
('2019-11-15 00041 110001', 'Debit', 3, '24321132311', 'VFA A/21', '2018-12-15 16:04:58', 'VFA Nº 21/A', NULL),
('2019-01-16 00051 10001', 'Debit', 1, '2111124', 'FA A/6', '2018-12-15 12:05:28', 'FA Nº 6/A', NULL),
('2019-01-16 00051 10001', 'Credit', 2, '7111', 'FA A/6', '2018-12-15 12:05:28', 'FA Nº 6/A', NULL),
('2019-01-16 00051 10001', 'Credit', 3, '24331113231', 'FA A/6', '2018-12-15 12:05:28', 'FA Nº 6/A', NULL),
('2019-01-20 00051 10002', 'Debit', 1, '2111124', 'FA A/7', '2018-12-15 12:06:19', 'FA Nº 7/A', NULL),
('2019-01-20 00051 10002', 'Credit', 2, '7111', 'FA A/7', '2018-12-15 12:06:19', 'FA Nº 7/A', NULL),
('2019-01-20 00051 10002', 'Credit', 3, '24331113231', 'FA A/7', '2018-12-15 12:06:19', 'FA Nº 7/A', NULL),
('2019-01-25 00051 10003', 'Debit', 1, '2111123', 'FA A/8', '2018-12-15 12:08:25', 'FA Nº 8/A', NULL),
('2019-01-25 00051 10003', 'Credit', 2, '7111', 'FA A/8', '2018-12-15 12:08:25', 'FA Nº 8/A', NULL),
('2019-01-25 00051 10003', 'Credit', 3, '24331113231', 'FA A/8', '2018-12-15 12:08:25', 'FA Nº 8/A', NULL),
('2019-01-25 00051 10004', 'Debit', 1, '2111122', 'FA A/9', '2018-12-15 12:09:40', 'FA Nº 9/A', NULL),
('2019-01-25 00051 10004', 'Credit', 2, '7111', 'FA A/9', '2018-12-15 12:09:40', 'FA Nº 9/A', NULL),
('2019-01-25 00051 10004', 'Credit', 3, '24331113231', 'FA A/9', '2018-12-15 12:09:40', 'FA Nº 9/A', NULL),
('2019-02-10 00051 20001', 'Debit', 1, '2111122', 'FA A/10', '2018-12-15 12:24:26', 'FA Nº 10/A', NULL),
('2019-02-10 00051 20001', 'Credit', 2, '7111', 'FA A/10', '2018-12-15 12:24:26', 'FA Nº 10/A', NULL),
('2019-02-10 00051 20001', 'Credit', 3, '24331113231', 'FA A/10', '2018-12-15 12:24:26', 'FA Nº 10/A', NULL),
('2019-02-10 00051 20002', 'Debit', 1, '2111124', 'FA A/11', '2018-12-15 12:25:53', 'FA Nº 11/A', NULL),
('2019-02-10 00051 20002', 'Credit', 2, '7111', 'FA A/11', '2018-12-15 12:25:53', 'FA Nº 11/A', NULL),
('2019-02-10 00051 20002', 'Credit', 3, '24331113231', 'FA A/11', '2018-12-15 12:25:53', 'FA Nº 11/A', NULL),
('2019-02-15 00051 20003', 'Debit', 1, '2111123', 'FA A/12', '2018-12-15 12:26:26', 'FA Nº 12/A', NULL),
('2019-02-15 00051 20003', 'Credit', 2, '7111', 'FA A/12', '2018-12-15 12:26:26', 'FA Nº 12/A', NULL),
('2019-02-15 00051 20003', 'Credit', 3, '24331113231', 'FA A/12', '2018-12-15 12:26:26', 'FA Nº 12/A', NULL),
('2019-03-03 00051 30001', 'Debit', 1, '2111122', 'FA A/13', '2018-12-15 12:39:40', 'FA Nº 13/A', NULL),
('2019-03-03 00051 30001', 'Credit', 2, '7111', 'FA A/13', '2018-12-15 12:39:40', 'FA Nº 13/A', NULL),
('2019-03-03 00051 30001', 'Credit', 3, '24331113231', 'FA A/13', '2018-12-15 12:39:40', 'FA Nº 13/A', NULL),
('2019-03-10 00051 30002', 'Debit', 1, '2111122', 'FA A/14', '2018-12-15 12:40:11', 'FA Nº 14/A', NULL),
('2019-03-10 00051 30002', 'Credit', 2, '7111', 'FA A/14', '2018-12-15 12:40:11', 'FA Nº 14/A', NULL),
('2019-03-10 00051 30002', 'Credit', 3, '24331113231', 'FA A/14', '2018-12-15 12:40:11', 'FA Nº 14/A', NULL),
('2019-03-20 00051 30003', 'Debit', 1, '2111123', 'FA A/15', '2018-12-15 12:44:34', 'FA Nº 15/A', NULL),
('2019-03-20 00051 30003', 'Credit', 2, '7111', 'FA A/15', '2018-12-15 12:44:34', 'FA Nº 15/A', NULL),
('2019-03-20 00051 30003', 'Credit', 3, '24331113231', 'FA A/15', '2018-12-15 12:44:34', 'FA Nº 15/A', NULL),
('2019-03-28 00051 30004', 'Debit', 1, '2111124', 'FA A/16', '2018-12-15 12:45:13', 'FA Nº 16/A', NULL),
('2019-03-28 00051 30004', 'Credit', 2, '7111', 'FA A/16', '2018-12-15 12:45:13', 'FA Nº 16/A', NULL),
('2019-03-28 00051 30004', 'Credit', 3, '24331113231', 'FA A/16', '2018-12-15 12:45:13', 'FA Nº 16/A', NULL),
('2019-04-05 00051 40001', 'Debit', 1, '2111124', 'FA A/17', '2018-12-15 12:48:59', 'FA Nº 17/A', NULL),
('2019-04-05 00051 40001', 'Credit', 2, '7111', 'FA A/17', '2018-12-15 12:48:59', 'FA Nº 17/A', NULL),
('2019-04-05 00051 40001', 'Credit', 3, '24331113231', 'FA A/17', '2018-12-15 12:48:59', 'FA Nº 17/A', NULL),
('2019-04-10 00051 40002', 'Debit', 1, '2111122', 'FA A/18', '2018-12-15 12:49:49', 'FA Nº 18/A', NULL),
('2019-04-10 00051 40002', 'Credit', 2, '7111', 'FA A/18', '2018-12-15 12:49:49', 'FA Nº 18/A', NULL),
('2019-04-10 00051 40002', 'Credit', 3, '24331113231', 'FA A/18', '2018-12-15 12:49:49', 'FA Nº 18/A', NULL),
('2019-04-15 00051 40003', 'Debit', 1, '2111122', 'FA A/19', '2018-12-15 12:51:04', 'FA Nº 19/A', NULL),
('2019-04-15 00051 40003', 'Credit', 2, '7111', 'FA A/19', '2018-12-15 12:51:04', 'FA Nº 19/A', NULL),
('2019-04-15 00051 40003', 'Credit', 3, '24331113231', 'FA A/19', '2018-12-15 12:51:04', 'FA Nº 19/A', NULL),
('2019-04-25 00051 40004', 'Debit', 1, '2111123', 'FA A/20', '2018-12-15 12:54:26', 'FA Nº 20/A', NULL),
('2019-04-25 00051 40004', 'Credit', 2, '7111', 'FA A/20', '2018-12-15 12:54:26', 'FA Nº 20/A', NULL),
('2019-04-25 00051 40004', 'Credit', 3, '24331113231', 'FA A/20', '2018-12-15 12:54:26', 'FA Nº 20/A', NULL),
('2019-04-30 00051 40005', 'Debit', 1, '2111123', 'FA A/21', '2018-12-15 12:55:03', 'FA Nº 21/A', NULL),
('2019-04-30 00051 40005', 'Credit', 2, '7111', 'FA A/21', '2018-12-15 12:55:03', 'FA Nº 21/A', NULL),
('2019-04-30 00051 40005', 'Credit', 3, '24331113231', 'FA A/21', '2018-12-15 12:55:03', 'FA Nº 21/A', NULL),
('2019-05-10 00051 50001', 'Debit', 1, '2111124', 'FA A/22', '2018-12-15 12:59:09', 'FA Nº 22/A', NULL),
('2019-05-10 00051 50001', 'Credit', 2, '7111', 'FA A/22', '2018-12-15 12:59:09', 'FA Nº 22/A', NULL),
('2019-05-10 00051 50001', 'Credit', 3, '24331113231', 'FA A/22', '2018-12-15 12:59:09', 'FA Nº 22/A', NULL),
('2019-05-20 00051 50002', 'Debit', 1, '2111122', 'FA A/23', '2018-12-15 13:02:41', 'FA Nº 23/A', NULL),
('2019-05-20 00051 50002', 'Credit', 2, '7111', 'FA A/23', '2018-12-15 13:02:41', 'FA Nº 23/A', NULL),
('2019-05-20 00051 50002', 'Credit', 3, '24331113231', 'FA A/23', '2018-12-15 13:02:41', 'FA Nº 23/A', NULL),
('2019-05-25 00051 50003', 'Debit', 1, '2111122', 'FA A/24', '2018-12-15 13:03:29', 'FA Nº 24/A', NULL),
('2019-05-25 00051 50003', 'Credit', 2, '7111', 'FA A/24', '2018-12-15 13:03:29', 'FA Nº 24/A', NULL),
('2019-05-25 00051 50003', 'Credit', 3, '24331113231', 'FA A/24', '2018-12-15 13:03:29', 'FA Nº 24/A', NULL),
('2019-05-30 00051 50004', 'Debit', 1, '2111122', 'FA A/25', '2018-12-15 13:04:09', 'FA Nº 25/A', NULL),
('2019-05-30 00051 50004', 'Credit', 2, '7111', 'FA A/25', '2018-12-15 13:04:09', 'FA Nº 25/A', NULL),
('2019-05-30 00051 50004', 'Credit', 3, '24331113231', 'FA A/25', '2018-12-15 13:04:09', 'FA Nº 25/A', NULL),
('2019-06-05 00051 60001', 'Debit', 1, '2111122', 'FA A/26', '2018-12-15 13:12:50', 'FA Nº 26/A', NULL),
('2019-06-05 00051 60001', 'Credit', 2, '7111', 'FA A/26', '2018-12-15 13:12:50', 'FA Nº 26/A', NULL),
('2019-06-05 00051 60001', 'Credit', 3, '24331113231', 'FA A/26', '2018-12-15 13:12:50', 'FA Nº 26/A', NULL),
('2019-06-15 00051 60002', 'Debit', 1, '2111123', 'FA A/27', '2018-12-15 13:14:59', 'FA Nº 27/A', NULL),
('2019-06-15 00051 60002', 'Credit', 2, '7111', 'FA A/27', '2018-12-15 13:14:59', 'FA Nº 27/A', NULL),
('2019-06-15 00051 60002', 'Credit', 3, '24331113231', 'FA A/27', '2018-12-15 13:14:59', 'FA Nº 27/A', NULL),
('2019-06-25 00051 60003', 'Debit', 1, '2111124', 'FA A/28', '2018-12-15 13:15:32', 'FA Nº 28/A', NULL),
('2019-06-25 00051 60003', 'Credit', 2, '7111', 'FA A/28', '2018-12-15 13:15:32', 'FA Nº 28/A', NULL),
('2019-06-25 00051 60003', 'Credit', 3, '24331113231', 'FA A/28', '2018-12-15 13:15:32', 'FA Nº 28/A', NULL),
('2019-07-10 00051 70001', 'Debit', 1, '2111122', 'FA A/29', '2018-12-15 13:19:54', 'FA Nº 29/A', NULL),
('2019-07-10 00051 70001', 'Credit', 2, '7111', 'FA A/29', '2018-12-15 13:19:54', 'FA Nº 29/A', NULL),
('2019-07-10 00051 70001', 'Credit', 3, '24331113231', 'FA A/29', '2018-12-15 13:19:54', 'FA Nº 29/A', NULL),
('2019-07-20 00051 70002', 'Debit', 1, '2111123', 'FA A/30', '2018-12-15 13:20:35', 'FA Nº 30/A', NULL),
('2019-07-20 00051 70002', 'Credit', 2, '7111', 'FA A/30', '2018-12-15 13:20:35', 'FA Nº 30/A', NULL),
('2019-07-20 00051 70002', 'Credit', 3, '24331113231', 'FA A/30', '2018-12-15 13:20:35', 'FA Nº 30/A', NULL),
('2019-07-30 00051 70003', 'Debit', 1, '2111123', 'FA A/31', '2018-12-15 13:21:17', 'FA Nº 31/A', NULL),
('2019-07-30 00051 70003', 'Credit', 2, '7111', 'FA A/31', '2018-12-15 13:21:17', 'FA Nº 31/A', NULL),
('2019-07-30 00051 70003', 'Credit', 3, '24331113231', 'FA A/31', '2018-12-15 13:21:17', 'FA Nº 31/A', NULL),
('2019-08-05 00051 80001', 'Debit', 1, '2111124', 'FA A/32', '2018-12-15 15:41:28', 'FA Nº 32/A', NULL),
('2019-08-05 00051 80001', 'Credit', 2, '7111', 'FA A/32', '2018-12-15 15:41:28', 'FA Nº 32/A', NULL),
('2019-08-05 00051 80001', 'Credit', 3, '24331113231', 'FA A/32', '2018-12-15 15:41:28', 'FA Nº 32/A', NULL),
('2019-08-15 00051 80002', 'Debit', 1, '2111123', 'FA A/33', '2018-12-15 15:42:22', 'FA Nº 33/A', NULL),
('2019-08-15 00051 80002', 'Credit', 2, '7111', 'FA A/33', '2018-12-15 15:42:22', 'FA Nº 33/A', NULL),
('2019-08-15 00051 80002', 'Credit', 3, '24331113231', 'FA A/33', '2018-12-15 15:42:22', 'FA Nº 33/A', NULL),
('2019-08-25 00051 80003', 'Debit', 1, '2111122', 'FA A/34', '2018-12-15 15:44:33', 'FA Nº 34/A', NULL),
('2019-08-25 00051 80003', 'Credit', 2, '7111', 'FA A/34', '2018-12-15 15:44:33', 'FA Nº 34/A', NULL),
('2019-08-25 00051 80003', 'Credit', 3, '24331113231', 'FA A/34', '2018-12-15 15:44:33', 'FA Nº 34/A', NULL),
('2019-09-01 00051 90001', 'Debit', 1, '2111123', 'FA A/35', '2018-12-15 15:46:01', 'FA Nº 35/A', NULL),
('2019-09-01 00051 90001', 'Credit', 2, '7111', 'FA A/35', '2018-12-15 15:46:01', 'FA Nº 35/A', NULL),
('2019-09-01 00051 90001', 'Credit', 3, '24331113231', 'FA A/35', '2018-12-15 15:46:01', 'FA Nº 35/A', NULL),
('2019-09-05 00051 90002', 'Debit', 1, '2111124', 'FA A/36', '2018-12-15 15:49:35', 'FA Nº 36/A', NULL),
('2019-09-05 00051 90002', 'Credit', 2, '7111', 'FA A/36', '2018-12-15 15:49:35', 'FA Nº 36/A', NULL),
('2019-09-05 00051 90002', 'Credit', 3, '24331113231', 'FA A/36', '2018-12-15 15:49:35', 'FA Nº 36/A', NULL),
('2019-09-15 00051 90003', 'Debit', 1, '2111123', 'FA A/37', '2018-12-15 15:50:23', 'FA Nº 37/A', NULL),
('2019-09-15 00051 90003', 'Credit', 2, '7111', 'FA A/37', '2018-12-15 15:50:23', 'FA Nº 37/A', NULL),
('2019-09-15 00051 90003', 'Credit', 3, '24331113231', 'FA A/37', '2018-12-15 15:50:23', 'FA Nº 37/A', NULL),
('2019-09-25 00051 90004', 'Debit', 1, '2111123', 'FA A/38', '2018-12-15 15:52:53', 'FA Nº 38/A', NULL),
('2019-09-25 00051 90004', 'Credit', 2, '7111', 'FA A/38', '2018-12-15 15:52:53', 'FA Nº 38/A', NULL),
('2019-09-25 00051 90004', 'Credit', 3, '24331113231', 'FA A/38', '2018-12-15 15:52:53', 'FA Nº 38/A', NULL),
('2019-09-30 00051 90005', 'Debit', 1, '2111123', 'FA A/39', '2018-12-15 15:54:16', 'FA Nº 39/A', NULL),
('2019-09-30 00051 90005', 'Credit', 2, '7111', 'FA A/39', '2018-12-15 15:54:16', 'FA Nº 39/A', NULL),
('2019-09-30 00051 90005', 'Credit', 3, '24331113231', 'FA A/39', '2018-12-15 15:54:16', 'FA Nº 39/A', NULL),
('2019-10-10 00051 100001', 'Debit', 1, '2111123', 'FA A/40', '2018-12-15 15:57:29', 'FA Nº 40/A', NULL),
('2019-10-10 00051 100001', 'Credit', 2, '7111', 'FA A/40', '2018-12-15 15:57:29', 'FA Nº 40/A', NULL),
('2019-10-10 00051 100001', 'Credit', 3, '24331113231', 'FA A/40', '2018-12-15 15:57:29', 'FA Nº 40/A', NULL),
('2019-10-25 00051 100002', 'Debit', 1, '2111124', 'FA A/41', '2018-12-15 15:59:53', 'FA Nº 41/A', NULL),
('2019-10-25 00051 100002', 'Credit', 2, '7111', 'FA A/41', '2018-12-15 15:59:53', 'FA Nº 41/A', NULL),
('2019-10-25 00051 100002', 'Credit', 3, '24331113231', 'FA A/41', '2018-12-15 15:59:53', 'FA Nº 41/A', NULL),
('2019-11-05 00051 110001', 'Debit', 1, '2111124', 'FA A/42', '2018-12-15 16:00:26', 'FA Nº 42/A', NULL),
('2019-11-05 00051 110001', 'Credit', 2, '7111', 'FA A/42', '2018-12-15 16:00:26', 'FA Nº 42/A', NULL),
('2019-11-05 00051 110001', 'Credit', 3, '24331113231', 'FA A/42', '2018-12-15 16:00:26', 'FA Nº 42/A', NULL),
('2019-11-10 00051 110002', 'Debit', 1, '2111124', 'FA A/43', '2018-12-15 16:03:19', 'FA Nº 43/A', NULL),
('2019-11-10 00051 110002', 'Credit', 2, '7111', 'FA A/43', '2018-12-15 16:03:19', 'FA Nº 43/A', NULL),
('2019-11-10 00051 110002', 'Credit', 3, '24331113231', 'FA A/43', '2018-12-15 16:03:19', 'FA Nº 43/A', NULL),
('2019-11-20 00051 110003', 'Debit', 1, '2111123', 'FA A/44', '2018-12-15 16:06:09', 'FA Nº 44/A', NULL),
('2019-11-20 00051 110003', 'Credit', 2, '7111', 'FA A/44', '2018-12-15 16:06:09', 'FA Nº 44/A', NULL),
('2019-11-20 00051 110003', 'Credit', 3, '24331113231', 'FA A/44', '2018-12-15 16:06:09', 'FA Nº 44/A', NULL),
('2019-11-30 00051 110004', 'Debit', 1, '2111123', 'FA A/45', '2018-12-15 16:06:56', 'FA Nº 45/A', NULL),
('2019-11-30 00051 110004', 'Credit', 2, '7111', 'FA A/45', '2018-12-15 16:06:56', 'FA Nº 45/A', NULL),
('2019-11-30 00051 110004', 'Credit', 3, '24331113231', 'FA A/45', '2018-12-15 16:06:56', 'FA Nº 45/A', NULL),
('2019-12-05 00051 120001', 'Debit', 1, '2111124', 'FA A/46', '2018-12-15 16:07:52', 'FA Nº 46/A', NULL),
('2019-12-05 00051 120001', 'Credit', 2, '7111', 'FA A/46', '2018-12-15 16:07:52', 'FA Nº 46/A', NULL),
('2019-12-05 00051 120001', 'Credit', 3, '24331113231', 'FA A/46', '2018-12-15 16:07:52', 'FA Nº 46/A', NULL),
('2019-12-10 00051 120002', 'Debit', 1, '2111122', 'FA A/47', '2018-12-15 16:08:51', 'FA Nº 47/A', NULL),
('2019-12-10 00051 120002', 'Credit', 2, '7111', 'FA A/47', '2018-12-15 16:08:51', 'FA Nº 47/A', NULL),
('2019-12-10 00051 120002', 'Credit', 3, '24331113231', 'FA A/47', '2018-12-15 16:08:51', 'FA Nº 47/A', NULL);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
