export default function LinkPage({params}: { params: { customUrl: string } }) {
    return <div>My Post: {params.customUrl}</div>
}