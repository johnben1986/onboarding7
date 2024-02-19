import "./global.scss";
import '../src/index.css';

import { gsap } from 'gsap/dist/gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
import { useState } from "react";
import AppLayout from "components/AppLayout/AppLayout";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import MetadataHelper from "components/MetadataHelper";
import TapConversion from "../src/components/TapAffiliate";

import { Audiowide } from "next/font/google";
const fontAudiowide = Audiowide({
  variable: "--font-audiowide",
  subsets: ["latin"],
  weight: ["400"],
});
import { Arvo } from "next/font/google";
const fontArvo = Arvo({
  variable: "--font-arvo",
  subsets: ["latin"],
  weight: ["400", "700"],
});

import localFont from "next/font/local";
const fontMokoto = localFont({
  src: "../public/assets/fonts/Mokoto Glitch.ttf",
  variable: "--font-mokoto",
});
const fontTomorrow = localFont({
  src: "../public/assets/fonts/Tomorrow-Regular.ttf",
  variable: "--font-tomorrow",
});
const fontFreename = localFont({
  src: "../public/assets/fonts/Archivo-VariableFont.ttf",
  variable: "--font-freename",
});

const fontsClassName = `${fontMokoto.variable} ${fontTomorrow.variable} ${fontAudiowide.variable} ${fontArvo.variable} ${fontFreename.variable}`;

export default function App({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <>
      <div id="root" className={fontsClassName}>
        <MetadataHelper
          exactTitle="Web3 Onboarding"
          description="Web3 Onboarding is the premier platform to trade Web3 domain names. Browse, mint, buy, sell, and rent Web3 domains on the EDA platform now!"
          image="/assets/images/webp/logo.png"
          isGlobal={true}
        />
        <TapConversion />
        <QueryClientProvider client={queryClient}>
          <AppLayout>
            <Component {...pageProps} />
          </AppLayout>
        </QueryClientProvider>
      </div>
      <div id="modal"></div>
    </>
  );
}
