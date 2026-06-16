import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import Preloader from "@/components/Preloader";
import ScrollToTop from "@/components/ScrollToTop";
import LiveChat from "@/components/LiveChat";
import FloatingBanner from "@/components/FloatingBanner";
import SalePopup from "@/components/SalePopup";
import Footer from "@/components/Footer";
import YmInformerHider from "@/components/YmInformerHider";
import { SITE_URL, YM_COUNTER_ID } from "@/lib/site";
import { YANDEX_METRIKA_SCRIPT } from "@/lib/metrika";

const inter = localFont({
  src: [
    { path: "../../public/fonts/Inter-400.ttf", weight: "400", style: "normal" },
    { path: "../../public/fonts/Inter-500.ttf", weight: "500", style: "normal" },
    { path: "../../public/fonts/Inter-600.ttf", weight: "600", style: "normal" },
    { path: "../../public/fonts/Inter-700.ttf", weight: "700", style: "normal" },
    { path: "../../public/fonts/Inter-800.ttf", weight: "800", style: "normal" },
  ],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = localFont({
  src: [
    { path: "../../public/fonts/JetBrainsMono-400.ttf", weight: "400", style: "normal" },
    { path: "../../public/fonts/JetBrainsMono-500.ttf", weight: "500", style: "normal" },
  ],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Keml Studio | Разработка сайтов, Telegram-ботов, AI-автоматизация",
    template: "%s | Keml Studio",
  },
  description:
    "Создаём современные сайты, Telegram-ботов, AI-решения и CRM-системы в Казани и Татарстане. Премиум-дизайн, высокая конверсия, полный цикл разработки.",
  keywords: [
    "разработка сайтов Казань",
    "telegram бот разработка",
    "ai автоматизация бизнеса",
    "чат бот для бизнеса",
    "crm система",
    "лендинг под ключ",
    "интернет магазин",
    "seo продвижение",
    "цифровые услуги",
  ],
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: SITE_URL,
    siteName: "Keml Studio",
    title: "Keml Studio | Разработка сайтов, Telegram-ботов, AI-автоматизация",
    description:
      "Создаём современные сайты, Telegram-ботов, AI-решения и CRM-системы в Казани и Татарстане.",
  },
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL(SITE_URL),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className="dark">
      <body className={`${inter.variable} ${jetbrains.variable} antialiased`}>
        <Preloader />
        <Header />
        <main>{children}</main>
        <Footer />
        <ScrollToTop />
        <FloatingBanner />
        <SalePopup />
        <LiveChat />
        <YmInformerHider />
        <script
          id="yandex-metrika"
          dangerouslySetInnerHTML={{ __html: YANDEX_METRIKA_SCRIPT }}
        />
        <noscript>
          <div>
            <img
              src={`https://mc.yandex.ru/watch/${YM_COUNTER_ID}`}
              style={{ position: "absolute", left: "-9999px" }}
              alt=""
            />
          </div>
        </noscript>
      </body>
    </html>
  );
}
