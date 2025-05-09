import { Link, useLocation, useNavigate } from 'react-router';
import ModalCustome from '../../components/modal/ModalCustom';
import PostForm from '../post/PostForm';
import remarkGfm from 'remark-gfm'
import Markdown from 'react-markdown'
import rehypeRaw from 'rehype-raw';
export const PostCard = ({ user, time, content }: any) => {
    const navigate = useNavigate()
    const location = useLocation()
    return (
        <div className="card mb-3">

            <div className="card-body">
                <div className='d-flex justify-content-between'>
                    <div className="d-flex align-items-center mb-3">
                        <img
                            src="https://via.placeholder.com/40"
                            alt="User avatar"
                            className="rounded-circle me-2"
                            style={{ width: '40px', height: '40px' }}
                        />
                        <div>
                            <Link to={"/profile/1"}><h6 className="mb-0">{user}</h6></Link>
                            <small className="text-muted">{time}</small>
                        </div>
                    </div>
                    <a href='/group'>Thuc tap co so</a>
                </div>

                <div onClick={() => {
                    navigate("/posts/1", {
                        state: {
                            backgroundLocation: location
                        }
                    })
                }} style={{ cursor: 'pointer' }}>
                    {/* <div dangerouslySetInnerHTML={{ __html: window.marked ? window.marked.parse(content) : content }} /> */}
                    <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                  {content}
                </Markdown>                        {/* <p className="card-text">{content}</p> */}
                </div>
                <div className="d-flex justify-content-between border-top pt-2">
                    <button className="btn btn-sm btn-outline-primary">Like: 1212</button>
                    <button className="btn btn-sm btn-outline-secondary">Comment: 1212</button>
                    <button className="btn btn-sm btn-outline-info">Share: 1212</button>
                </div>
            </div>
        </div>
    );
};
function Home() {

    const markdownText = `
    # Heading 1
    ## Heading 2
    ### Heading 3
    
    **Bold text**  
    *Italic text*  
    ~~Strikethrough~~
    
    - List item 1
    - List item 2
      - Nested item
    
    1. Ordered item 1
    2. Ordered item 2
    
    [Link to Google](https://www.google.com)
    
    ![Image](https://example.com/image.jpg)
    
    > Blockquote
    
    \`Inline code\`
    
    \`\`\`javascript
    // Code block
    console.log("Hello, world!");
    \`\`\`
    `;
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
    return (
        <div className="row mt-3">
            <div className="col-8">
                <PostForm />
                {posts.map((post, index) => (
                    <PostCard
                        key={index}
                        user={post.user}
                        time={post.time}
                        content={post.content}
                    />
                ))}
            </div>
            <div className='col-4'>
                {/* <h1>sasa</h1> */}
            </div>
        </div>
    )
}
export default Home