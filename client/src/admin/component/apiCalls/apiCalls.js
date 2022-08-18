import axios from 'axios';

// =======ELECTION======
// load dashboard
export const  apiCalls = async ()=> {
        const response = await axios.get('http://localhost:3001/admin/admin-dashboard')
        return response.data;
}
// election result
export const getResult = async (id)=>{
  const response =  await axios.get(`http://localhost:3001/admin/election-result/${id}`)
  return response.data;
}
//create election
export const createElection = async(data)=>{
  const response = await axios.post('http://localhost:3001/admin/createElection',data)
  return response.data;
}
// start and stop election
export const  Start = async (id,election_status = 2)=> {
        const response = await axios.put(`http://localhost:3001/admin/start-election/${election_status}/${id}`)
        return response.data;
}

//==========CANDIDATES============
//get candidates
export const getCandidate = async (electionId)=>{
  const response = await axios.get(`http://localhost:3001/admin/getCandidate/${electionId}`)
  return response.data;
}

// add candidate
export const addCandidate = async (candidate_name, position, title, email, number,electionid)=>{
  const response = await axios.post(`http://localhost:3001/admin/createContestant`,{
    candidate_name,
     position,
      title,
       email,
        number,
        electionid

  })
  return response.data; 
}

//rem candidate
export const remCandidate = async (id)=>{
  const response = await axios.delete(`http://localhost:3001/admin/delContestant/${id}`)
  return response; 
}

// update candidate
export const updateCandidate = async (candidate_name, position, title, email, number,electionid, id)=>{
  console.log('e',electionid)
  const response = await axios.patch(`http://localhost:3001/admin/updateCandidate/${id}`,{
    candidate_name,
     position,
      title,
       email,
        number,
        electionid,
        id

  })
  return response.data; 
}

// =========VOTERS============
// get voters
export const getVoters = async (electionId)=>{
  const response = await axios.get(`http://localhost:3001/admin/getVoters/${electionId}`)
  return response.data;

}
//remove voter
export const remVoter = async (id)=>{
  const response = await axios.delete(`http://localhost:3001/admin/delVoter/${id}`)
  return response.data
}

//add voter
export const addVoter = async (voterid,email,number,electionid)=>{
  const response = await axios.post(`http://localhost:3001/admin/addVoter`,
  {
    voterid,
    email,
    number,
    electionid


  })
  return response
}

//patch voter
export const editVoter = async (voterid,email,number,id)=>{
  const response = await axios.patch(`http://localhost:3001/admin/editVoter/${id}`,
  {
    voterid,
    email,
    number,
    id

  })
  return response.data
}

// page not found
export const  pageNotFound = async ()=> {
        const response = await axios.get('http://localhost:3001/admin/*')
        return response.data;
}