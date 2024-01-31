import Header from "@/app/components/Landing/components/Header";
import HeroSection from "@/app/components/Landing/components/HeroSection";

export default function Landing() {
    return (
        <div className="w-full h-full">
            <Header>
                <HeroSection/>
            </Header>
        </div>
    )
}