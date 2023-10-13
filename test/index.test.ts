import Good from "../src/item/Good";
import Generator from "../src/item/Generator";
import { ShoppedItems } from "../src/item/Shop";
import SalesTax from "../src/tax/SalesTax";
import Duty from "../src/tax/Duty";
import ManageTax from "../src/tax/ManageTax";

test("Scenario #1", () => {
    let cart = new ShoppedItems()
        .add(new Good({ name: "book", price: 12.49, type: Good.EXCLUSIONTYPES.BOOKS}))
        .add(new Good({ name: "music CD", price: 14.99, type: Good.EXCLUSIONTYPES.OTHER}))
        .add(new Good({ name: "chocolate bar", price: 0.85, type: Good.EXCLUSIONTYPES.FOOD}));

    let tax = new ManageTax()
        .addTax(new SalesTax())
        .addTax(new Duty());

    let receiptGenerator = new Generator(tax);
    let receipt = receiptGenerator.generate(cart);
    let output = receiptGenerator.render(receipt);

    expect(output).toEqual([
        '1 book: 12.49',
        '1 music CD: 16.49',
        '1 chocolate bar: 0.85',
        'Sales Taxes: 1.50',
        'Total: 29.84'
    ])
});

test("Scenario #2", () => {
    let cart = new ShoppedItems()
        .add(new Good({ name: "box of chocolates", price: 10.00, type: Good.EXCLUSIONTYPES.FOOD, imported: true}))
        .add(new Good({ name: "bottle of perfume", price: 47.50, type: Good.EXCLUSIONTYPES.OTHER, imported: true}));

    let tax = new ManageTax()
        .addTax(new SalesTax())
        .addTax(new Duty());

    let receiptGenerator = new Generator(tax);
    let receipt = receiptGenerator.generate(cart);
    let output = receiptGenerator.render(receipt);

    expect(output).toEqual([
        '1 imported box of chocolates: 10.50',
        '1 imported bottle of perfume: 54.65',
        'Sales Taxes: 7.65',
        'Total: 65.15'
    ])
});

test("Scenario #3", () => {
    let cart = new ShoppedItems()
        .add(new Good({ name: "bottle of perfume", price: 27.99, imported: true }))
        .add(new Good({ name: "bottle of perfume", price: 18.99}))
        .add(new Good({ name: "packet of headache pills", price: 9.75, type: Good.EXCLUSIONTYPES.MEDICAL}))
        .add(new Good({ name: "box of chocolates", price: 11.25, type: Good.EXCLUSIONTYPES.FOOD, imported: true}));

    let tax = new ManageTax()
        .addTax(new SalesTax())
        .addTax(new Duty());

    let receiptGenerator = new Generator(tax);
    let receipt = receiptGenerator.generate(cart);
    let output = receiptGenerator.render(receipt);

    expect(output).toEqual([
        '1 imported bottle of perfume: 32.19',
        '1 bottle of perfume: 20.89',
        '1 packet of headache pills: 9.75',
        '1 imported box of chocolates: 11.85',
        'Sales Taxes: 6.71',
        'Total: 74.68'
    ]);
});