import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
// Initial state for profile
const initialState = {
    profile : [],
    filteredProfile: [],
    selectedProfile : null,
    loading: false,
    error: null,
    searchQuery: "",
    filterBy: "",
}

// 
const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        setProfile:(state, action) => {
            state.profile = action.payload;
            state.filteredProfile = action.payload; 
        },
        setSelectedProfile: (state,action) => {
            state.selectedProfile = action.payload
        },
        setLoading: (state, action) => {
            state.loading = action.payload
        },
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
            state.filteredProfile = applySearchAndFilter(
                state.profile,
                state.searchQuery,
                state.filterBy
              );
        },
        setFilterBy: (state, action) => {
            state.filterBy = action.payload;
            state.filteredProfile = applySearchAndFilter(
                state.profile,
                state.searchQuery,
                state.filterBy
              );
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        addNewProfile: (state,action) => {
            state.profile.push(action.payload)
            state.filteredProfile = applySearchAndFilter(
                state.profile,
                state.searchQuery,
                state.filterBy
              );
        },
        updateExistingProfile: (state, action) => {
            const index= state.profile.findIndex((p) => p.id === action.payload.id)
            if(index !== -1){
                state.profile[index] = action.payload
            }
            state.filteredProfile = applySearchAndFilter(
                state.profile,
                state.searchQuery,
                state.filterBy
              );
        },
        deleteExistingPrfolie: (state, action) => {
            state.profile = state.profile.filter((p) => p.id !== action.payload.id)   
            state.filteredProfile = applySearchAndFilter(
                state.profile,
                state.searchQuery,
                state.filterBy
              );         
        }
    }
})

export const { setProfile, setSelectedProfile, setLoading, setError, addNewProfile, updateExistingProfile, deleteExistingPrfolie, setSearchQuery, setFilterBy} = profileSlice.actions;

export const fetchProfile = () => async (dispatch) => {
    dispatch(setLoading(true));
    try{
        const response = await axios.get("https://dummyjson.com/users");
        dispatch(setProfile(response.data.users))
    }catch(err){
        dispatch(setError(err.message));
    }finally{
        dispatch(setLoading(false))
    }
}

export const addProfile = (profile) => async (dispatch) =>{
    try{
        const response = await axios.post("https://dummyjson.com/users/add", profile);
        dispatch(addNewProfile(response.data))
    }catch(err){
        dispatch(setError(err.message))
    }
}

export const deleteProfile = (id) => async (dispatch) =>{
    try{
        const response = await axios.delete(`https://dummyjson.com/users/${id}`)
        dispatch(deleteExistingPrfolie(response.data))
    }catch(err){
        dispatch(setError(err.message))
    }
}

export const updateProfile = (profile) => async (dispatch) =>{
    try{
        const response = await axios.put(`https://dummyjson.com/users/${profile.id}`,profile)
        dispatch(updateExistingProfile(response.data))
    }catch(err){
        dispatch(setError(err.message))
    }
}

const applySearchAndFilter = (profile, searchQuery, filterBy) =>{
    let filteredProfile = profile;

    if(searchQuery){
        filteredProfile = filteredProfile.filter((profile) => 
            profile.firstName.toLowerCase().includes((searchQuery).toLowerCase()) ||
            profile.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            profile.email.toLowerCase().includes(searchQuery.toLowerCase())
        )
    }

    if(filterBy){
        filteredProfile = filteredProfile.filter((profile) => {
            if(filterBy === "name" ){
                return(
                    profile.firstName.toLowerCase().includes(searchQuery.toLowerCase())||
                    profile.lastName.toLowerCase().includes(searchQuery.toLowerCase())
                )
            }
            if(filterBy === "email"){
                return profile.email.toLowerCase().includes(searchQuery.toLowerCase())
            }
            if(filterBy === "role"){
                return profile.role && profile.role.toLowerCase().includes(searchQuery.toLowerCase());
            }
            return true;
        })
    }
    return filteredProfile;
}

export default profileSlice.reducer;