import React from "react";

// GRADIENT : bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-700 via-zinc-900 to-black

export default function Container({children}: { children: React.ReactNode }) {
    return (
        <main
            className="w-screen h-screen">
            {children}
        </main>
    )
}