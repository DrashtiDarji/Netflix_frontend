import { useRef } from "react";
import {useNavigate} from "react-router-dom"
import './Login.css'

function Login(){
    let userCred={};
    let form = useRef();
    let navigate = useNavigate();

    function readValue(property, value){
        userCred[property]=value;
    }

    function login(){
        fetch('http://localhost:8000/users/login/',{
            method:"POST",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify(userCred)
        })
        .then((response)=>response.json())
        .then((data)=>{
            console.log(data);
            if(data.success=== true){
                localStorage.setItem("notflix_token",JSON.stringify(data));
                navigate("/homepage");
            }
            else{
                console.log(data)
            }

            
            form.current.reset();
        })
        .catch((err)=>{
            console.log(err)
        })
    }


    return(

            <>
                <header className="login_header">
                <div className="login_header_container">
                    <div className="login_header_logo">
                        <p>NOT-FLIX</p>
                    </div>
                    <div className="login_header_nav">
                        <div className="login_language">
                            <i className="fa-solid fa-globe globe_icon"></i>
                            <select className="login_language_select">
                                <option value="English">English</option>
                                <option value="Hindi">हिन्दी</option>
                            </select>
                        </div>
                        <button className="login_sign_in" onClick={()=>{
                            navigate('/');
                        }}>Sign up</button>
                    </div>
                    
                </div>

            </header>

            <section className="login_banner">
                <div className="login_banner_container">
                    <div className="login_form_section">
                        <form className="login_input_form" ref={form}>
                            <input type="email" placeholder="Enter Email Address" onChange={(event)=>{
                                readValue("email",event.target.value);
                            }}/>
                            <input type="password" placeholder="Enter Password" onChange={(event)=>{
                                readValue("password",event.target.value);
                            }}/>
                            <button type="button" className="login_email_btn" onClick={login}>LogIn</button>
                        </form>
                    </div>
                
                </div>
            </section>
        {/* <form className="container" ref={form}>

            <input type="email" className="form-control" placeholder="Email" onChange={(event)=>{
                readValue("email",event.target.value);
            }}/>

            <input type="password" className="form-control" placeholder="Password" onChange={(event)=>{
                readValue("password",event.target.value);
            }}/>

            <button type="button" className="btn btn-danger" onClick={login}>Login</button>
        </form> */}
            </>
        
    )
}

export default Login;