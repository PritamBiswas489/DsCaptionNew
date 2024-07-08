export interface ThemeContextType {
  currSymbol: string;
  currValue: number;
  isDark: boolean;
  setIsDark: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrValue: React.Dispatch<React.SetStateAction<number>>;
  setCurrSymbol: React.Dispatch<React.SetStateAction<string>>;
  isServiceManLogin: boolean;
  setIsServiceManLogin: React.Dispatch<React.SetStateAction<boolean>>;
  isFreelancerLogin: boolean;
  setIsFreeLancerLogin: React.Dispatch<React.SetStateAction<boolean>>;
  t:any
}
