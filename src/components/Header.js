import { useEffect, useState } from 'react';
import { Link , useNavigate} from 'react-router-dom';
import VideoPlayer from '../Pages/VideoPlayer';
function Header(){
    let [movies, setMovies]=useState([]);
    let [filteredMovies,setFilteredMovies] = useState([]);
    let [searchAreaVisible, setSearchAreaVisible] = useState(false);
    let [user,setUser]=useState({});
    let [menuVisible,setMenuVisible]=useState(false)
    let navigate = useNavigate();

    // to get singleMovie
    useEffect(()=>{
        let token = JSON.parse(localStorage.getItem("notflix_token")).token;
        console.log(token)
        fetch("http://localhost:8000/movies",{
            headers:{
                "Authorization":`Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then((data)=>{     
            console.log(data)
            setMovies(data);
            
        })
        .catch((err)=>{
            console.log("err"+err)
        })
    },[])

    // to get user Info

    useEffect(()=>{
        let user_id = JSON.parse(localStorage.getItem("notflix_token")).user_id;
        let token = JSON.parse(localStorage.getItem("notflix_token")).token;
        console.log(user_id, token)
        fetch(`http://localhost:8000/users/${user_id}`,{
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
            }
        })
        .then((response)=>response.json())
        .then((data)=>{
            console.log(data)
          setUser(data.user)
        })
        .catch((err)=>{
            console.log(err)
        })
    },[])


    function searchMovies(name){

        if(name!==""){
            let searchMovie= movies.filter((mov,index)=>{
                return mov.name.toUpperCase().includes(name.toUpperCase())
            })

            setFilteredMovies(searchMovie); 
        }
        else{
            setFilteredMovies([]);
        }
            
    }

    function logout(){
        localStorage.removeItem("notflix_token");
        navigate("/login");
    }
    return (
        <>
             <div className="navbar">

                <div className="navbar_container">

                    <div className="logo_container">
                        <Link className="logo" to={'/Homepage'}><h1>NOT-FLIX</h1></Link>
                    </div>
                    <div className="menu_container">
                        <div className="searchBar">
                            <input type="text" 
                            onChange={(event)=>{
                                searchMovies(event.target.value)
                            }} 
                            onFocus={()=>{
                                setSearchAreaVisible(true);
                            }}
                            onBlur={()=>{
                                if(filteredMovies.length===0){
                                    setSearchAreaVisible(false)
                                }
                            }}
                            placeholder="Search Movie....."/>
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </div>
                        

                        <div className="profile_container" onClick={()=>{
                            if(menuVisible===true){
                                setMenuVisible(false);
                            }
                            else{
                                setMenuVisible(true);
                            }
                        }}>
                            <div className='user_name'>
                                {user.name}
                            </div>
                           <div className="user_img_container">
                                <img src="https://w7.pngwing.com/pngs/831/88/png-transparent-user-profile-computer-icons-user-interface-mystique-miscellaneous-user-interface-design-smile-thumbnail.png" alt=""/>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
            {
                menuVisible===true?
                (
                    <div className='profile_dropdown'>
                        <ul>
                            <li onClick={logout}>Logout</li>
                            <li>Profile</li>
                        </ul>
                    </div>
                ):
                null
            }
            
            


                        {/* seach results */}
            {
                searchAreaVisible===true?(
                    <div className='search_results'>
                        {
                            filteredMovies.length!==0?(
                                <section className='search_result_card'>
                                    {
                                        filteredMovies.map((mov,index)=>{
                                            return (
                                                <div key={index} className="cards">
                                                    <div className='cards_img_ov'>
                                                        <img src={mov.posterUrl} alt=""/>
                                                    </div>

                                                    <div className='card_detail_box'>
                                                        <div className='card_detail'>
                                                            <h3 className="card_detail_title">{mov.name}</h3>
                                                            <span className="card_detail_genre">{mov.category}</span>
                                                            <span className="card_detail_year">{mov.releaseDate}</span>
                                                            
                                                        </div>
                                                        <div className='car_detail_play'>
                                                            <Link to={"/VideoPlayer/"+mov._id} onClick={()=>{
                                                                setFilteredMovies=([]);
                                                                setSearchAreaVisible(false);
                                                            }}><i className="fa-solid fa-play"></i></Link>
                                                        </div>
                                                    </div>
                                            
                                                </div>
                                            )
                                        })
                                    }
                                </section>
                            ):
                            (
                                <div className='search_warning'>
                                    <p>PLease Search for something</p>
                                </div>
                                
                            )
                        }
                    </div>
                ):
                null
            }
        </>
       
    )
}

export default Header;