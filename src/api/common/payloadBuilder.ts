export interface commonData {
    id?: number;
    isActive?: boolean;
}
export const commonPayload = (action: string, data: unknown): Record<string, unknown> => {
    const d = data as commonData;

    switch (action) {
        case "COMMON_DISTRICT":
            return {
                "stateId": (data as { id?: string })?.id || ""
            };
        case "USER_STATUS":
        case "USER_NOTIFICATION_STATUS":
        case "CONFIG_IP_STATUS":
        case "BANK_ACCOUNT_STATUS": {
            return {
                id: d?.id ?? 0,
                isActive: d?.isActive
            };
        }
        case "USER_DELETE":
        case "USER_NOTIFICATION_DELETE":
        case "CONFIG_CALLBACK_DELETE":
        case "BANK_ACCOUNT_DELETE":
        case "CONFIG_IP_DELETE":
        case "ROLE_DELETE": {
            return {
                id: d?.id ?? 0,
                isDelete: true
            };
        }
        default:
            throw new Error(`Unknown action: ${action}`);
    }

};
