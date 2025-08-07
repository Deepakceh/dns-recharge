// ✅ Function to build dynamic payloads
export const buildAuthPayload = (
  action: string,     // ← Action type
  data: unknown           // ← Payload data
): Record<string, unknown> => {

  switch (action) {
    case "ADMIN_LOGIN":
      return {
        "UserID": data?.userId || "",    // ← User ID from input
        "Password": data?.password || "" // ← Password from input
      };

    default:
      throw new Error(`Unknown action: ${action}`);  // 🚫 Handle unknown actions
  }
};
