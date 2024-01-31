import React from "react";

export default function Container({children}: { children: React.ReactNode }) {
    return (
        <main
            className="h-screen w-screen bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-700 via-zinc-900 to-black">
            {children}
        </main>
    )
}