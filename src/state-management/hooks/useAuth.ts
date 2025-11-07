import { useContext } from "react";
import AuthContext from "../contexts/authContexts";

const useAuth = () => useContext(AuthContext);

export default useAuth;
