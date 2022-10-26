import Authentication from "../authentication/Authentication";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Room from "../room/Room";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Authentication/>}/>
                <Route path="/room/:roomId" element={<Room/>}/>&
            </Routes>
        </Router>
    );
}

export default App;