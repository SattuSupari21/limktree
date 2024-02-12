import { IconBaseProps, IconType } from "react-icons";
import { Link } from "@nextui-org/react";

export default function LinkCards({
    title,
    icon,
    url,
    color,
}: {
    title: string;
    icon?: IconType;
    url: string;
    color: string;
}) {
    let Icon: IconType = icon as (props: IconBaseProps) => JSX.Element;
    const hoverTextColor =
        color === "white" ? "hover:text-black" : "hover:text-white";
    const border = color === "white" ? "border-white" : "border-black";
    const borderHoverColor =
        color === "white" ? "hover:border-white" : "hover:border-black";
    const bgHoverColor =
        color === "white" ? "hover:bg-white" : "hover:bg-black";
    return (
        <div
            className={`flex items-center ${border} ${borderHoverColor} ${bgHoverColor} border-2 text-${color} ${hoverTextColor} w-2/3 md:w-1/2 lg:w-1/3 h-auto rounded-full cursor-pointer mb-5 hover:opacity-75 transition ease-in-out duration-300`}
        >
            <a
                href={url}
                target="_blank"
                className={`w-full flex text-${color} ${hoverTextColor}`}
            >
                <div className="w-14 h-14 p-2 rounded-full">
                    <Icon className={`w-full h-full`} />
                    {/*<img*/}
                    {/*    className="w-14 h-14 p-2 rounded-full"*/}
                    {/*    src={props.image}*/}
                    {/*    alt={props.name}*/}
                    {/*></img>*/}
                </div>
                <p className={`flex justify-center items-center w-full -ml-12`}>
                    {title}
                </p>
            </a>
        </div>
    );
}
