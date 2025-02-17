import { Link } from "react-router-dom";

export default function NotFoundPage(params) {
    return(
        <div>
            <div>404 Not Found</div>
            <Link to="/">Home Link</Link>
        </div>
    );
};
