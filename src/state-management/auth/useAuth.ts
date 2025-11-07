import { useContext } from "react";
import AuthContext from "./authContexts";

const useAuth = () => useContext(AuthContext);

export default useAuth;
