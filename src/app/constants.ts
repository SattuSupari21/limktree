import {FaDiscord, FaGithub, FaInstagram, FaLinkedin, FaReddit, FaTelegram, FaYoutube} from "react-icons/fa6";
import {MdOutlineEmail} from "react-icons/md";

export const aboutSections = [{
    heading: "🚀 Our Mission:",
    description: " At Limktree, our mission is to empower individuals, creators, and businesses to showcase their unique stories and offerings through a personalized link hub. We're here to revolutionize the way you share content, engage with your audience, and leave a lasting impression."
}, {
    heading: "👉 How It Works:",
    description: "1. Sign Up: Get started by creating your free account on Limktree.\n" +
        "\n" +
        "2. Add Links: Easily add and organize links to your social profiles, websites, products, and more.\n" +
        "\n" +
        "3. Customize: Personalize the look and feel of your Linktree to match your style and brand.\n" +
        "\n" +
        "4. Share: Spread the word! Share your unique Linktree URL on social media, in email signatures, and\n" +
        "across all your platforms."
}]

export const featureSections = [{
    heading: "🎨 Customizable Profiles",
    description: "Personalize your profile with a unique background image, profile picture, and bio. Make a lasting impression and showcase your personality."
}, {
    heading: "🖼️ Customizable Layouts",
    description: "Choose from a variety of layout options to organize your links. Whether you prefer a grid view, list view, or something more creative, customize the layout to match your style."
}, {
    heading: "📱 Responsive Design",
    description: "Your profile looks great on any device, whether it's a desktop, tablet, or smartphone. Our responsive design ensures that your links are accessible to your audience wherever they are."
}, {
    heading: "🌐 Easy Sharing",
    description: "Share your profile with ease by sharing your unique link. Whether it's on social media, in your email signature, or on your business card, sharing your profile is simple and effective."
}]

export const buttons = [
    {key: 'discord', label: 'Discord', icon: FaDiscord},
    {key: 'github', label: 'GitHub', icon: FaGithub},
    {key: 'email', label: 'Email', icon: MdOutlineEmail},
    {key: 'instagram', label: 'Instagram', icon: FaInstagram},
    {key: 'reddit', label: 'Reddit', icon: FaReddit},
    {key: 'linkedin', label: 'LinkedIn', icon: FaLinkedin},
    {key: 'youtube', label: 'Youtube', icon: FaYoutube},
    {key: 'telegram', label: 'Telegram', icon: FaTelegram},
]

export const backgrounds = [
    {id: 1, bg: "bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500", type: "light"},
    {id: 2, bg: "bg-gradient-to-r from-green-300 via-blue-500 to-purple-600", type: "light"},
    {id: 3, bg: "bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400", type: "light"},
    {id: 4, bg: "bg-gradient-to-r from-green-200 via-green-400 to-purple-700", type: "light"},
    {id: 5, bg: "bg-gradient-to-r from-red-200 via-red-300 to-yellow-200", type: "light"},
    {id: 6, bg: "bg-gradient-to-r from-teal-200 to-lime-200", type: "light"},

    {id: 7, bg: "bg-gradient-to-r from-gray-700 via-gray-900 to-black", type: "dark"},
    {id: 8, bg: "bg-gradient-to-r from-gray-200 via-gray-400 to-gray-600", type: "dark"},
    {id: 9, bg: "bg-gradient-to-b from-gray-900 to-gray-600 bg-gradient-to-r", type: "dark"},
]

export const profileUser = './user.png'