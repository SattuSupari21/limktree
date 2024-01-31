import {Link} from "@nextui-org/react";

export default function BottomWarning({label, linkLabel, link}: { label: string, linkLabel: string, link: string }) {
    return <div className="flex gap-1">
        <p>{label}</p>
        <Link
            href={link}
        >
            {linkLabel}
        </Link>
    </div>
}