import Header from "@/app/components/landing/components/Header";
import {aboutSections} from "@/app/constants";

function RenderAboutSection({heading, description}: { heading: string, description: string }) {
    return <section className="flex flex-col gap-2">
        <p className="text-2xl font-semibold">
            {heading}
        </p>
        <p className="text-md whitespace-pre-wrap">{description}</p>
    </section>
}

export default function About() {
    return (
        <div>
            <Header/>
            <div className="w-6/12 px-20 pb-8 mt-12 mx-auto h-auto flex flex-col justify-center gap-8">
                <p className="text-5xl font-bold text-center sm:text-2xl">🌟 About Limktree</p>
                <p className="text-xl">
                    Welcome to Limktree, the ultimate platform for curating and sharing your favorite
                    links! We believe in simplifying online connections and making your digital presence truly
                    memorable.
                </p>
                {aboutSections.map((about) => <RenderAboutSection key={about.heading} heading={about.heading}
                                                                  description={about.description}/>)}
            </div>
        </div>
    )
}