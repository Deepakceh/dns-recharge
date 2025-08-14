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
}

// ...keep rest of the code same

export const authPayload = (action: string, data: unknown): Record<string, unknown> => {
  const d = data as SignUpRawData;

  switch (action) {
    case "SIGN_UP":
      return {
        otp: d.otp || "",
        Role: parseInt(d.role || "0", 10),
        Name: d.name || "",
        ShopName: d.shopName || "",
        Mobile: d.mobile || "",
        Email: d.email || "",
        State: parseInt(d.state || "0", 10),
        District: parseInt(d.district || "0", 10),
        Address: d.address || "",
        Pincode: d.pincode || "",
        Aadhar: d.aadhar || "",
        Pan: d.pan || "",
        Gst: d.gst || "",
        DomainName: d.domainName || "",
        CompanyType: parseInt(d.companyType || "0", 10),
      };

    default:
      throw new Error(`Unknown action: ${action}`);
  }
};
