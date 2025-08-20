export interface userData {
    id?: number;
    fullName?: number;
    email?: string;
    mobileNumber?: string;
    roleId?: string;
    packageId?: string;
    userName?: string;
    passWord?: string;
    isActive?: boolean;
    isLocked?: boolean;
}
export const userPayload = (action: string, data: unknown): Record<string, unknown> => {

    const d = data as userData;
    switch (action) {

        case "GET_USER_LIST": {
            const { page = 1, size = 100 } = data as { page?: number; size?: number };
            return {
                "pageNumber": page,
                "pageSize": size,
                "filter": {
                    "accountNumber": "",
                    "accountHolderName": "",
                    "ifscCode": "",
                    "mobileNumber": "",
                    "email": "",
                    "userId": 0,
                    "roleId": 0,
                    "statusId": 0,
                    "gstTypeId": 0,
                    "bankAccountId": 0,
                    "transferTypeId": 0,
                    "packageId": 0,
                    "operatorId": 0,
                    "paymentReferenceNumber": "",
                    "fromDate": "",
                    "toDate": ""
                }
            }
        }
        case "ADD_UPDATE_USER": {
            return {
                id: d?.id ?? 0,
                fullName: d?.fullName ?? "",
                email: d?.email ?? "",
                mobileNumber: d?.mobileNumber ?? "",
                roleId: parseInt(d.roleId || "0", 10),
                packageId: parseInt(d.packageId || "0", 10),
                userName: d?.userName ?? "",
                passWord: d?.passWord ?? "",
                isActive: d?.isActive ?? true,
                isLocked: d?.isLocked ?? false,
            };
        }
        case "USER_TOGGLE": {
            return {
                id: d?.id ?? 0,
                isActive: d?.isActive
            };
        }
        default:
            throw new Error(`Unknown action: ${action}`);
    }
};
