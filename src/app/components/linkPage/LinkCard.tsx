import {IconBaseProps, IconType} from "react-icons";
import {Link} from "@nextui-org/react";

export default function LinkCards({title, icon, url}: { title: string, icon?: IconType, url: string }) {
    let Icon: IconType = icon as (props: IconBaseProps) => JSX.Element;
    return (
        <Link color={"foreground"} href={url} isExternal={true}
              className="flex items-center border border-white w-2/3 lg:w-1/2 h-auto rounded-full cursor-pointer mb-5 hover:bg-white hover:text-black hover:opacity-75 transition ease-in-out duration-300">
            <div className="w-14 h-14 p-2 rounded-full">
                <Icon className="w-full h-full"/>
                {/*<img*/}
                {/*    className="w-14 h-14 p-2 rounded-full"*/}
                {/*    src={props.image}*/}
                {/*    alt={props.name}*/}
                {/*></img>*/}
            </div>
            <p className="flex justify-center items-center w-full -ml-12">{title}</p>
        </Link>
    );
}