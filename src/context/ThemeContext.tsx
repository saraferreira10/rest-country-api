import { ReactNode, createContext, useState } from "react";

type Mode = "light" | "dark";

type ValueMode = {
  theme: Mode;
  handleChangeTheme?: () => void;
};

type ThemeProps = {
  children: ReactNode;
};

const DEFAULT_MODE: Mode = "light";

export const ThemeContext = createContext<ValueMode>({ theme: DEFAULT_MODE });

export const ThemeProvider = ({ children }: ThemeProps) => {
  const [theme, setTheme] = useState<Mode>(DEFAULT_MODE);

  function handleChangeTheme() {
    setTheme((theme) => (theme === "light" ? "dark" : "light"));
  }

  return (
    <ThemeContext.Provider value={{ theme, handleChangeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
