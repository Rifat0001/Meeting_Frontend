import { selectCurrentUser, useCurrentToken } from "../redux/features/auth/authSlice";
import { useAppSelector } from "../redux/hooks";
import { verifyToken } from "../utils/verifyToken";

const About = () => {
    const token = useAppSelector(selectCurrentUser);
    console.log(token)
    return (
        <div>
            <h1>About page</h1>
        </div>
    );
};

export default About;