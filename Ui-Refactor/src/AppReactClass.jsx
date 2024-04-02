import React from 'react';
import { Button } from '@cgn/framework-ui-components/v1';
import { Table } from '@cgn/framework-ui-components/v2';
import {Pagination} from '@cgn/framework-ui-components/v2';


class InvoiceHeader extends React.Component {
  render() {
    const { invoice } = this.props;
    let date = new Date(invoice.date);
    let giorno = date.getDate();
    let mese = date.getMonth() + 1;
    let anno = date.getFullYear();
    let ore = date.getHours();
    let completeDate = giorno + '/' + mese + '/' + anno + ' ' + ore;

    return (
      <>
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
      </>
    );
  }
}

class BottomHeader extends React.Component {
  render() {
    const { invoice, currentPage, totalPages, onPageChange } = this.props;
    let totalCostInvoice = 0;
    invoice.items.forEach(item => {
      totalCostInvoice += item.price * item.quantity;
    });

    return (
      <>
        <div className="invoiceapp-invoice__paging">
          <Button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} >&#60;</Button>
          <span>Page {currentPage} di {totalPages}</span>
          <Button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>&#62;</Button>
        </div>
        <div className="invoiceapp-invoice__summary">
          <span>Total cost: {totalCostInvoice}</span>
        </div>
      </>
    );
  }
}

class TableData extends React.Component {
  render() {
    const { items } = this.props;
    let amount = items.quantity * items.price;
    return (
      <Table.Row className="invoiceapp-invoice__table-row">
        <Table.Cell>{items.description}</Table.Cell>
        <Table.Cell>{items.quantity}</Table.Cell>
        <Table.Cell>{items.price}</Table.Cell>
        <Table.Cell>{items.tax}</Table.Cell>
        <Table.Cell>{amount}</Table.Cell>
      </Table.Row>
    );
  }
}

class InvoiceItems extends React.Component {
  render() {
    const { invoice, currentPage, itemsPerPage } = this.props;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, invoice.items.length);
    const visibleItems = invoice.items.slice(startIndex, endIndex);

    return (
      <>
        {visibleItems.map((item, index) =>
          <TableData items={item} key={index} />
        )}
      </>
    );
  }
}

class AppReactClass extends React.Component {
  state = {
    invoice: this.props.invoice,
    currentPage: 1,
    itemsPerPage: 5
  };

  onPageChange = (newPage) => {
    if (newPage >= 1 && newPage <= Math.ceil(this.state.invoice.items.length / this.state.itemsPerPage)) {
      this.setState({ currentPage: newPage });
    }
  };

  render() {
    const { invoice, currentPage, itemsPerPage } = this.state;
    const totalPages = Math.ceil(invoice.items.length / itemsPerPage);

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

        <BottomHeader invoice={invoice} currentPage={currentPage} totalPages={totalPages} onPageChange={this.onPageChange} />

      </div>
    );
  }
}

export default AppReactClass;
