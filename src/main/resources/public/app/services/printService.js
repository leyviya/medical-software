
export function printInvoice(transactionId, currentInvoice, date, staff, code) {
    var mywindow = window.open('', 'PRINT', 'height=1000,width=1000');
    let totalQuantity = 0;
    let totalPrice = 0;
    let table = '';
    currentInvoice.forEach(invoice =>
        table += `
            <tr>
                <td class="quantity">${invoice.itemQuantity}</td>
                <td class="description">${invoice.itemDescription}</td>
                <td class="price">N${invoice.itemPrice}</td>
            </tr>`
    );
    for (let invoice of currentInvoice) {
        totalPrice += invoice.itemPrice;
        totalQuantity += invoice.itemQuantity;
    }

    mywindow.document.write(printTemplate(table, totalQuantity, totalPrice, date, staff, code, transactionId));

    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/

    setTimeout(() => {
        mywindow.print();
        mywindow.close();
    }, 500);
    return true;
}

function printTemplate(table, totalQuantity, totalPrice, date, staff, code, transactionId) {
    return `
    <html><head>
    <link rel="stylesheet" type="text/css" href="http://localhost:8080/assets/css/invoice_print_style.css" />
    </head><body>
    <p class="centered">ADEMOLAY HIS MERCY
        <br />****  HOSPITAL  *****
        <br /><i>Beside crestfield hostel,
        <br />Erin-Osun, Osun State.
        <br />08066630754/09042406460</i>
    </p>
    <p>
        <h3 style='border:1px solid black;padding:4px' class="centered">Transaction Invoice</h3>
    </p>
    <table>
        <thead>
            <tr>
                <th class="quantity">Q.</th>
                <th class="description">Description</th>
                <th class="price">Cost</th>
            </tr>
        </thead>
        <tbody>
        ${table}
        </tbody>
        <tfoot>
                <tr>
                    <td>${totalQuantity}</td>
                    <td>Total: </td>
                    <td>N${totalPrice}</td>
                </tr>
            </tfoot>
    </table>
    <p>
    Staff: ${staff} | ${code}
    <br />Date:  ${date}
    <br />Invoice Number:  #${transactionId}
    </p>
    <p class="centered">***********************<br />
        In God we Trust
        <br />
        <i style="font-size: 8px;">Powered by Your Hospital Software</i>
    </p>
</div>
</body></html>
`;
};
