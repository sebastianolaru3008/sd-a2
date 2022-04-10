import { UserDto } from "../models/dto/UserDto";
import { User } from "../models/entities/User";
import { axiosPostRequest } from "./api/axios";

export const loginRequest = (email: string, password: string) => 
  axiosPostRequest<UserDto, User>(`/user/login`,"", { email, password });
  
export const signupRequest = (email: string, password: string) => 
  axiosPostRequest<UserDto, User>(`/customer`,"", { email, password });