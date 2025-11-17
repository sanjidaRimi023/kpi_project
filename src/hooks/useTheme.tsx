// hooks/useTheme.ts
import { useContext } from "react";
import { ThemeProviderContext } from "../context/theme-context";


export function useTheme() {
  return useContext(ThemeProviderContext);
}
