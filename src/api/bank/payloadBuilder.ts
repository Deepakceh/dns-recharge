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
    accountHolderName?: string;
    ifscCode?: string;
    branchName?: string;
    branchAddress?: string;
    upiAddress?: string;
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
                    "bankAccountId": 0,
                    "transferTypeId": 0,
                    "gstTypeId": 0,
                    "userId": 0,
                    "fromDate": "",
                    "toDate": ""
                }
            }
        }
        case "ADD_UPDATE_BANK": {
            return {
                "id": d?.id ?? 0,
                "bankId": parseInt(d.bankId || "0", 10),
                "accountHolderName": d.accountHolderName || "",
                "accountNumber": d.accountNumber || "0",
                "ifscCode": d?.ifscCode || "",
                "branchName": d?.branchName || "",
                "branchAddress": d?.branchAddress,
                "remark": d?.remark || '',
                "upiAddress": d?.upiAddress || '',
                "accountTypeId": parseInt(d.accountTypeId || "0", 10)

            };
        }
        default:
            throw new Error(`Unknown action: ${action}`);
    }
};
