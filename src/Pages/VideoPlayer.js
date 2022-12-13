import { useEffect, useRef, useState } from 'react';
import './Homepage.css'
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useParams } from 'react-router-dom';
function VideoPlayer(){

    let params = useParams();
    let [movie,setMovie]= useState({});
    let [playing, setPlaying] =useState(false);
    let videoPlayer = useRef();
    let [userMovie , setUserMovie]= useState({});
    

    useEffect(()=>{
        setPlaying(false);
        let token = JSON.parse(localStorage.getItem("notflix_token")).token;
        
        
        fetch(`http://localhost:8000/movies/${params.id}`, {
            headers:{
                "Authorization":`Bearer ${token}`
            }
        })
        .then((response)=>response.json())
        .then((data)=>{
            console.log(data)
            setMovie(data);
        })
        
    },[params])

    useEffect(()=>{
        if(playing===true){
            videoPlayer.current.currentTime=userMovie.watched;
        }

    },[playing])
    
    function play(){
        let token = JSON.parse(localStorage.getItem("notflix_token")).token;
        let user_id = JSON.parse(localStorage.getItem("notflix_token")).user_id;

        fetch('http://localhost:8000/users/play',{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
            },
            body:JSON.stringify({movie:movie._id,user:user_id})
        })
        .then((response)=>response.json())
        .then((data)=>{
           if(data.success === true){
            setUserMovie(data.user_movie);
            setPlaying(true);
           }
        })
        .catch((err)=>{
            console.log(err)
        })
    
    }

    function closePlayer(){
        let watched = videoPlayer.current.currentTime;
        let token = JSON.parse(localStorage.getItem("notflix_token")).token;

        fetch(`http://localhost:8000/users/closeplayer/${userMovie._id}`,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
            },
            body:JSON.stringify({watched:watched})
        })
        .then((response)=>response.json())
        .then((data)=>{
           if(data.success === true){
            setPlaying(false);
           }
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    return (
        <>
            

            <Header/>
            
            <div className="main_content_container">
                {
                    playing===false?
                    (
                        <section className="banner">
                            <div className="banner_card">
                                <img src={movie.posterUrl} alt="" className="banner_img"/>
                            </div>
                            <div className="card_content"> 
                                <div className="card_info">

                                    <div className="gener">
                                        <i className="fa-solid fa-file"></i>
                                        <span>{movie.category}</span>
                                    </div>
                                    <div className="year">
                                        <i className="fa-solid fa-calendar"></i>
                                        <span>{movie.releaseDate}</span>
                                    </div>
                                    <div className="time">
                                        <i className="fa-solid fa-clock"></i>
                                        <span>{movie.runtime} min</span>
                                    </div>
                                    <div className="quality">
                                        <span>4K</span>
                                    </div>
                                    
                                    <a onClick={()=>{
                                        play();
                                    }}><i className="fa-solid fa-play"></i></a>
                                    
                                </div>
                                <h1 className="c">{movie.name}</h1>
                            </div>
                        </section>
                    )
                    :
                    (
                        //  video player section
                        <section className='player'>
                            <div className='close_player'>
                                <h1>{movie.name}</h1>
                                <i className="fa-solid fa-xmark close_btn" onClick={()=>{
                                    closePlayer();
                                }}></i>

                            </div>
                            <video className='video_player' ref={videoPlayer} autoPlay controls>
                                <source src={`http://localhost:8000/movies/stream/${movie._id}`}/>
                            </video>

                        </section>
                    )
                }

                

                
                
                <div className='player_description'>
                    <div className='disc_child'>
                        <h2>Description</h2>
                        <p>{movie.description}</p>
                    </div>
                    <div className='disc_child'>
                        <h2>Rating</h2>
                        <p>{movie.imbdRating}</p>
                    </div>
                </div>

            </div>

            <Footer/>
        
        </>
    )
}

export default VideoPlayer;