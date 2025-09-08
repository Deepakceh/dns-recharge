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
    remark?: string
    roleName?: string
    packageName?: string
    page?: number
    size?: number
    permissions?: Array<{ menuId: number; canView: boolean; canCreate: boolean; canUpdate: boolean; canDelete: boolean; }>;
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
        case "GET_NOTIFICATION_LIST": {
            const { page = 1, size = 100 } = data as { page?: number; size?: number };
            return {
                "pageNumber": page,
                "pageSize": size,
            }
        }
        case "ADD_UPDATE_NOTIFICATION": {
            return {
                id: d?.id ?? 0,
                roleId: parseInt(d.roleId || "0", 10),
                notificationMsg: d?.notificationMsg ?? "",
                remark: d?.remark ?? ""
            };
        }
        case "ADD_UPDATE_ROLE": {
            return {
                id: d?.id ?? 0,
                name: d?.roleName || "",
                remark: ''
            };
        }
        case "GET_MENU_FOR_ROLE_PERMISSIONS": {
            return {
                roleId: parseInt(d.roleId || "0", 10)
            };
        }
        case "SET_MENU_PERMISSIONS": {
            return {
                roleId: parseInt(d.roleId || "0", 10),
                permissions: d?.permissions
            };
        }
        case "GET_PACKAGE_LIST": {
            const { page = 1, size = 100 } = data as { page?: number; size?: number };
            return {
                "pageNumber": page,
                "pageSize": size,
            }
        }
        case "ADD_UPDATE_PACKAGE": {
            return {
                id: d?.id ?? 0,
                packageName: d?.packageName || "",
            };
        }
        case "GET_PACKAGE_WISE_MARGINS": {
            return {
                "pageNumber": d?.page,
                "pageSize": d?.size,
                "filter": {
                    "packageId": parseInt(d.packageId || "0", 10),
                }
            }
        }
        default:
            throw new Error(`Unknown action: ${action}`);
    }
};
