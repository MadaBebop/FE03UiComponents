
export function calculateTotalCost(invoice) {

    let totalCostInvoice = 0;
    invoice.items.forEach(item => {
        totalCostInvoice += (item.price * item.quantity) / (1+item.tax);
    });

    return Math.round(totalCostInvoice);
}