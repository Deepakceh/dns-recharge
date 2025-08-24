export interface userData {
    id?: number;
    userId?: number;
    callBackTypeId?: string;
    url?: string;
    remark?: string;
    ipAddress?: string;
    otp?: string;
}
export const configPayload = (action: string, data?: unknown): Record<string, unknown> => {

    const d = data as userData;
    switch (action) {

        case "GET_CALLBACK_LIST": {
            return {
                "pageNumber": 1,
                "pageSize": 100,
                "filter": {
                    "userId": 0,
                }
            }
        }
        case "ADD_UPDATE_CALLBACK": {
            return {
                id: d?.id ?? 0,
                // userId: d?.userId ?? 0,
                callBackTypeId: parseInt(d.callBackTypeId || "0", 10),
                url: d?.url ?? "",
                remark: d?.remark ?? ""
            };
        }
        case "GET_RECHARGE_IP": {
            return {
                "pageNumber": 1,
                "pageSize": 100,
            }
        }
        case "ADD_RECHARGE_IP": {
            return {
                ip: d?.ipAddress ?? '',
                otp: d?.otp ?? ''
            };
        }
        default:
            throw new Error(`Unknown action: ${action}`);
    }
};
