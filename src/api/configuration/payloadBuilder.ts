export interface userData {
    id?: number;
    userId?: number;
    callBackTypeId?: string;
    url?: string;
    remark?: string;
    ip?:string;
    otp?:string;
}
export const configPayload = (action: string, data: unknown): Record<string, unknown> => {

    const d = data as userData;
    switch (action) {

        case "GET_CALLBACK_LIST": {
            const { page = 1, size = 100 } = data as { page?: number; size?: number };
            return {
                "pageNumber": page,
                "pageSize": size,
            }
        }
        case "ADD_UPDATE_CALLBACK": {
            return {
                id: d?.id ?? 0,
                userId: d?.userId ?? 0,
                callBackTypeId: parseInt(d.callBackTypeId || "0", 10),
                url: d?.url ?? "",
                remark: d?.remark ?? ""
            };
        }
        case "ADD_RECHARGE_IP": {
            return {
                userId: d?.userId ?? 0,
                ip: d?.ip ?? '',
                otp: d?.otp ?? ''
            };
        }
        default:
            throw new Error(`Unknown action: ${action}`);
    }
};
