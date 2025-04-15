import "./Post.css"
export default function Post() {
    return (
        <div className="container">
            <div className="post">
                <div className="post-header">
                    <img src="https://i.pravatar.cc/48?img=12" alt="Avatar" className="avatar" />
                    <div>
                        <div><strong>Michael Jordan</strong></div>
                        <div className="text-muted" style={{ fontSize: "13px" }}>2 hrs ago · Public</div>
                    </div>
                </div>

                <div className="post-body">
                    Just read this amazing article about productivity. 💡 Highly recommend giving it a read!
                </div>

                <div className="article-preview mt-2">
                    <img src="https://source.unsplash.com/600x300/?productivity,office" alt="Article Image" />
                    <div className="article-preview-content">
                        <div className="article-title">10 Ways to Supercharge Your Daily Productivity</div>
                        <div className="article-link">www.productivityguru.com</div>
                    </div>
                </div>

                <div className="post-footer mt-2">
                    <div>
                        <button>👍 Like</button>
                        <button>💬 Comment</button>
                        <button>↗️ Share</button>
                    </div>
                    <div>
                        <span>32 Likes · 10 Comments</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
