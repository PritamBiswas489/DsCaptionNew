interface OrderData {
    title: string;
    description: string;
    order_id: number;
    module_id: number;
    order_type: string;
    image: string;
    type: string;
}

export interface NotificationInterface {
    id: number;
    data: OrderData;
    status: number;
    user_id: number | null;
    vendor_id: number;
    delivery_man_id: number | null;
    created_at: string;
    updated_at: string;
}
