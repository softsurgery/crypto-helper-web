import axios from "./axios";
import { SignUpDto } from "@/types/Sign-up.dto";
import { SignInDto } from "@/types/Sign-in.dto";

const signUp = async (dto: SignUpDto) => {
  const response = await axios.post("api/auth/sign-up", dto);
  console.log(response);
  if (response.status === 200)
    localStorage.setItem("authToken", response.data.accessToken);
  return response.data;
};

const signIn = async (dto: SignInDto) => {
  const response = await axios.post("api/auth/sign-in", dto);
  if (response.status === 200)
    localStorage.setItem("authToken", response.data.accessToken);
  return response.data;
};

const validateSignUpDto = (dto: SignUpDto) => {
  if (!dto.username) return "Invalid username";
  if (!dto.email) return "Invalid email";
  if (!dto.password) return "Invalid password";
  if (dto.password !== dto.confirmPassword) return "Passwords do not match";
  return null;
};

const validateSignInDto = (dto: SignInDto) => {
  if (!dto.usernameOrEmail) return "Invalid username";
  if (!dto.password) return "Invalid password";
  return null;
};

export const auth = { signUp, signIn, validateSignUpDto, validateSignInDto };
