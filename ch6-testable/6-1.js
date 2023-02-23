export function printOwing(invoice, console, clock) {
    printBanner(console);
    const outstanding = calculateOutstanding(invoice);
    recordDueDate(invoice, clock)
    printDetails(console, invoice, outstanding);
}

function printBanner(console) {
    console.log('***********************');
    console.log('**** Customer Owes ****');
    console.log('***********************');
}

function calculateOutstanding(invoice) {
    let result = 0;

    for (const o of invoice.orders) {
        result += o.amount;
    }

    return result;
}

function recordDueDate(invoice, clock) {
    const today = clock.today;
    invoice.dueDate = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + 30
    );
}

function printDetails(console, invoice, outstanding) {
    //print details
    console.log(`name: ${invoice.customer}`);
    console.log(`amount: ${outstanding}`);
    console.log(`due: ${invoice.dueDate.toLocaleDateString()}`);
}

const invoice = {
    orders: [{ amount: 2 }, { amount: 5 }],
    customer: '엘리',
};

class Clock {
    constructor() {}

    get today() {
        return new Date();
    }
}

printOwing(invoice, console, new Clock());
