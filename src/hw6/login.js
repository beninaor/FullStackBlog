import React from 'react';
import axios from 'axios';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: null,
            password: null,
            data: [],
            resp: ""
        };
    }


    changeUsername = (e) => {
        this.setState({
            name: e.target.value,
        });
    }

    changePassword = (e) => {
        this.setState({
            password: e.target.value,
        });
    }

    doLogin = (e) => {
        const localUrl = "http://localhost:5000/login";
        //const deployUrl = "/login";
        const data = {
            name: this.state.name,
            password: this.state.password
        }
        axios.post(localUrl, data)
            .then((res) => {
                if(res.status === 200) {
                    this.setState({
                        data: [],
                        resp: "Success: user logged in."
                    });
                    console.log(res)
                    let localUrlGetIdByName = "http://localhost:5000/getidbyname/" + this.state.name
                    //let deployUrlGetIdByName = "/getidbyname/" + this.state.name;
                    axios.get(localUrlGetIdByName)
                        .then((resTwo)=>{
                            this.props.onLogin({onLogin: true, userId: resTwo.data.id})
                            this.props.history.push("/")

                        })
                        .catch(err=>{
                            console.log(err)
                        })
                    }
            })
            .catch((err) => {
                console.log(err)
                this.setState({
                    data: [],
                    resp: "Error: failed to login user try to signup."
                });
                alert(this.state.resp)

            });
    }


    render() {
        return (
            <div>
                <h2>Login</h2>
                <div>
                    name: <input type="text" onChange={this.changeUsername} placeholder={"Enter name"} required></input><br/>
                    password: <input type="password" onChange={this. changePassword} placeholder="Enter Password" required></input><br/>
                    <button onClick={this.doLogin}>send</button><br/>
                    {this.state.resp?this.state.resp:null}
                </div>
            </div>
        );
    }
}

