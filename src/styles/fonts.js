import {
  IBM_Plex_Sans as Font1,
  Open_Sans as Font2,
  Original_Surfer as Font3,
} from "next/font/google";
``
const font1 = Font1({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-primary",
});

const font2 = Font2({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-secondary",
});

const font3 = Font3({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-script",
});

export const FONTS = {
  font1: font1.className,
  font2: font2.className,
  font3: font3.className,
};

export default FONTS;
