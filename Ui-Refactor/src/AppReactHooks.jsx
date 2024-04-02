import React, { useState } from 'react';
import { Button } from '@cgn/framework-ui-components/v1';
import { Table } from '@cgn/framework-ui-components/v2';

function InvoiceHeader({ invoice }) {
  let date = new Date(invoice.date);
  let giorno = date.getDate();
  let mese = date.getMonth() + 1;
  let anno = date.getFullYear();
  let ore = date.getHours();
  let completeDate = giorno + '/' + mese + '/' + anno + ' ' + ore;

  return (
    <div className="invoiceapp-invoice__header">
      <div className="invoiceapp-invoice__header__title invoiceapp-invoice__header__title--company">
        <span>Company: {invoice.company}</span>
      </div>
      <div className="invoiceapp-invoice__data">
        <span className="invoiceapp-invoice__header__title invoiceapp-invoice__header__title--client">
          Client: {invoice.client}
        </span>
        <span className="invoiceapp-invoice__data__value invoiceapp-invoice__data__value--invoice">
          Invoice: {invoice.number}
        </span>
        <span className="invoiceapp-invoice__data__value invoiceapp-invoice__data__value--date">
          Date: {completeDate}
        </span>
      </div>
    </div>
  );
}

function BottomHeader({ invoice, currentPage, totalPages, onPageChange }) {
  let totalCostInvoice = 0;
  invoice.items.forEach(item => {
    totalCostInvoice += item.price * item.quantity;
  });

  return (
    <>
      <div className="invoiceapp-invoice__paging">
        <Button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>&#60;</Button>
        <span>Page {currentPage} di {totalPages}</span>
        <Button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>&#62;</Button>
      </div>
      <div className="invoiceapp-invoice__summary">
        <span>Total Cost: {totalCostInvoice}</span>
      </div>
    </>
  );
}

function TableData({ description, quantity, price, tax }) {
  let amount = quantity * price;
  return (
    <Table.Row className="invoiceapp-invoice__table-row">
      <Table.Cell>{description}</Table.Cell>
      <Table.Cell>{quantity}</Table.Cell>
      <Table.Cell>{price}</Table.Cell>
      <Table.Cell>{tax}</Table.Cell>
      <Table.Cell>{amount}</Table.Cell>
    </Table.Row>
  );
}

function InvoiceItems({ invoice, currentPage, itemsPerPage }) {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, invoice.items.length);
  const visibleItems = invoice.items.slice(startIndex, endIndex);

  return (
    <>
      {visibleItems.map((item, index) => (
        <TableData {...item} key={invoice.number + index} />
      ))}
    </>
  );
}

function AppReactHooks({ invoice }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(invoice.items.length / itemsPerPage);

  const onPageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="invoiceapp invoiceapp-invoice">

      <InvoiceHeader invoice={invoice} />

      <Table className="invoiceapp-invoice__table">
        <Table.Head className="invoiceapp-invoice__table-row invoiceapp-invoice__table-row--header">
          <Table.Column title="Description"></Table.Column>
          <Table.Column title="Qty"></Table.Column>
          <Table.Column title="Unit price" ></Table.Column>
          <Table.Column title="Tax"></Table.Column>
          <Table.Column title="Amount"></Table.Column>
        </Table.Head>

        <Table.Body className="invoiceapp-invoice__table-row">
          <InvoiceItems invoice={invoice} currentPage={currentPage} itemsPerPage={itemsPerPage} />
        </Table.Body>

      </Table>
      <BottomHeader
        invoice={invoice}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
}

export default AppReactHooks;
