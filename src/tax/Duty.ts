import Good from "../item/Good";
import { ITax, roundUp } from "../utils/helpers";

export default class Duty implements ITax {
    calculate(goods: Good): number {
        if (goods.isImported()) {
            return roundUp(goods.getPrice() * 0.05, 0.05);
        }
        return 0
    }  
} 