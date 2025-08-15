// Function to build dynamic payloads
export const userPayload = (
    action: string,
    data: unknown
): Record<string, unknown> => {

    switch (action) {
        case "GET_USER_LIST": {
            const { page = 1, size = 100 } = data as { page?: number; size?: number };
            return {
                "pageNumber": page,
                "pageSize": size,
                "filter": {
                    "accountNumber": "string",
                    "accountHolderName": "string",
                    "ifscCode": "string",
                    "mobileNumber": "string",
                    "email": "string",
                    "userId": 0,
                    "roleId": 0,
                    "statusId": 0,
                    "gstTypeId": 0,
                    "bankAccountId": 0,
                    "transferTypeId": 0,
                    "packageId": 0,
                    "operatorId": 0,
                    "paymentReferenceNumber": "string",
                    "fromDate": "string",
                    "toDate": "string"
                }
            }
        }
        default:
            throw new Error(`Unknown action: ${action}`);
    }
};
