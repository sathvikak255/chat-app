import { useContext } from "react";
import { Container, Nav, Navbar, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Notification from "./chats/Notifications";

const NavBar = () => {

    const { user, logoutUser } = useContext(AuthContext);

    return (<Navbar bg="dark" className="mb-4" style={{ height: "3.75rem" }}>
        <Container>
            <h2>
                <Link className="link-light text-decoration-none" to={"/"}>ChattApp</Link>
            </h2>
            {user && <span className="text-white">Logged in as {user?.name}</span>}
            <Nav>
                <Stack direction="horizontal" gap={4}>
                    {
                        user && <>
                            <Notification />
                            <Link onClick={() => logoutUser()} className="link-light text-decoration-none" to={"/login"}>Logout</Link>
                        </>
                    }
                    {
                        !user && <>
                            <Link className="link-light text-decoration-none" to={"/login"}>Login</Link>
                            <Link className="link-light text-decoration-none" to={"/register"}>Register</Link>
                        </>
                    }
                </Stack>

            </Nav>
        </Container>
    </Navbar>);
}

export default NavBar;