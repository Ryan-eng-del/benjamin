"use client";
import "@benjamin/ui/benjamin-ui-global.css";
import { SnackbarProvider } from "notistack";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SnackbarProvider
      preventDuplicate
      autoHideDuration={2000}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <main className="px-4 py-6">{children}</main>;
    </SnackbarProvider>
  );
}
