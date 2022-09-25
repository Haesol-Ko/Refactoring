/**
 * Composition(위임)
 * 레고를 조립하는 것 처럼 필요한 부품을 외부로부터 주입받아 주입받은 부품을 활용하는 것
  */
class Printer {
    printerHeader;
    constructor(printerHeader) {
        this.printerHeader = printerHeader;
    }
    print() {
        this.printerHeader
        ? this.printerHeader.print()
        : console.log('basic print!');
    }
}

class RedPrinterHeader {
    print() {
        console.log('print 🔴');
    }
}

class BlackPrinterHeader {
    print() {
        console.log('print ⚫️');
    }
}

const printers = [new Printer(), new Printer(new RedPrinterHeader()), new Printer(new BlackPrinterHeader())];
printers.forEach(printer => printer.print());
