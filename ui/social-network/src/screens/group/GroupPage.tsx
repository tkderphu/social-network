import { useParams } from "react-router";


export default function GroupPage() {
  const { name } = useParams()
  return (
    <div className="bg-dark text-white min-vh-100">
      {/* Cover Photo */}
      <div className="position-relative">
        <img
          src="https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"
          alt="Cover"
          className="w-100"
          style={{ height: "300px", objectFit: "cover" }}
        />
        <div className="bottom-0 start-0  bg-primary px-3 py-1">
          Group by Mạnh Tuấn
        </div>
      </div>

      {/* Group Info */}
      <div className="container mt-3">
        <h3>J2TEAM Community</h3>
        <p className="text-muted">Public group · 660.5K members</p>

        {/* Avatars */}
        <div className="d-flex mb-3">
          {[...Array(10)].map((_, i) => (
            <img
              key={i}
              src={`https://i.pravatar.cc/40?img=${i + 1}`}
              alt="avatar"
              className="rounded-circle me-1"
              width={32}
              height={32}
            />
          ))}
        </div>

        {/* Action Buttons */}
        <div className="mb-3 d-flex justify-content-around">
          <button className="btn btn-primary me-2">+ Invite</button>
          <button className="btn btn-secondary me-2">Share</button>
          <button className="btn btn-outline-light me-2">Joined</button>
        </div>

        {/* Navigation Tabs */}
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <a className="nav-link active" href="#">
              Discussion
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Featured
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              People
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Media
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Files
            </a>
          </li>
        </ul>

        {/* Post Input */}
        <div className="bg-secondary rounded p-3 mt-3">
          <input
            className="form-control mb-2"
            placeholder="Write something..."
          />
          <div className="d-flex justify-content-between">
            <button className="btn btn-outline-light">📊 Poll</button>
          </div>
        </div>

        {/* About Box */}
        <div className="bg-dark border border-light p-3 mt-4 rounded">
          <h5>About</h5>
          <p>
            J2TEAM Community là nhóm cộng đồng dành cho người dùng Samsung-J2
            những bạn yêu mến J2TEAM và JUNO_OKYO.
          </p>
          <p className="mb-1">
            <strong>Public</strong><br />
            Anyone can see who's in the group and what they post.
          </p>
          <p>
            <strong>Visible</strong><br />
            Anyone can find this group.
          </p>
        </div>
      </div>
    </div>
  );
}
