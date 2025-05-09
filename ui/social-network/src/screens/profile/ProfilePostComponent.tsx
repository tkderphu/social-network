import { useParams } from "react-router";
import { PostCard } from "../home/Home";
const posts = [
    {
        user: "John Doe",
        time: "2 hours ago",
        content: "Enjoying a great day at the park! 🌳",
    },
    {
        user: "Alex Johnson",
        time: "Yesterday",
        content: "Check out this amazing recipe I tried! \n # Foodie\n\n### Ingredients\n- Tomatoes\n- Basil\n- Olive oil\n\n[Full recipe here](https://example.com)",
    },
];

export default function ProfilePostComponent() {
    const { id } = useParams()

    return (
        <div>
            <div className="input-group mb-3">
                <div className="input-group">
                    <button style={{ border: "none" }} className="input-group-text"><span >Write comment</span></button>
                    <div data-toggle="modal" data-target=".your-bulletin" className="form-control rounded" style={{
                        cursor: "pointer"
                    }} aria-label="With textarea"><span>What's on your mind?</span></div>


                </div>
            </div>
            {posts.map((post, index) => (
                <PostCard
                    key={index}
                    user={post.user}
                    time={post.time}
                    content={post.content}
                />
            ))}
        </div>
    )
}