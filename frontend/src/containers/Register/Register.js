import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {registerUser, loginUser} from "../../store/actions/usersActions";
import {useNavigate} from "react-router-dom";
import Loader from "../../components/UI/Loader/Loader";
import {Avatar, Container, Typography, Alert} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import styled from "@emotion/styled";
import UserForm from "../../components/UserForm/UserForm";

const StyledContainer = styled(Container)`
  padding-top: 30px;
  padding-bottom: 30px;
  box-shadow: 0 18px 30px 0 rgba(0, 0, 0, 0.6);
  border-radius: 6px;
`;
const StyledTitle = styled(Typography)`
  text-align: center;
  font-size: 30px;
  margin-bottom: 30px;
`;

const Register = () => {
    const [state, setState] = useState({
        username: "",
        password: ""
    });

    const dispatch = useDispatch();
    const {registerError, loading} = useSelector(state => state.users);
    const navigate = useNavigate();

    const inputChangeHandler = (e) => {
        const {name, value} = e.target;
        setState((prevState) => {
            return {
                ...prevState,
                [name]: value
            }
        });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        await dispatch(registerUser(state, navigate));
        await dispatch(loginUser(state, navigate));
    };

    const getFieldError = (fieldName) => {
        return registerError?.errors?.[fieldName]?.message;
    };
   
  
    return <>
        <StyledContainer component={"section"} maxWidth={"xs"}>
        {!!registerError && <Alert color="error">{registerError}</Alert>}
            <Avatar sx={{m: "0 auto 30px"}}>
                <LockIcon />
            </Avatar>
            <StyledTitle variant={"h1"}>
                Sign Up
            </StyledTitle>
            <UserForm
                onSubmit={submitHandler}
                state={state}
                onChange={inputChangeHandler}
                buttonText={"Sign Up"}
                getFieldError={getFieldError}
            />
        </StyledContainer>
        <Loader loading={loading} />
    </>
};

export default Register;
