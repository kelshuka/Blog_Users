import { Link } from "react-router-dom";
import background from './images/bg.jpg'

export default function HomePage(){
    return (
        <div className='homePage' style={
            {
                backgroundImage: `url(${background})`,
                height: "100vh",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
            }
        }>

            <section className='homeDesc'>
               <p className='homeTitle'>The World Reality Blog </p>
               <p> Welcome to World Reality Blog! Blog on some life lessons!!! </p>
               <p> Want to sign up? </p>
               <p> <button> <Link to="/signup"> Sign up </Link> </button> </p>
               <p><span>Already a user!</span>
               <button> <Link to="/login"> Log in </Link> </button> </p>
            </section>
            
        </div>
    )
}