import Good from "../item/Good";
import { ITax } from "../utils/helpers";

export default class ManageTax {
    /**
     * All taxes
     */
    private allTaxes: ITax[] = [];

    /**
     * Calculate the total tax
     */
    calculate(goods: Good): number {
        return this.allTaxes.reduce((totalAmount: number, tax: ITax) => {
            return totalAmount + tax.calculate(goods);
        }, 0);
    }

    /**
     * Add tax to the item
     */
    addTax(tax: ITax): this {
        this.allTaxes.push(tax);
        return this;
    }
}