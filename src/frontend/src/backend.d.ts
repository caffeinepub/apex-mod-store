import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Order {
    customerName: string;
    color: string;
    selectedModules: Array<string>;
    productType: string;
    email: string;
    orderId: bigint;
    address: string;
    quantity: bigint;
    phone: string;
    totalPrice: bigint;
    material: string;
    product: Product;
}
export interface Product {
    basePriceDigital: bigint;
    name: string;
    description: string;
    basePricePhysical: bigint;
}
export interface Module {
    name: string;
    description: string;
    price: bigint;
}
export interface backendInterface {
    getAllOrders(): Promise<Array<Order>>;
    getAvailableModules(): Promise<Array<Module>>;
    getOrder(orderId: bigint): Promise<Order | null>;
    getProduct(): Promise<Product>;
    placeOrder(customerName: string, email: string, phone: string, address: string, material: string, color: string, selectedModules: Array<string>, quantity: bigint, productType: string, totalPrice: bigint): Promise<{
        orderId: bigint;
        totalPrice: bigint;
    }>;
}
