import axios from "axios";
import { CreateFan, Fan } from "../../types/Fan";
import { deleteFanUrlId, fanSignupUrl, getAllFansUrl, getOneFanUrlId, updateFanUrlId } from "../../data/urls";
import { User } from "../../types/User";




export const getAllFans = async (): Promise<Fan[]> => {

  const response = await axios.get<Fan[]>(getAllFansUrl);
  return response.data;
};

export const getFanById = async (id: number): Promise<Fan> => {
  const response = await axios.get<Fan>(`${getOneFanUrlId}/${id}`);
  return response.data;
};

export const createFan = async (data:{user:User,fan:CreateFan}): Promise<Fan> => {
  const response = await axios.post(fanSignupUrl, data);
  return response.data;
};

export const updateFan = async (id: number, data: Partial<Fan>, profilePicture?: File): Promise<Fan> => {
  const formData = new FormData();

  // Append all non-file fields
  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, String(value));
    }
  });

  // Append profile picture if present
  if (profilePicture) {
    formData.append("profilePicture", profilePicture);
  }

  const response = await axios.put<Fan>(`${updateFanUrlId}/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const deleteFan = async (id: number): Promise<void> => {
  await axios.delete(`${deleteFanUrlId}/${id}`);
};
