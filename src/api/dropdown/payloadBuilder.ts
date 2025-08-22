export interface commonData {
    id?: number;
    isActive?: boolean;
}
export const dropdownPayload = (action: string, data: unknown): Record<string, unknown> => {
    const d = data as commonData;

    switch (action) {
        case "COMMON_DISTRICT":
            return {
                "stateId": (data as { id?: string })?.id || ""
            };
        case "USER_STATUS":
        case "USER_NOTIFICATION_STATUS": {
            return {
                id: d?.id ?? 0,
                isActive: d?.isActive
            };
        }
        case "USER_DELETE":
        case "USER_NOTIFICATION_DELETE": {
            return {
                id: d?.id ?? 0,
                isDelete: true
            };
        }
        default:
            throw new Error(`Unknown action: ${action}`);
    }

};
