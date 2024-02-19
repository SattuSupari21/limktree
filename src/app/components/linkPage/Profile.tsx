import {SlOptions} from "react-icons/sl";
import {profileUser} from "@/app/constants";

export default function Profile({firstname, lastname, description, profilePicture}: {
    firstname: string,
    lastname: string,
    description: string,
    profilePicture: string,
}) {
    return (
        <div className="w-2/3 md:w-1/2 lg:w-1/3 h-auto mt-2 mb-4 flex flex-col items-center">
            <div
                className="flex justify-center items-center bg-white border border-white rounded-full w-8 h-8 cursor-pointer ml-auto">
                <SlOptions className="text-black w-3"/>
            </div>
            <img
                className="w-24 h-24 rounded-full"
                src={profilePicture ? profilePicture : profileUser}
                alt="profile-image"
            ></img>
            <div className="flex flex-col text-center mt-4 gap-2">
                <p className="font-bold">@{firstname} {lastname}</p>
                <p className="italic">
                    {description}
                </p>
            </div>
        </div>
    );
}