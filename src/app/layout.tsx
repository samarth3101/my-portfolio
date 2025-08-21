import type { Metadata } from "next";
import "@/styles/globals.scss";

export const metadata: Metadata = {
  title: "Dr. Swati Shirke-Deshmukh",
  description: "Official portfolio website of Dr. Swati Shirke-Deshmukh, HoD of AIML Department.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}