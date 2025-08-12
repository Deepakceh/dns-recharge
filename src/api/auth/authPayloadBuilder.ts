// Function to build dynamic payloads
export const buildAuthPayload = (
  action: string,   
  data: unknown          
): Record<string, unknown> => {

  switch (action) {
    case "ADMIN_LOGIN":
      return {
        "UserID": data?.userId || "",    
        "Password": data?.password || ""
      };

    default:
      throw new Error(`Unknown action: ${action}`); 
  }
};
