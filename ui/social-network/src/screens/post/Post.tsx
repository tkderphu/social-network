const PostCard = ({ user: {userId, fullName, avatar}, post: {content, time, postId, imageUrls, like, comment, share}, group: {groupId, groupName},  }: any) => {
    return (
        <div className="card mb-3">
            <div className="card-body">
                <div className="d-flex align-items-center mb-3">
                    <img
                        src={avatar}
                        alt="User avatar"
                        className="rounded-circle me-2"
                        style={{ width: '40px', height: '40px' }}
                    />
                    <div>
                        <h6 className="mb-0">{fullName}</h6>
                        <small className="text-muted">{time}</small>
                    </div>
                </div>
                <p className="card-text">{content}</p>
                <div className="d-flex justify-content-between border-top pt-2">
                    <button className="btn btn-sm btn-outline-primary">Like</button>
                    <button className="btn btn-sm btn-outline-secondary">Comment</button>
                    <button className="btn btn-sm btn-outline-info">Share</button>
                </div>
            </div>
        </div>
    );
};

export default PostCard