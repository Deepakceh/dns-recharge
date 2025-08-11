// Common API Response Type for All APIs
export interface ApiResponse<T = unknown> {
    responseCode?: string | null | "";
    responseMessage?: string | null | "";
    responseMessageMISC?: string | null | "";
    responseDynamic?: string | null | ""; 
    filterCount?: T | null; 
}
