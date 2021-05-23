import { useEffect } from "react";

export const usePageTitle = (title?: string) => {
  useEffect(() => {
    document.title = `Plant Shop${title ? ` - ${title}` : ''}`;
  }, [title]);
};
