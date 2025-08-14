// src/api/auth/payloadBuilder.ts

export interface SignUpRawData {
  otp?: string;
  role?: string;
  name?: string;
  shopName?: string;
  mobile?: string;
  email?: string;
  state?: string;
  district?: string;
  address?: string;
  pincode?: string;
  aadhar?: string;
  pan?: string;
  gst?: string;
  domainName?: string;
  companyType?: string;
  userId?: string;
  password?: string;
  confirmPassword?: string;
}

// ...keep rest of the code same

export const authPayload = (action: string, data: unknown): Record<string, unknown> => {
  const d = data as SignUpRawData;

  switch (action) {
    case "SIGN_UP":
      return {
        otp: d.otp || "",
        roleId: parseInt(d.role || "0", 10),
        fullName: d.name || "",
        orgName: d.shopName || "",
        mobileNumber: d.mobile || "",
        email: d.email || "",
        stateId: parseInt(d.state || "0", 10),
        districtId: parseInt(d.district || "0", 10),
        address: d.address || "",
        pincode: d.pincode || "",
        aadharNumber: d.aadhar || "",
        panCardNumber: d.pan || "",
        gstNumber: d.gst || "",
        domainName: d.domainName || "",
        companyTypeId: parseInt(d.companyType || "0", 10),
      };
    case "SIGN_IN":
      return {
        userName: d.userId || "",
        passWord: d.password || "",
      };
    case "SIGN_IN_OTP":
      return {
        userName: d.mobile || "",
        isOTP: true,
        otp: d.otp || ""
      };
    case "SIGN_IN_FORGOT":
      return {
        userName: d.mobile || '',
        passWord: d.confirmPassword || '',
        isOTP: true,
        otp: d.otp || ''
      };
    default:
      throw new Error(`Unknown action: ${action}`);
  }
};
