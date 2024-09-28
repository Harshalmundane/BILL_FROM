document.getElementById("addItemButton").addEventListener("click", function() {
    const tableBody = document.getElementById("itemsTableBody");
    const rowCount = tableBody.rows.length + 1;

    const newRow = document.createElement("tr");

    newRow.innerHTML = `
        <td>${rowCount}</td>
        <td><input type="text" class="itemDesc" name="itemDescription" id="itemDescription_${rowCount}"></td>
        <td>
            <input type="text" name="gwt" id="gwt_${rowCount}">
        </td>

        <td>
            <input type="text" name="purity" id="purity_${rowCount}" value="916" readonly>
        </td>
        
        <td><input type="text" name="pricePerGm" id="pricePerGm_${rowCount}"></td>
        <td><input type="text" name="itemValue" id="itemValue_${rowCount}" readonly></td>
        <td><input type="text" name="makingCharge" id="makingCharge_${rowCount}"></td>
        <td><input type="text" name="taxableValue" id="taxableValue_${rowCount}" readonly></td>
        <td><button id="delete-button" onclick="deleteRow(this)">Delete</button></td>
    `;

    tableBody.appendChild(newRow);
});

const addressBox = document.getElementById('address')
const characterCountDisplay = document.getElementById('wordCount')

const maxWordsAddress = 65

addressBox.addEventListener('input', () => {
    let words = addressBox.value
    let wordCountCurr = words.length;

    if(wordCountCurr > maxWordsAddress){
        words = words.slice(0, maxWordsAddress)
        addressBox.value = words
        wordCountCurr = maxWordsAddress
    }

    characterCountDisplay.textContent = `${wordCountCurr}/${maxWordsAddress} characters`
})

// function updateCharCount(inputField, charCountDisplay) {
//     const maxLength = 65;  // Adjust the limit as needed
//     const remainingChars = maxLength - inputField.value.length;
//     charCountDisplay.textContent = `(${remainingChars} Characters Left)`;
//   }

//   // Get the item description input and character count display elements
//   const itemDesc1 = document.getElementById("itemDescription_1");
 

//   //   const itemDesc1 = document.querySelectorAll(".itemDesc");
//   const charCountDisplay1 = document.getElementById("charCountDisplay");

  // Attach event listener to update count on typing
//   itemDesc1.addEventListener("keyup", () => updateCharCount(itemDesc1, charCountDisplay1));
function deleteRow(button) {
    const confirmDelete = confirm("Are you sure you want to delete this row?");
    if (confirmDelete) {
        const row = button.closest('tr');
        row.remove();
        updateSerialNumbers();
    }
}

function updateSerialNumbers() {
    const rows = document.querySelectorAll("#itemsTableBody tr");
    rows.forEach((row, index) => {
        row.cells[0].textContent = index + 1;
    });
}

document.getElementById('calculateButton').addEventListener('click', function() {
    const rows = document.querySelectorAll('#itemsTableBody tr');
    let totalTaxableValue = 0;

    rows.forEach(row => {
        const gwt = parseFloat(row.querySelector('input[name="gwt"]').value) || 0;
        const pricePerGm = parseFloat(row.querySelector('input[name="pricePerGm"]').value) || 0;
        const makingCharge = parseFloat(row.querySelector('input[name="makingCharge"]').value) || 0;

        const itemValue = gwt * pricePerGm;
        const taxableValue = itemValue + makingCharge;

        row.querySelector('input[name="itemValue"]').value = itemValue.toFixed(2);
        row.querySelector('input[name="taxableValue"]').value = taxableValue.toFixed(2);

        totalTaxableValue += taxableValue;
    });

    const totalAmount = totalTaxableValue;
    const cgst = totalAmount * 0.015;
    const sgst = totalAmount * 0.015;
    let igst = 0;

    if (document.getElementById("igstCheckbox").checked) {
        igst = totalAmount * 0.03;
    }

    const grandTotal = totalAmount + cgst + sgst + igst;

    const discountAmount = parseFloat(document.getElementById("discount").value) || 0;
    // const discountAmount = (grandTotal - discountPercentage);
    const returnValue = parseFloat(document.getElementById("returnValue").value) || 0;

    const payable = grandTotal - discountAmount - returnValue;

    document.getElementById("totalAmount").value = totalAmount.toFixed(2);
    document.getElementById("cgst").value = cgst.toFixed(2);
    document.getElementById("sgst").value = sgst.toFixed(2);
    document.getElementById("igst").value = igst.toFixed(2);
    document.getElementById("grandTotal").value = grandTotal.toFixed(2);
    document.getElementById("payable").value = payable.toFixed(2);

    const receivedAmount = parseFloat(document.getElementById("receivedAmount").value) || 0;
    const dueAmount = payable - receivedAmount;

    document.getElementById("dueAmount").value = dueAmount.toFixed(2);

    // Convert the payable amount to words (integer part only)
    const payableWords = numberToWords(Math.floor(payable));
    document.getElementById("payableWords").value = payableWords;
});

