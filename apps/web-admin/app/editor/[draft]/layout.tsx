import "@benjamin/ui/benjamin-ui-global.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="px-4 py-6">{children}</main>;
}
