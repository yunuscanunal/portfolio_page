import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { translations } from "../data/translations";

type Language = "en" | "tr";
type Theme = "dark" | "light";

interface GlobalContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (typeof translations)[Language];
  theme: Theme;
  toggleTheme: () => void;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    return (localStorage.getItem("lang") as Language) || "en";
  });
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem("theme") as Theme) || "dark";
  });

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "tr" : "en"));
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };
  useEffect(() => {
    localStorage.setItem("lang", language);
  }, [language]);
  useEffect(() => {
    localStorage.setItem("theme", theme);
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

// eslint-disable-next-line react-refresh/only-export-components
export const useGlobal = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error("useGlobal must be used within a GlobalProvider");
  }
  return context;
};
