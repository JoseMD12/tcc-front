const endpoints = {
    products: {
        post: "/product/create-many",
        delete: "/product/delete-many",
        get: "/product",
        exportExcel: "/excel/product",
    },
    productInstance: {
        get: "/product-instance",
        exportExcel: "/excel/product-instance",
        find: (id: string) => {
            return `/product-instance/${id}`;
        },
    },
    deposit: {
        post: "/deposit/create-many",
        get: "/deposit",
        getTypes: "/deposit/type",
        delete: "/deposit/delete-many",
        exportExcel: "/excel/deposit",
    },
    order: {
        post: "/order",
        get: "/order",
        delete: "/order/delete-many",
        exportExcel: "/excel/order",
    },
    charts: {
        productByDeposit: (productId?: string) => {
            return `/product-by-deposit/${productId ?? ""}`;
        },
        exportProductByDeposit: (productId?: string) => {
            return `/excel/product-by-deposit/${productId ?? ""}`;
        },
        movimentation: "/moving-instances",
        exportMovimentation: "/excel/moving-instances",
        depositOccupation: (depositId: string) => {
            return `/deposit-occupation/${depositId}`;
        },
        stockProjection: "/stock-projection",
        exportStockProjection: "/excel/stock-projection",
    },
    cards: {
        totalInventory: "/total-inventory",
        totalOrders: "/total-orders",
    },
};

export default endpoints;
