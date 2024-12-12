import api from "./api";
import endpoints from "./endpoints";

//MARK: Product

export const productRegister = async (
    data: { id: string; description: string }[]
) => {
    try {
        const response = await api.post(endpoints.products.post, data);
        return response.data;
    } catch (error) {
        return error;
    }
};

export const listProducts = async () => {
    try {
        const response = await api.get(endpoints.products.get);
        return response.data;
    } catch (error) {
        return error;
    }
};

export const removeProducts = async (id: string[]) => {
    try {
        const response = await api.delete(endpoints.products.delete, {
            data: id,
        });
        return response.data;
    } catch (error) {
        return error;
    }
};

export const exportProductsExcel = async () => {
    try {
        const response = await api.get(endpoints.products.exportExcel, {
            responseType: "blob",
        });
        return response.data;
    } catch (error) {
        return error;
    }
};

//MARK: Product Instance

export const listProductInstances = async () => {
    try {
        const response = await api.get(endpoints.productInstance.get);
        return response.data;
    } catch (error) {
        return error;
    }
};

export const exportProductInstancesExcel = async () => {
    try {
        const response = await api.get(endpoints.productInstance.exportExcel, {
            responseType: "blob",
        });
        return response.data;
    } catch (error) {
        return error;
    }
};

export const findProductInstance = async (id: string) => {
    try {
        const response = await api.get(endpoints.productInstance.find(id));
        return response.data;
    } catch (error) {
        return error;
    }
};

//MARK: Deposit

export const depositRegister = async (
    data: { name: string; type: string; maxQuantity: number }[]
) => {
    try {
        const response = await api.post(endpoints.deposit.post, data);
        return response.data;
    } catch (error) {
        return error;
    }
};

export const listDeposits = async () => {
    try {
        const response = await api.get(endpoints.deposit.get);
        return response.data;
    } catch (error) {
        return error;
    }
};

export const listDepositTypes = async () => {
    try {
        const response = await api.get(endpoints.deposit.getTypes);
        return response.data;
    } catch (error) {
        return error;
    }
};

export const removeDeposits = async (id: string[]) => {
    try {
        const response = await api.delete(endpoints.deposit.delete, {
            data: id,
        });
        return response.data;
    } catch (error) {
        return error;
    }
};

export const exportDepositsExcel = async () => {
    try {
        const response = await api.get(endpoints.deposit.exportExcel, {
            responseType: "blob",
        });
        return response.data;
    } catch (error) {
        return error;
    }
};

//MARK: Order

export const orderRegister = async (data: {
    orderDate: string;
    products: { productId: string; quantity: number }[];
}) => {
    try {
        const response = await api.post(endpoints.order.post, data);
        return response.data;
    } catch (error) {
        return error;
    }
};

export const listOrders = async () => {
    try {
        const response = await api.get(endpoints.order.get);
        return response.data;
    } catch (error) {
        return error;
    }
};

export const removeOrders = async (id: string[]) => {
    try {
        const response = await api.delete(endpoints.order.delete, {
            data: id,
        });
        return response.data;
    } catch (error) {
        return error;
    }
};

export const exportOrdersExcel = async () => {
    try {
        const response = await api.get(endpoints.order.exportExcel, {
            responseType: "blob",
        });
        return response.data;
    } catch (error) {
        return error;
    }
};

//MARK: Product By Deposit

export const productByDepositChart = async (productId?: string) => {
    try {
        const response = await api.get(
            endpoints.charts.productByDeposit(productId)
        );
        return response.data;
    } catch (error) {
        return error;
    }
};

export const exportProductByDepositChart = async (productId?: string) => {
    try {
        const response = await api.get(
            endpoints.charts.exportProductByDeposit(productId),
            {
                responseType: "blob",
            }
        );
        return response.data;
    } catch (error) {
        return error;
    }
};

//MARK: Movimentation

export const movimentationChart = async (
    movingType: string,
    depositId?: string,
    search?: string
) => {
    try {
        const params: {
            movingType: string;
            depositId?: string;
            search?: string;
        } = { movingType };

        if (depositId) params.depositId = depositId;
        if (search) params.search = search;

        const response = await api.get(endpoints.charts.movimentation, {
            params,
        });
        return response.data;
    } catch (error) {
        return error;
    }
};

export const exportMovimentationChart = async (
    movingType: string,
    depositId?: string,
    search?: string
) => {
    try {
        const params: {
            movingType: string;
            depositId?: string;
            search?: string;
        } = { movingType };

        if (depositId) params.depositId = depositId;
        if (search) params.search = search;

        const response = await api.get(endpoints.charts.exportMovimentation, {
            params,
            responseType: "blob",
        });
        return response.data;
    } catch (error) {
        return error;
    }
};

//MARK: Deposits

export const depositOcupation = async (depositId: string) => {
    try {
        const response = await api.get(
            endpoints.charts.depositOccupation(depositId)
        );
        return response.data;
    } catch (error) {
        return error;
    }
};

//MARK: Stock Projection

export const stockProjection = async (
    productId: string,
    newOrdersState: boolean,
    depositId: string
) => {
    try {
        const params: {
            productId: string;
            newOrdersState: boolean;
            depositId?: string;
        } = { productId, newOrdersState };

        if (depositId) params.depositId = depositId;

        const response = await api.get(endpoints.charts.stockProjection, {
            params,
        });
        return response.data;
    } catch (error) {
        return error;
    }
};

export const exportStockProjection = async (
    productId: string,
    newOrdersState: boolean,
    depositId: string
) => {
    try {
        const params: {
            productId: string;
            newOrdersState: boolean;
            depositId?: string;
        } = { productId, newOrdersState };

        if (depositId) params.depositId = depositId;

        const response = await api.get(endpoints.charts.exportStockProjection, {
            params,
            responseType: "blob",
        });
        return response.data;
    } catch (error) {
        return error;
    }
};

//MARK: Cards

export const totalInventory = async () => {
    try {
        const response = await api.get(endpoints.cards.totalInventory);
        return response.data;
    } catch (error) {
        return error;
    }
};

export const totalOrders = async () => {
    try {
        const response = await api.get(endpoints.cards.totalOrders);
        return response.data;
    } catch (error) {
        return error;
    }
};
