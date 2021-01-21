export class WeakList<T extends object> {
    items : WeakRef<T>[] = [];
    entries(): T[] {
        let output : T[] = [];

        let newItems : WeakRef<T>[] = [];
        for (let i of this.items) {
            let targetItem = i.deref();

            if (targetItem) {
                output.push(targetItem);
                newItems.push(i);
            }
        }

        this.items = newItems;

        return output;
    }

    push(item: T) {
        this.items.push(new WeakRef(item));
    }

}