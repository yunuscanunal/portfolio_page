import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { translations } from "../data/translations";

type Language = "en" | "tr";
type Theme = "dark" | "light";

interface GlobalContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (typeof translations)["en"];
  theme: Theme;
  toggleTheme: () => void;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  // Language State (Default: 'en')
  const [language, setLanguage] = useState<Language>("en");

  // Theme State (Default: 'dark')
  const [theme, setTheme] = useState<Theme>("dark");

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "tr" : "en"));
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  // Theme değiştiğinde HTML class'ını güncelle
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("dark", "light");
    root.classList.add(theme);
  }, [theme]);

  return (
    <GlobalContext.Provider
      value={{
        language,
        toggleLanguage,
        t: translations[language],
        theme,
        toggleTheme,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error("useGlobal must be used within a GlobalProvider");
  }
  return context;
};
