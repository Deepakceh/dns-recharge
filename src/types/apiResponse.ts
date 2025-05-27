// Common API Response Type for All APIs
export interface ApiResponse<T = any> {
    responseCode?: string | null | "";
    responseMessage?: string | null | "";
    responseMessageMISC?: string | null | "";
    responseDynamic?: string | null | ""; // Can be a string, null, or blank
    recordCount?: T | null;
    filterCount?: T | null; // Can be null
}
