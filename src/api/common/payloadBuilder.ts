export const commonPayload = (
    action: string,
    data: unknown
): Record<string, unknown> => {

    switch (action) {
        case "COMMON_DISTRICT":
            return {
                "stateId": (data as { id?: string })?.id || ""
            };

        default:
            throw new Error(`Unknown action: ${action}`);
    }
};
