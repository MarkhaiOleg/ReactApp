import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import PostService from '../components/API/PostServise'
import { useFetching } from '../components/hooks/useFetching'
import Loader from '../components/UI/loader/Loader'
import '../styles/App.css'

const PostIdPage = () => {
    const params = useParams()
    const [post, setPost] = useState({})
    const [comments, setComments] = useState([])
    const [fetchPostById, isLoading, error] = useFetching(async (id) => {
        const response = await PostService.getById(id)
        setPost(response.data)
    })

    const [fetchCommnets, isComLoading, comError] = useFetching(async (id) => {
        const response = await PostService.getCommentsByPostId(id)
        setComments(response.data)
    })


    useEffect(() => {
        fetchPostById(params.id)
        fetchCommnets(params.id)
    }, [])

    return (
        <div className="coment__body">
            <div>
                <h1 className="coment__title">Ви відкрили сторінку посту з ID : {params.id}</h1>
                {isLoading
                    ? <Loader />
                    : <div style={{ fontSize: '30px' }}>{post.id}. {post.title}</div>
                }
                <h1 className="comment__title__small">Коментарі</h1>
                {isLoading
                    ? <Loader />
                    : <div>
                        {comments.map(comm =>
                            <div key={comm.id} style={{ marginTop: "15px" }}>
                                <h5>{comm.email}</h5>
                                <div>{comm.body}</div>
                            </div>
                        )}
                    </div>
                }
            </div>

        </div>
    )
}

export default PostIdPage;
