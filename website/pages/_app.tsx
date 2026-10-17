import "../styles/globals.css";
import type { AppProps } from "next/app";
import { createTheme, ThemeProvider } from "@mui/material/styles";
const theme = createTheme({
  palette: {
    primary: { main: "#315bd6" },
    text: { primary: "#172536", secondary: "#647084" },
  },
  typography: {
    fontFamily: "inherit",
    fontSize: 14,
    button: { textTransform: "none" },
  },
  shape: { borderRadius: 12 },
});
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
