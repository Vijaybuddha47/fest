import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import configData from "../config/Config";

const url = configData.API_URL + '/login';
const resetPassUrl = configData.API_URL + '/update-password';
const updateProfileUrl = configData.API_URL + "/update-user";
const updatePictureUrl = configData.API_URL + "/update-profile";

const config = {
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
};

interface initial { loading: boolean; user: any; error: string; message: string; isLoggedIn: boolean, stream: any }

const initialState: initial = {
    loading: false,
    user: [],
    error: "",
    message: "",
    isLoggedIn: false,
    stream: [],
}

export const loginUser = createAsyncThunk(
    url,
    async (userCredentials: Object, { rejectWithValue }) => {
        try {
            const request: any = await axios.post(url, userCredentials, config);
            // console.log(request);
            // const response: any = request.data.user;
            return request.data.user;
        } catch (_err: any) {
            // console.log(_err);
            // if (!_err.response) {
            //     throw _err
            // }
            // if (error.code == "ERR_NETWORK") return rejectWithValue({ data: error.message });
            // else return rejectWithValue({ data: error.response.data.message });
            return rejectWithValue(_err.response.data)
        }
    }
)

export const resetPassword = createAsyncThunk(
    resetPassUrl,
    async (parameters: Object, { rejectWithValue }) => {
        try {
            const request: any = await axios.post(resetPassUrl, parameters, config);
            // console.log(request);
            // const response: any = request.data.user;
            return request.data;
        } catch (_err: any) {
            // console.log(_err);
            if (!_err.response) {
                throw _err
            }
            // if (error.code == "ERR_NETWORK") return rejectWithValue({ data: error.message });
            // else return rejectWithValue({ data: error.response.data.message });
            return rejectWithValue(_err.response.data)
        }
    }
)

export const updateUserProfile = createAsyncThunk(
    updateProfileUrl,
    async (newUsername: Object, { rejectWithValue }) => {
        // console.log(newUsername);
        try {
            const request: any = await axios.post(updateProfileUrl, newUsername, config);
            // console.log(request);
            return request.data;
        } catch (_err: any) {
            // console.log(_err);
            if (!_err.response) {
                throw _err
            }
            return rejectWithValue(_err.response.data)
        }
    }
)

export const updateProfilePicture = createAsyncThunk(
    updatePictureUrl,
    async (formData: any, { rejectWithValue }) => {
        try {
            const request: any = await axios.patch(updatePictureUrl, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            },);

            // console.log(request);
            return request.data;

        } catch (_err: any) {
            // console.log(_err);
            if (!_err.response) {
                throw _err
            }
            return rejectWithValue(_err.response.data)
        }
    }
)

// console.log(loginUser);

const UserSlice = createSlice({
    name: 'user',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state, action: any) => {
                // console.log(action, action.payload);
                state.loading = true;
                state.user = [];
                state.error = "";
                state.message = "";
                state.isLoggedIn = false;
            })
            .addCase(loginUser.fulfilled, (state, action: any) => {
                // console.log(action, action.payload);
                state.loading = false;
                state.user = action.payload !== undefined ? action.payload : [];
                state.error = '';
                state.message = action.payload ? "Login successfully." : "Something went wrong. Please contact admin.";
                state.isLoggedIn = action.payload !== undefined ? (action.payload.status == "A" ? true : false) : false;
            })
            .addCase(loginUser.rejected, (state, action: any) => {
                // console.log(action, action.error.message);
                state.loading = false;
                state.user = [];
                state.error = action.payload.status === 0 ? action.payload.message : "Something went wrong. Please contact admin.";
                state.message = "";
                state.isLoggedIn = false;
            });

        //resetPassword
        builder
            .addCase(resetPassword.pending, (state, action: any) => {
                console.log(action, action.payload);
                state.loading = true;
                state.error = "";
                state.message = "";
                // state.isLoggedIn = true;
            })
            .addCase(resetPassword.fulfilled, (state, action: any) => {
                console.log(action, action.payload);
                state.loading = false;
                // state.user = action.payload !== undefined ? action.payload : state.user;
                state.message = action.payload.message; //"Password updated ";
                state.error = "";
                // state.isLoggedIn = true;
            })
            .addCase(resetPassword.rejected, (state, action: any) => {
                console.log(action, action.error.message);
                state.loading = false;
                state.message = "";
                state.error = action.payload.message;//action.meta.requestStatus == "fulfilled" ? action.payload.data : (action.error.message == "Rejected" ? "Network Error" : "error");
                // state.isLoggedIn = true;
            });

        //updateProfile
        builder
            .addCase(updateUserProfile.pending, (state, action: any) => {
                console.log(action, action.payload);
                state.loading = true;
                state.error = "";
                state.message = "";
                // state.isLoggedIn = true;
            })
            .addCase(updateUserProfile.fulfilled, (state, action: any) => {
                console.log(action, action.payload);
                state.loading = false;
                state.user.name = action.payload !== undefined ? action.payload.userddata.name : state.user.name;
                state.message = action.payload.message; //"Password updated ";
                state.error = "";
                // state.isLoggedIn = true;
            })
            .addCase(updateUserProfile.rejected, (state, action: any) => {
                console.log(action, action.error.message);
                state.loading = false;
                state.message = "";
                state.error = action.payload.message;//action.meta.requestStatus == "fulfilled" ? action.payload.data : (action.error.message == "Rejected" ? "Network Error" : "error");
                // state.isLoggedIn = true;
            });


        //updateProfilePicture
        builder
            .addCase(updateProfilePicture.pending, (state, action: any) => {
                console.log(action, action.payload);
                state.loading = true;
                state.error = "";
                state.message = "";
                // state.isLoggedIn = true;
            })
            .addCase(updateProfilePicture.fulfilled, (state, action: any) => {
                console.log(action, action.payload);
                state.loading = false;
                state.user = action.payload !== undefined ? action.payload.data : state.user;
                state.message = action.payload.message; //"Password updated ";
                state.error = "";
                // state.isLoggedIn = true;
            })
            .addCase(updateProfilePicture.rejected, (state, action: any) => {
                console.log(action, action.error.message);
                state.loading = false;
                state.message = "";
                state.error = action.payload.message;//action.meta.requestStatus == "fulfilled" ? action.payload.data : (action.error.message == "Rejected" ? "Network Error" : "error");
                // state.isLoggedIn = true;
            });
    },
    reducers: {
        userLogout(state) {
            // console.log(state);
            state.isLoggedIn = false;
            state.user = []
            state.loading = false;
            state.message = "";
            state.error = "";
        },
        removeMessage(state) {
            // console.log(state);
            // state.isLoggedIn = false;
            // state.user = []
            state.loading = false;
            state.message = "";
            state.error = "";
        }
    }
});



export const { userLogout, removeMessage } = UserSlice.actions;
export default UserSlice.reducer