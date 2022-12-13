import { useRef } from "react";
import Footer from '../components/Footer';
import { useNavigate } from "react-router-dom";
import './Landingpage.css'
function Landingpage (){
    let user={};
    let form = useRef();
    let navigate = useNavigate();

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
    return (
        <>
             {/* landing page header section */}
            <header className="lp_header">
                <div className="lp_header_container">
                    <div className="lp_header_logo">
                        <p>NOT-FLIX</p>
                    </div>
                    <div className="lp_header_nav">
                        <div className="lp_language">
                            <i className="fa-solid fa-globe globe_icon"></i>
                            <select className="lp_language_select">
                                <option value="English">English</option>
                                <option value="Hindi">हिन्दी</option>
                            </select>
                        </div>
                        <button className="lp_sign_in" onClick={()=>{
                            navigate("/Login")
                        }}>Login</button>
                    </div>
                    
                </div>

            </header>

            {/* landing page banner section */}
            <section className="lp_banner">
                <div className="lp_banner_container">
                    <h1 className="lp_banner_title">TV, Movies, Series and More,</h1>
                    <h1 className="lp_banner_title">Watch anytime anywhere.</h1>
                    <div className='lp_form_section'>
                        <form className='lp_input_form' ref={form}>
                            <input type="text" placeholder="Enter User Name" onChange={(event)=>{
                                readValue("name",event.target.value);
                            }}/>
                            <input type="email" placeholder="Enter Email Address" onChange={(event)=>{
                                readValue("email",event.target.value);
                            }}/>
                            <input type="password" placeholder="choose Password" onChange={(event)=>{
                                readValue("password",event.target.value);
                            }}/>
                            <input type="text" placeholder="Mobile No." onChange={(event)=>{
                                readValue("contact",event.target.value);
                            }}/>
                            <input type="text" placeholder="City." onChange={(event)=>{
                                readValue("city",event.target.value);
                            }}/>
                            <input type="text" placeholder="Pincode" onChange={(event)=>{
                                readValue("pipncode",event.target.value);
                            }}/>            
                            <button className="lp_email_btn" onClick={registration}>Register Now<i className="fa-solid fa-angle-right"></i></button>
                        </form>
                    </div>
                
                </div>
            </section>
            {/* section divider */}
            <div className="lp_section_divider">
            </div>


            {/* section for  casting Example  */}
            <section className="lp_casting_example">
                <div className="lp_casting_container">
                    <div className="lp_cast_contain">
                        <div className="lp_cast_info">
                            <h1>Stream Now</h1>
                            <h3>Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players and more.</h3>
                        </div>   
                    </div>
                    <div className="lp_cast_video">
                        <img src="../media/images/smart_tv_2.jpg" className="lp_desktop_img"/>
                        <video src="../media/images/streaming video.m4v" className="lp_desktop_video" loop autoPlay muted></video>
                    </div>

                </div>
            </section>
    
            {/* section divider */}
            <div className="lp_section_divider">
            </div>
    

            {/* Section for frequenty asked questions */}
            <section className="lp_faq_questions">
                <div className="lp_faq_container">
                    <div className="lp_faq_heading">
                        <p>Frequently Asked Questions</p>
                    </div>
                    <div className="lp_faq_accordion">
                        <input type="checkbox" id="title1" className="lp_faq_input"/>
                        <label htmlFor="title1" className="lp_faq_label">What is Not-flix?</label>

                        <div className="lp_faq_content">
                            <p>Not-flix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries and more – on thousands of internet-connected devices.
                                <br/>
                                You can watch as much as you want, whenever you want, without a single ad – all for one low monthly price. There's always something new to discover, and new TV shows and movies are added every week!
                            </p>
                        </div>

                        <input type="checkbox" id="title2"className="lp_faq_input" />
                        <label htmlFor="title2" className="lp_faq_label">How much does Not-flix cost?</label>

                        <div className="lp_faq_content">
                            <p>Watch Notflix on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from ₹ 149 to ₹ 649 a month. No extra costs, no contracts.</p>
                        </div>

                        <input type="checkbox" id="title3"className="lp_faq_input" />
                        <label htmlFor="title3" className="lp_faq_label">Where can I watch?</label>


                        <div className="lp_faq_content">
                            <p>Watch anywhere, anytime. Sign in with your Notflix account to watch instantly on the web at notflix.com from your personal computer or on any internet-connected device that offers the Notflix app, including smart TVs, smartphones, tablets, streaming media players and game consoles.
                                <br/>
                                You can also download your favourite shows with the iOS, Android, or Windows 10 app. Use downloads to watch while you're on the go and without an internet connection. Take Notflix with you anywhere.
                            </p>
                        </div>

                        <input type="checkbox" id="title3"className="lp_faq_input" />
                        <label htmlFor="title3" className="lp_faq_label">How do I cancel?</label>


                        <div className="lp_faq_content">
                            <p>Notflix is flexible. There are no annoying contracts and no commitments. You can easily cancel your account online in two clicks. There are no cancellation fees – start or stop your account anytime.</p>
                        </div>

                        <input type="checkbox" id="title3"className="lp_faq_input" />
                        <label htmlFor="title3" className="lp_faq_label">What can I watch on Netflix?</label>


                        <div className="lp_faq_content">
                            <p>Notflix has an extensive library of feature films, documentaries, TV shows, anime, award-winning Notflix originals, and more. Watch as much as you want, anytime you want.</p>
                        </div>


                    </div>
                </div>
                
            </section>
            {/* section divider */}
            <div className="lp_section_divider">
            </div>
            <Footer/>
        </>
    )
}

export default Landingpage;