// Common API Response Type for All APIs
export interface ApiResponse<T = unknown> {
    success: boolean;
    message?: string | null | "";
    data?: T | null;
}
