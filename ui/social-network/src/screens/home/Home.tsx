import { Link, useLocation, useNavigate } from 'react-router';
import ModalCustome from '../../components/modal/ModalCustom';
import PostForm from '../post/PostForm';
import remarkGfm from 'remark-gfm'
import Markdown from 'react-markdown'
import rehypeRaw from 'rehype-raw';
import { PostResp } from '../../model/postModel';

function Home() {

    return (
        <div className="row mt-3">
            <div className="col-8">
                {/* <PostForm /> */}
                {/* {posts.map((post, index) => (
                    <PostCard
                        key={index}
                        user={post.user}
                        time={post.time}
                        content={post.content}
                    />
                ))} */}
            </div>
            <div className='col-4'>

            </div>
        </div>
    )
}
export default Home