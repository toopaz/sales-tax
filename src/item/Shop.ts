import Good from "./Good"

export class ShoppingItem {
    /**
     * Individual shopped item with quantity
     */
    private goods: Good;
    private quantity: number;

    constructor(goods: Good, quantity: number) {
        this.goods = goods;
        this.quantity = quantity;
    }

    /**
     * Getters
     */
    getGoods(): Good {
        return this.goods;
    }

    getQuantity(): number {
        return this.quantity;
    }
}

export class ShoppedItems {
    private items: ShoppingItem[] = [];

    /**
     * Shop many of the same product
     */
    add(goods: Good, quantity?: number): this {
        quantity = quantity || 1;
        this.items.push(new ShoppingItem(goods, quantity));
        return this;
    }

    /**
     * Get shopped items
     */
    getShoppedItems(): ShoppingItem[] {
        return this.items;
    }
}