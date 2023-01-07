import {useSelector} from "react-redux";

const HasAccess = ({allowed, roles, children}) => {
    const user = useSelector(state => state.users?.user);
    return allowed || roles?.includes(user?.role) ? children : null;
};

export default HasAccess;