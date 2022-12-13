import { useRef } from "react";

function Register(){
    let user={};
    let form = useRef();

    function readValue(property, value){
        user[property]=value;
        console.log(user)
    }

    function registration(){
        fetch('http://localhost:8000/users/',{
            method:"POST",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify(user)
        })
        .then((response)=>response.json())
        .then((data)=>{
            console.log(data);
            form.current.reset();
        })
        .catch((err)=>{
            console.log(err)
        })
    }


    return(
        <form className="container" ref={form}>
            <input type="text"  className="form-control" placeholder="Name" onChange={(event)=>{
                readValue("name",event.target.value);
            }}/>

            <input type="email" className="form-control" placeholder="Email" onChange={(event)=>{
                readValue("email",event.target.value);
            }}/>

            <input type="password" className="form-control" placeholder="Password" onChange={(event)=>{
                readValue("password",event.target.value);
            }}/>

            <input type="text" className="form-control" placeholder="Contact" onChange={(event)=>{
                readValue("contact",event.target.value);
            }}/>

            <input type="text" className="form-control" placeholder="City" onChange={(event)=>{
                readValue("city",event.target.value);
            }}/>

            <input type="number" className="form-control" placeholder="Pincode" onChange={(event)=>{
                readValue("pipncode",event.target.value);
            }}/>

            <button type="button" className="btn btn-danger" onClick={registration}>Register</button>
        </form>
    )
}

export default Register;