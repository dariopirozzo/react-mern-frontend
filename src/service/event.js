import axios from 'axios';

const baseURL = import.meta.env.VITE_ENVIRONMENT_URL;
const token = localStorage.getItem('token')

export const CreateNote = async (title, notes, start, end) => {
    try {
      const response = await axios.post(`${baseURL}/events`,{
        title,
        notes,
        start,
        end,
      },
      {
        headers: {
          "x-token": token,
        },
      }
);
      return response.data;
    } catch (error) {
      console.error("Error creando nota:", error);
      throw error;
    }
  };

export const GetNotes = async ()=>{
    const data = await axios.get(`${baseURL}/events`,{
        headers: {
          "x-token": token, 
        },
      }
)
    return data.data
}

export const updateNote = async (title, notes, start, end,id) => {
    try {
      const response = await axios.put(`${baseURL}/events/${id}`,{
        title,
        notes,
        start,
        end,
      },
      {
        headers: {
          "x-token": token,
        },
      }
);
      return response.data;
    } catch (error) {
      console.error("Error creando nota:", error);
      throw error;
    }
  };


  export const deleteNote = async (id) => {
    console.log(id)
    try {
      await axios.delete(`${baseURL}/events/${id}`,
      {
        headers: {
          "x-token": token,
        },
      }
);
    } catch (error) {
      console.error("Error creando nota:", error);
      throw error;
    }
  };