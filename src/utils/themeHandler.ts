export const applyThemeSettings = (): void => {
  const client = import.meta.env.VITE_REACT_APP_CLIENT || "DNS";

  // 1. Update Favicon
  const link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
  if (link) {
    const icon = `favicon-${client.toString()}`;  // Favicon based on theme
    link.href = `${import.meta.env.BASE_URL}${icon}.ico`;
  }

  //  2. Update Title
  let title = client;  // Default title

  if (client === "DNS") {
    title = "DNS";
  } else if (client === "CLIENTB") {
    title = "ClientB";
  } 

  document.title = title;
};
