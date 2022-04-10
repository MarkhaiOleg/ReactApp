import React from 'react';
import MyButton from './UI/button/MyButton';
import '../styles/App.css'
import { useNavigate, Navigate } from 'react-router-dom';

const Postitem = (props) => {
    const router = useNavigate()

    function handleClick() {
        router(`/posts/${props.post.id}`);
    };

    return (
        <div className="post">
            <div className="post__content">
                <strong>{props.post.id}. {props.post.title}</strong>
                <div>
                    {props.post.body}
                </div>
            </div>
            <div className="post__btns">
                <MyButton style={{ marginRight: "10px", marginLeft: "10px" }} onClick={handleClick}>
                    Відкрити
                </MyButton>
                <MyButton onClick={() => props.remove(props.post)}>
                    Видалити
                </MyButton>
            </div>
        </div >
    )
}

export default Postitem;