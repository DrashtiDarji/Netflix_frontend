import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Homepage.css'
import Header from '../components/Header';
import Footer from '../components/Footer';
function Homepage(){
    let [movies,setMovies]= useState([]);
    let [top,setTop]= useState({});
    let [tranding, setTranding] = useState([]);
    let [scifi, setScifi]=useState([]);
    let [superhero, setSuperHero] =useState([])

    useEffect(()=>{
        let token = JSON.parse(localStorage.getItem("notflix_token")).token;
        fetch("http://localhost:8000/movies",{
            headers:{
                "Authorization":`Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then((data)=>{     
            // console.log(data)
            setMovies(data);
            let top= data.find((movie, index)=>{
                return movie.top===true;
            })
            setTop(top)

            let scifi= data.filter((movie,index)=>{
                return movie.category.toUpperCase().includes("sci-fi".toUpperCase())
            })
            setScifi(scifi)

            let superhero= data.filter((movie,index)=>{
                return movie.category.toUpperCase().includes("superhero".toUpperCase())
            })

            setSuperHero(superhero)

            

            let tranding = data.sort((a,b)=>{
                return b.watchers-a.watchers;
            }).slice(0,5)

            setTranding(tranding);

            console.log(top, scifi, superhero, tranding);
            
        })
        .catch((err)=>{
            console.log(err)
        })
    },[])
    
    return (
        <>
            

            <Header/>
            
            <div className="main_content_container">

                <section className="banner">
                    <div className="banner_card">
                        <img src={top.posterUrl} alt="" className="banner_img"/>
                    </div>
                    <div className="card_content"> 
                        <div className="card_info">

                            <div className="gener">
                                <i className="fa-solid fa-file"></i>
                                <span>{top.category}</span>
                            </div>
                            <div className="year">
                                <i className="fa-solid fa-calendar"></i>
                                <span>{top.releaseDate}</span>
                            </div>
                            <div className="time">
                                <i className="fa-solid fa-clock"></i>
                                <span>{top.runtime} min</span>
                            </div>
                            <div className="quality">
                                <span>4K</span>
                            </div>
                            
                            <Link to={"/VideoPlayer/"+top._id}><i className="fa-solid fa-play"></i></Link>
                            
                        </div>
                        <h1 className="c">{top.name}</h1>
                    </div>
                </section>

            {/* // Top Trending Movie */}
                <div className="movies_container">
                    <h2 className="section_head">
                        Top 5 Tranding
                    </h2>
                    <div className='tranding'>
                        {
                            tranding.map((mov,index)=>{
                                return(
                                    <div key={index} className="movie_card">

                                        <div className="movie_card_img">
                                            <img src={mov.posterUrl} alt=""/>
                                        </div>
                                        <div className="movie_card_content">
                                            <div className="movie_details">
                                                <h3 className="movie_title">{mov.name} </h3>
                                                <span className="genre">{mov.category}</span>
                                                <span className="year">{mov.releaseDate}</span>
                                                <Link to={"/VideoPlayer/"+mov._id}><i className="fa-solid fa-play"></i></Link>
                                            </div>
                                        </div>

                                    </div>
                                )
                                
                            })
                        }
                        

                    </div>
                
                

                </div>
            </div>

            {/* <!-- movie slide section  for SUPERHERO--> */}

            <section className="movie_cards_section">
                <div className="card_container">
                    <h2 className="section_head">
                        superHero Movies
                    </h2>
                    <div className="card-wrapper">
                        <div className="card_row">

                            {
                                superhero.map((mov,index)=>{
                                    return(
                                        <div key={index} className="cards">
                                            <div className='cards_img_ov'>
                                                <img src={mov.posterUrl} alt=""/>
                                                {/* <div className="cards_overlay">
                                                    <a href="#">
                                                        <i className="fa-solid fa-play"></i>
                                                    </a>
                                                    <span>
                                                        <a href="#">Watch Now</a>
                                                    </span>
                                                </div> */}
                                            </div>

                                            <div className='card_detail_box'>
                                                <div className='card_detail'>
                                                    <h3 className="card_detail_title">{mov.name}</h3>
                                                    <span className="card_detail_genre">{mov.category}</span>
                                                    <span className="card_detail_year">{mov.releaseDate}</span>
                                                    
                                                </div>
                                                <div className='car_detail_play'>
                                                    <Link to={"/VideoPlayer/"+mov._id}><i className="fa-solid fa-play"></i></Link>
                                                </div>
                                            </div>
                                            
                                        </div>
                                    )
                                })
                            }
                            

                        
                        </div>
                        <div className="buttons">
                            <button className="left"><i className="fa-solid fa-chevron-left"></i></button>
                            <button className="right"><i className="fa-solid fa-chevron-right"></i></button>
                        </div>
                    </div>
                </div>
            </section>



            {/* <!-- movie slide section for scifi --> */}
            <section className="movie_cards_section">
                <div className="card_container">
                    <h2 className="section_head">
                        Sci-Fi Movies
                    </h2>
                    <div className="card-wrapper">
                        <div className="card_row">

                            {
                                scifi.map((mov,index)=>{
                                    return(
                                        <div key={index} className="cards">
                                            <div className='cards_img_ov'>
                                                <img src={mov.posterUrl} alt=""/>
                                                {/* <div className="cards_overlay">
                                                    <a href="#">
                                                        <i className="fa-solid fa-play"></i>
                                                    </a>
                                                    <span>
                                                        <a href="#">Watch Now</a>
                                                    </span>
                                                </div> */}
                                            </div>

                                            <div className='card_detail_box'>
                                                <div className='card_detail'>
                                                    <h3 className="card_detail_title">{mov.name}</h3>
                                                    <span className="card_detail_genre">{mov.category}</span>
                                                    <span className="card_detail_year">{mov.releaseDate}</span>
                                                    
                                                </div>
                                                <div className='car_detail_play'>
                                                    <Link to={"/VideoPlayer/"+mov._id}><i className="fa-solid fa-play"></i></Link>
                                                </div>
                                            </div>
                                            
                                        </div>
                                    )
                                })
                            }
                            

                        
                        </div>
                        <div className="buttons">
                            <button className="left"><i className="fa-solid fa-chevron-left"></i></button>
                            <button className="right"><i className="fa-solid fa-chevron-right"></i></button>
                        </div>
                    </div>
                </div>
            </section>
            <Footer/>
        
        </>
    )
}

export default Homepage;


//below code is just for example of why to use Navigate for redurecting in jsx part:
/*import {Navigate} from 'react-router-dom'
function Homepage(){
    let token = localStorage.getItem("notflix_token");
    
    return token!==null ? (
        <h1>Welcome to Homepage</h1>
    ):
    (
        <Navigate to="/Login"/>
    )
}

export default Homepage;*/