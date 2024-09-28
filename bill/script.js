
function printInvoice() {
    window.print();
}

let data = localStorage.getItem('date')
let x = data.split("-").reverse().join("-");
// console.log(x)

document.getElementById('invoiceNo').innerText= localStorage.getItem('invoice_no')
document.getElementById('invoice-date').innerHTML = x
document.getElementById('customer-name').innerHTML = localStorage.getItem('partyName')
document.getElementById('customer-address').innerHTML = localStorage.getItem('address')
document.getElementById('customer-gstin').innerHTML = localStorage.getItem('partyGSTIN')
document.getElementById('customer-aadhaar').innerHTML = localStorage.getItem('aadhaar')
document.getElementById('customer-mobile').innerHTML = localStorage.getItem('mobile')
document.getElementById('customer-state-code').innerHTML = localStorage.getItem('stateCode')
document.getElementById('customer-pan').innerHTML = localStorage.getItem('pan')

document.getElementById('return_value').innerHTML = localStorage.getItem('returnValue')
document.getElementById('received_amount').innerHTML = localStorage.getItem('receivedAmount')
document.getElementById('due_amount').innerHTML = localStorage.getItem('dueAmount')
document.getElementById('payable_amount_words').innerHTML = localStorage.getItem('payableWords')
document.getElementById('total').innerHTML = localStorage.getItem('totalAmount')
document.getElementById('cgst').innerHTML = localStorage.getItem('cgst')
document.getElementById('sgst').innerHTML = localStorage.getItem('sgst')
document.getElementById('igst').innerHTML = localStorage.getItem('igst')
document.getElementById('grand_total').innerHTML = localStorage.getItem('grandTotal')
document.getElementById('discount').innerHTML = localStorage.getItem('discount')
document.getElementById('payable').innerHTML = localStorage.getItem('payable')


const impData = JSON.parse(localStorage.getItem('allRowData'))
// console.log(impData)
console.log(impData[1])

let index = 1;
for(let i=1; i<=10; i++){
    if(impData[index] == undefined) break;
    const dataRow = impData[index];
    // console.log(dataRow)
    let s = dataRow["itemDescription"]
    let x = s.length > 68 ? s.slice(0, 65) + "..." : s
    
    document.getElementById(`serial_${index}`).innerHTML = index
    document.getElementById(`itemDescription_${index}`).innerHTML = x
    document.getElementById(`hsn_${index}`).innerHTML = ""
    document.getElementById(`gwt_${index}`).innerHTML = dataRow["gwt"]
    document.getElementById(`purity_${index}`).innerHTML = dataRow["purity"]
    document.getElementById(`price_${index}`).innerHTML = dataRow["pricePerGm"]
    document.getElementById(`itemValue_${index}`).innerHTML = dataRow["itemValue"]
    document.getElementById(`makingCharge_${index}`).innerHTML = dataRow["makingCharge"]
    document.getElementById(`taxableValue_${index}`).innerHTML = dataRow["taxableValue"]
    

    index++
}
// window.onload = () => {
//     document.title = localStorage.getItem('invoice_no')
//     window.print()
// }

window.onload = function(){
    // document.getElementById('printBtn').addEventListener('click', () => {
        const invoice = document.getElementById('makepdf');
        console.log(invoice);
        var opt = {
            margin: 0, // Set margin to 0 to prevent page breaks
            scale: 1,  // Set scale to 1 to fit the content
            filename: `${localStorage.getItem('invoice_no')}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 }, // Increase canvas scale for better quality
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' } // Set to A4
        };
        html2pdf().from(invoice).set(opt).save();
    // });
}