// Function to convert numbers to words (integer part only)
function numberToWords(amount) {
    return convertIntegerToWords(amount) + ' Rupees';
}

// Example function to convert integers to words (improved version)
function convertIntegerToWords(num) {
    // const units = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
    // const teens = ["Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
    // const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
    // const thousands = ["", "Thousand", "Million", "Billion"];

    // if (num === 0) return "Zero";

    // let word = '';

    // if (num >= 1000) {
    //     word += units[Math.floor(num / 1000)] + ' ' + thousands[1] + ' ';
    //     num %= 1000;
    // }
    // if (num >= 100) {
    //     word += units[Math.floor(num / 100)] + ' Hundred ';
    //     num %= 100;
    // }
    // if (num >= 20) {
    //     word += tens[Math.floor(num / 10)] + ' ';
    //     num %= 10;
    // }
    // if (num >= 10 && num < 20) {
    //     word += teens[num - 10] + ' ';
    //     num = 0;  // To prevent appending any units after the teen number
    // } else if (num > 0) {
    //     word += units[num] + ' ';
    // }

    // return word.trim();
    var a = ['','One ','Two ','Three ','Four ', 'Five ','Six ','Seven ','Eight ','Nine ','Ten ','Eleven ','Twelve ','Thirteen ','Fourteen ','Fifteen ','Sixteen ','Seventeen ','Eighteen ','Nineteen '];
    var b = ['', '', 'Twenty','Thirty','Forty','Fifty', 'Sixty','Seventy','Eighty','Ninety'];

    if ((num = num.toString()).length > 9) return 'overflow';
    n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return; var str = '';
    str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'Crore ' : '';
    str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'Lakh ' : '';
    str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'Thousand ' : '';
    str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'Hundred ' : '';
    str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + '' : '';
    return str;
}

// Retrieve the bill data from localStorage
const billData = JSON.parse(localStorage.getItem('billData'));

