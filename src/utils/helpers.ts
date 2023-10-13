import Good from "../item/Good";

export function roundUp (number: number, precision: number): number {
    return (Math.ceil(number / precision) * precision);
}

export interface ITax {
    calculate(goods: Good): number;
}