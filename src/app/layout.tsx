import type {Metadata} from "next";
import "./globals.css";
import {Providers} from "@/app/providers";
import RecoilContextProvider from "@/store/recoilContextProvider";
import {InitUser} from "@/app/components/InitUser";

export const metadata: Metadata = {
    title: "Limktree",
    description: "Limktree",
};

export default function RootLayout({children}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body>
        <Providers>
            <RecoilContextProvider>
                <InitUser/>
                {children}
            </RecoilContextProvider>
        </Providers>
        </body>
        </html>
    );
}