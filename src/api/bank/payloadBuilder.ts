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
    notificationMsg?: string
    remark?: string;
    userId?: string;
    bankId?: string;
    accountNumber?: string;
    addedById?: string;
    blockAmount?: string;
    accountTypeId?: string;
}
export const bankPayload = (action: string, data: unknown): Record<string, unknown> => {

    const d = data as userData;
    switch (action) {

        case "GET_BANK_LIST":
        case "GET_BANK_STATEMENT": {
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
        case "ADD_UPDATE_BANK": {
            return {
                "id": d?.id ?? 0,
                "userId": parseInt(d.userId || "0", 10),
                "bankId": parseInt(d.bankId || "0", 10),
                "accountHolderName": "",
                "accountNumber": parseInt(d.accountNumber || "0", 10),
                "ifscCode": "",
                "branchName": "",
                "branchAddress": "",
                "addedById": parseInt(d.addedById || "0", 10),
                "remark": "",
                "upiAddress": "",
                "blockAmount": parseInt(d.blockAmount || "0", 10),
                "accountTypeId": parseInt(d.accountTypeId || "0", 10)

            };
        }
        default:
            throw new Error(`Unknown action: ${action}`);
    }
};
