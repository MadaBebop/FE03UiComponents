import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { updateInvoice } from './reducerInvoice';
import { Pagination, Table } from '@cgn/framework-ui-components/v2';

function InvoiceHeader() {
  const invoice = useSelector(state => state.invoice.invoice);

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

function BottomHeader() {
  const invoice = useSelector(state => state.invoice.invoice);

  // Assicurati che invoice e items siano definiti 
  if (!invoice || !invoice.items) {
    return null;
  }

  let totalCostInvoice = 0;
  invoice.items.forEach(item => {
    totalCostInvoice += item.price * item.quantity;
  });

  return (
    <>
      <div className="invoiceapp-invoice__summary">
        <span>{totalCostInvoice}</span>
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

function InvoiceItems(props) {
  const invoice = useSelector(state => state.invoice.invoice);

  return (
    <>
      {invoice.items.slice(props.indexes.startIndex, props.indexes.endIndex + 1).map((item, index) => (
        <TableData {...item} key={index} />
      ))}
    </>
  );
}

function AppRedux({ invoice }) {

  const [indexes, setIndexes] = useState({
    startIndex: 0,
    endIndex: 4
  });

  const handlePaginationChange = ({ startIndex, endIndex }) => {
    setIndexes({
      startIndex,
      endIndex
    })
  }

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(updateInvoice(invoice));
  }, [dispatch]);


  return (
    <div className="invoiceapp invoiceapp-invoice">

      <InvoiceHeader />

      <Table className="invoiceapp-invoice__table">
        <Table.Head className="invoiceapp-invoice__table-row invoiceapp-invoice__table-row--header">
          <Table.Column title="Description"></Table.Column>
          <Table.Column title="Qty"></Table.Column>
          <Table.Column title="Unit price" ></Table.Column>
          <Table.Column title="Tax"></Table.Column>
          <Table.Column title="Amount"></Table.Column>
        </Table.Head>

        <Table.Body>
          <InvoiceItems indexes={indexes} />
        </Table.Body>
      </Table>
      <div className="invoiceapp-invoice__paging">
        <Pagination
          initPageSize={5}
          initCurrentPage={0}
          numberOfItems={invoice.items.length}
          pageSizeOptions={[5, 10]}
          onChange={handlePaginationChange} />
      </div>
      <BottomHeader />
    </div>
  );
}

export default AppRedux;
