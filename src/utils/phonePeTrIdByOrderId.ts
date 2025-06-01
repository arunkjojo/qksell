export function phonePeTrIdByOrderId(orderId: number | string): string {
    const randomNumber: number = Math.floor(Math.random() * 100) + 1;
    const orderIdStr: string = orderId.toString();
    return `qksell_${orderIdStr}_${randomNumber}`;
}