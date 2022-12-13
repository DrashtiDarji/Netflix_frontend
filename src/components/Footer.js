function Footer(){
    return (
        <>
            {/* <!-- FOoter  --> */}
         <footer>
            <div className="footer_wrapper">
                <div className="socials">
                    <i className="fa-brands fa-facebook-f"></i>
                    <i className="fa-brands fa-instagram"></i>
                    <i className="fa-brands fa-twitter"></i>
                    <i className="fa-brands fa-youtube"></i>
                </div>  
        
                <ul className="footer_links">
                <li>Audio and Subtitles</li>
                <li>Media Center</li>
                <li>Privacy</li>
                <li>Contact Us</li>
                <li>Audio Description</li>
                <li>Investor Relation</li>
                <li>Legal Notices</li>
                <li>Help Center</li>
                <li>Jobs</li>
                <li>Cookies Preferences</li>
                <li>Gift Cards</li>
                <li>Terms of Use</li>
                <li>Corporate Information</li>
                </ul>

                <div className="footer_button">
                    <button className="footer_btn">Service Code</button>
                </div>
                <i className="copy_right">&#169; 1997-2022 Notflix, Inc.</i>
            </div>
         </footer>
        </>
         
    )
}

export default Footer;