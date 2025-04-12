export interface ViewerSession {
  name: string;
}

export const setViewerSession = (name: string): void => {
  const session: ViewerSession = { name };
  localStorage.setItem("viewerSession", JSON.stringify(session));
};

export const getViewerSession = (): ViewerSession | null => {
  const data = localStorage.getItem("viewerSession");
  return data ? JSON.parse(data) : null;
};

export const clearViewerSession = (): void => {
  localStorage.removeItem("viewerSession");
};
