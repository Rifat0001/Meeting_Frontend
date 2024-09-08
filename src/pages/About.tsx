import { selectCurrentUser } from "../redux/features/auth/authSlice";

const About = () => {
    const user = selectCurrentUser;
    console.log(user)
    return (
        <div>
            <h1>About page</h1>
        </div>
    );
};

export default About;