import React from 'react';
import axios from 'axios';
import '../Stylies/NewPost.css';


export default class NewPost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: this.props.userId,
            data: [],
            id : null,
            title: null,
            content: null,
            published: null,
            author : null,
            imageurl :null,
            resp: null
        };
    }

    EditTitle = (e) => {
        this.setState({
            title: e.target.value,
        });
    }
    EditContent = (e) => {
        this.setState({
            content: e.target.value,
        });
    }

    EditImageUrl = (e) => {
        this.setState({
            imageurl: e.target.value,
        });
    }

    EditPublished = (e) => {
        this.setState({
            published: e.target.value,
        });
    }
    EditAuthor = (e) => {
        this.setState({
            author: e.target.value,
        });
    }


    addPost = (e) => {
        const localUrl = "http://localhost:5000/posts";
        //const deployUrl = "/posts/";
        const data = {
            userId: this.state.userId,
            title: this.state.title,
            content: this.state.content,
            published:this.state.published,
            author:this.state.author,
            imageurl: this.state.imageurl
        }
        axios.post(localUrl, data)
            .then((res) => {
                if (res.status === 200) {
                    this.setState({
                        data: [res.data],
                        resp: "Success: user add post.",
                        gotPostData: true,
                    });
                    this.props.history.push('/')

                }
            })
            .catch((err) => {
                this.setState({
                    data: [],
                    resp: "Error: failed to add post."
                });
            });
    }

    render() {
        return (
            <div>
                <h2>Create New Post</h2>
                <div>
                    <p>title: <input type="text" onChange={this.EditTitle} placeholder={"Enter title"} required></input><br/></p>
                    <p> content: <input type="text" onChange={this.EditContent} placeholder="Enter post" required></input><br/></p>
                    <p>published: <input type="text" onChange={this.EditPublished} placeholder="Enter post" required></input><br/></p>
                    <p>author: <input type="text" onChange={this.EditAuthor} placeholder="Enter name" required></input><br/></p>
                    <p>image url: <input type="text" onChange={this.EditImageUrl} placeholder="Enter Image Url" required></input><br/></p>
                </div>
                <button onClick={this.addPost}>add Post</button><br/>
            </div>
        );
    }
}