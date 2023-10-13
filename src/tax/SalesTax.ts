import Good from "../item/Good";
import { ITax, roundUp } from "../utils/helpers";

export default class SalesTax implements ITax {
    static TAXEXCLUDUED = [
        Good.EXCLUSIONTYPES.BOOKS,
        Good.EXCLUSIONTYPES.FOOD,
        Good.EXCLUSIONTYPES.MEDICAL,
    ];

    /**
     * calculate goods
     * @param goods
     */
    calculate(goods: Good): number {
        if (SalesTax.TAXEXCLUDUED.indexOf(goods.getType()) !== -1) {
            return 0.0;
        }

        return roundUp(goods.getPrice() * 0.10, 0.05);
    }
}