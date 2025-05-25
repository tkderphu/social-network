import PostCard from "../post/Post";
import PostForm from "../post/PostForm";

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
export default function GroupPost() {
    return (
        <div className="row mt-3">
            <div className="col-12">
                <PostForm />
                {/* {posts.map((post, index) => (
                    // <PostCard
                    //     key={index}
                    //     user={post.user}
                    //     time={post.time}
                    //     content={post.content}
                    // />
                ))} */}
            </div>
        </div>
    )
}