if (billData) {
    // Populate party details
    if (document.getElementById('display-invoiceNo')) {
        document.getElementById('display-invoiceNo').value = billData.invoiceNo || '';
    }
    if (document.getElementById('display-partyName')) {
        document.getElementById('display-partyName').value = billData.partyDetails.partyName || '';
    }
    if (document.getElementById('display-address')) {
        document.getElementById('display-address').value = billData.partyDetails.address || '';
    }
    if (document.getElementById('display-partyGSTIN')) {
        document.getElementById('display-partyGSTIN').value = billData.partyDetails.gstin || '';
    }
    if (document.getElementById('display-aadhaar')) {
        document.getElementById('display-aadhaar').value = billData.partyDetails.aadhaar || '';
    }
    if (document.getElementById('display-mobile')) {
        document.getElementById('display-mobile').value = billData.partyDetails.mobile || '';
    }
    if (document.getElementById('display-stateCode')) {
        document.getElementById('display-stateCode').value = billData.partyDetails.stateCode || '';
    }
    if (document.getElementById('display-pan')) {
        document.getElementById('display-pan').value = billData.partyDetails.pan || '';
    }

    // Populate items table
    const itemsTableBody = document.getElementById('display-items-table-body');
    if (itemsTableBody) {
        billData.items.forEach((item) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.slNo || ''}</td>
                <td>${item.description || ''}</td>
                <td>${item.hsn || ''}</td>
                <td>${item.gwt || ''}</td>
                <td>${item.purity || ''}</td>
                <td>${item.pricePerGm || ''}</td>
                <td>${item.itemValue || ''}</td>
                <td>${item.makingCharge || ''}</td>
                <td>${item.taxableValue || ''}</td>
            `;
            itemsTableBody.appendChild(row);
        });
    } else {
        console.error('Items table body not found');
    }

    // Populate financial details
    if (document.getElementById('returnValue')) {
        document.getElementById('returnValue').value = billData.returnValue || '';
    }
    if (document.getElementById('receivedAmount')) {
        document.getElementById('receivedAmount').value = billData.receivedAmount || '';
    }
    if (document.getElementById('dueAmount')) {
        document.getElementById('dueAmount').value = billData.dueAmount || '';
    }
    if (document.getElementById('payableAmountWords')) {
        document.getElementById('payableAmountWords').value = billData.payableAmountWords || '';
    }
    if (document.getElementById('totalAmount')) {
        document.getElementById('totalAmount').value = billData.totalAmount || '';
    }
    if (document.getElementById('cgst')) {
        document.getElementById('cgst').value = billData.cgst || '';
    }
    if (document.getElementById('sgst')) {
        document.getElementById('sgst').value = billData.sgst || '';
    }
    if (document.getElementById('igst')) {
        document.getElementById('igst').value = billData.igst || '';
    }
    if (document.getElementById('discount')) {
        document.getElementById('discount').value = billData.discount || '';
    }
    if (document.getElementById('grandTotal')) {
        document.getElementById('grandTotal').value = billData.grandTotal || '';
    }
    if (document.getElementById('payableAmount')) {
        document.getElementById('payableAmount').value = billData.payableAmount || '';
    }

    window.location.href = './bill/index.html'; 
} else {
    // alert("No data found!");
    console.log('no data found')
}

function generatePdf() {
    const invoiceNo = document.getElementById('invoice_no').value;
    const pdf = new jsPDF();
    const pdfHtml = document.getElementById('pdf-html').innerHTML;
    pdf.fromHTML(pdfHtml, 15, 15);
    const pdfBlob = pdf.output('blob');
    const pdfUrl = URL.createObjectURL(pdfBlob);
    const a = document.createElement('a');
    a.href = pdfUrl;
    a.download = `Invoice-${invoiceNo}.pdf`;
    a.click();
}

document.getElementById('PrintButton').addEventListener('click', () => {
    const invoice_no = document.getElementById('invoice_no').value
    localStorage.setItem('invoice_no', invoice_no)

    const partyName = document.getElementById('partyName').value
    localStorage.setItem('partyName', partyName)

    const address = document.getElementById('address').value
    localStorage.setItem('address', address)

    const partyGSTIN = document.getElementById('partyGSTIN').value
    localStorage.setItem('partyGSTIN', partyGSTIN)

    const aadhaar = document.getElementById('aadhaar').value
    localStorage.setItem('aadhaar', aadhaar)

    const date = document.getElementById('date').value
    localStorage.setItem('date', date)

    const mobile = document.getElementById('mobile').value
    localStorage.setItem('mobile', mobile)

    const stateCode = document.getElementById('stateCode').value
    localStorage.setItem('stateCode', stateCode)

    const pan = document.getElementById('pan').value
    localStorage.setItem('pan', pan)

    function collectRowData(row) {
        const data = {};
        const inputs = row.querySelectorAll('input');

        inputs.forEach(input => {
            data[input.name] = input.value;
        });

        return data;
    }

    function getAllRowData() {
        const rows = document.querySelectorAll('tr');
        const allData = [];

        rows.forEach(row => {
            const rowData = collectRowData(row);
            allData.push(rowData);
        });

        console.log(allData);
        localStorage.setItem('allRowData', JSON.stringify(allData))
    }
    getAllRowData()

    const returnValue = document.getElementById('returnValue').value
    localStorage.setItem('returnValue', returnValue)

    const receivedAmount = document.getElementById('receivedAmount').value
    localStorage.setItem('receivedAmount', receivedAmount)

    const dueAmount = document.getElementById('dueAmount').value
    localStorage.setItem('dueAmount', dueAmount)

    const payableWords = document.getElementById('payableWords').value
    localStorage.setItem('payableWords', payableWords)

    const totalAmount = document.getElementById('totalAmount').value
    localStorage.setItem('totalAmount', totalAmount)

    const cgst = document.getElementById('cgst').value
    localStorage.setItem('cgst', cgst)

    const sgst = document.getElementById('sgst').value
    localStorage.setItem('sgst', sgst)

    const igst = document.getElementById('igst').value
    localStorage.setItem('igst', igst)

    const grandTotal = document.getElementById('grandTotal').value
    localStorage.setItem('grandTotal', grandTotal)

    const discount = document.getElementById('discount').value
    localStorage.setItem('discount', discount)

    const payable = document.getElementById('payable').value
    localStorage.setItem('payable', payable)

    // const x = localStorage.getItem('allRowData')
    // console.log(JSON.parse(x))

    window.location.href = './bill/index.html'
})
// document.getElementById('PrintButton').addEventListener('click', generatePdf);
