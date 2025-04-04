import axios from "axios";

const API_BASE = "/api/celebrities"; // adjust if hosted elsewhere

export type ClubMembership = {
  id: number;
  tier: string;
  features: string[];
  price: number;
  celebrityId: number;
};

export type Celebrity = {
  id: number;
  stageName: string;
  firstName: string;
  surname: string;
  bio: string;
  image: string;
  memberships: ClubMembership[];
  isConfirmed: boolean;
};

export type CreateCelebrityPayload = {
  stageName: string;
  firstName: string;
  surname: string;
  bio: string;
  image?: File | null;
};

export const celebrityApi = {
  async getAll(): Promise<Celebrity[]> {
    const res = await axios.get(API_BASE);
    return res.data;
  },

  async getById(id: number): Promise<Celebrity> {
    const res = await axios.get(`${API_BASE}/${id}`);
    return res.data;
  },

  async create(data: CreateCelebrityPayload): Promise<Celebrity> {
    const formData = new FormData();
    formData.append("stageName", data.stageName);
    formData.append("firstName", data.firstName);
    formData.append("surname", data.surname);
    formData.append("bio", data.bio);
    if (data.image) {
      formData.append("image", data.image);
    }

    const res = await axios.post(API_BASE, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  },

  async update(id: number, data: Partial<CreateCelebrityPayload>): Promise<Celebrity> {
    const formData = new FormData();
    if (data.stageName) formData.append("stageName", data.stageName);
    if (data.firstName) formData.append("firstName", data.firstName);
    if (data.surname) formData.append("surname", data.surname);
    if (data.bio) formData.append("bio", data.bio);
    if (data.image) formData.append("image", data.image);

    const res = await axios.put(`${API_BASE}/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  },

  async delete(id: number): Promise<void> {
    await axios.delete(`${API_BASE}/${id}`);
  },
};
