import "bootstrap/dist/css/bootstrap.css";
import "./global.css";

export const metadata = {
  title: "BlueSky Custom Domain Helper",
  description: "Change your BlueSky Handle to a Custom Domain",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactElement;
}): JSX.Element {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
