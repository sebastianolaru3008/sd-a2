import { LoginResponseDto } from '../models/dto/LoginResponseDto';
import { UserDto } from '../models/dto/UserDto';
import { User } from '../models/entities/User';
import { axiosGetRequest, axiosPostRequest } from './api/axios';

export const loginRequest = (email: string, password: string) =>
    axiosGetRequest<LoginResponseDto>(
        `/login`,
        `?email=${email}&password=${password}`,
    );
export const userRequest = () => axiosGetRequest<User>(`/user`, ``);

export const signupRequest = (email: string, password: string) =>
    axiosPostRequest<UserDto, User>(`/customer`, '', { email, password });
