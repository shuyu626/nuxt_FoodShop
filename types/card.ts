export interface Cards{
    img: string;
    title: string;
    OnSale?: boolean;
}

export interface Products extends Cards{
    category: string;
    price: number;
    quantity?: number;
    discount?: number;
    star?:number;
}