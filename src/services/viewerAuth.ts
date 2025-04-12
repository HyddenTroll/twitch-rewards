export const setViewerSession = (name: string) => {
    localStorage.setItem("viewerName", name);
  };
  
  export const getViewerSession = (): string | null => {
    return localStorage.getItem("viewerName");
  };
  
  export const clearViewerSession = () => {
    localStorage.removeItem("viewerName");
  };
  