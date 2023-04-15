import { Link } from "react-router-dom"

const DashHeader = () => {
    return (
        <div className="container-fluid text-center border-bottom border-3 p-2 mb-3">
            <Link to={'/dash'} className="text-decoration-none text-dark">
                <h2 className="display-6" >DashBoard</h2>
            </Link>
        </div>
    )
}

export default DashHeader