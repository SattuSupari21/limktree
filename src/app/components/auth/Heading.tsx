import React from "react";

export default function Heading({heading, subHeading}: { heading: string, subHeading: string }) {
    return <div className="flex items-center flex-col gap-2">
        <p className="text-4xl font-semibold mt-4 mb-2">{heading}</p>
        <p className="text-lg text-default-600">{subHeading}</p>
    </div>
}