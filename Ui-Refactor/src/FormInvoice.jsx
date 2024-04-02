import React from 'react';
import { useState } from 'react';
import { Form, Input, Select } from '@cgn/framework-ui-components/v1';
import { Button } from '@cgn/framework-ui-components/v2';
import { Spinner } from '@cgn/framework-ui-components/v1';
import { Heading } from '@cgn/framework-ui-components/v1';


function FormInvoice({ onSubmit }) {
    const [invoiceNumber, setInvoiceNumber] = useState('');
    const [presentationMode, setPresentationMode] = useState("react-classes");

    const handleSubmit = (event) => {
        event.preventDefault();
        document.getElementById("spinner").classList.remove('hidden');
        document.getElementById("form").classList.add('hidden');

        setTimeout(() => {
            //Fingo l'elaborazione dei dati
            onSubmit({ invoiceNumber, presentationMode });
        }, 2000);
    };

    return (
        <>
            <div id="spinner" className='hidden'>
                <Spinner large={true} center={true} />
            </div>

            <div id="form" className="invoiceapp invoiceapp-main">
                <div>
                <Heading id="h4" as="h4" content="Incoive search" />
                <Heading as="h6"> Search your invoice <br></br>by invoice number id </Heading>
                </div>
                <Form className="invoiceapp-chooser" id="invoice-form" onSubmit={handleSubmit}>
                    <Input
                        title='Invoice id'
                        type="text"
                        id="invoice-number"
                        value={invoiceNumber}
                        onChange={(e, val) => { setInvoiceNumber(val); }}
                    />
                    <Select
                        title='Select your presentation mode'
                        onChange={(e, val) => { setPresentationMode(val); }}
                        value={presentationMode}
                    >
                        <Select.Option value="react-classes">React with Classes</Select.Option>
                        <Select.Option value="react-hooks">React with Hooks</Select.Option>
                        <Select.Option value="react-redux">React & Redux</Select.Option>
                    </Select>
                    <Button primary emphasis={Button.Emphasis.HIGH} onClick={handleSubmit}> Search invoice </Button>
                </Form>
            </div>
        </>
    );
}
export default FormInvoice;