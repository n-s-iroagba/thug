import axios from 'axios';

const API_URL = '/api';  // Change to the appropriate base URL

// Utility to create a single membership
export const createMembership = async (membershipData: {
  tier: string;
  features: string[];
  price: number;
}) => {
  try {
    const response = await axios.post(`${API_URL}/memberships`, membershipData);
    return response.data;
  } catch (error) {
    throw new Error(`Error creating membership: ${error instanceof Error ? error.message : String(error)}`);
  }
};

// Utility to create multiple memberships
export const createBulkMemberships = async (membershipsData: {
  tier: string;
  features: string[];
  price: number;
}[]) => {
  try {
    const response = await axios.post(`${API_URL}/memberships/bulk`, membershipsData);
    return response.data;
  } catch (error) {
    throw new Error(`Error creating bulk memberships: ${error instanceof Error ? error.message : String(error)}`);
  }
};

// Utility to get all memberships (with optional filter)
export const getAllMemberships = async (filter: Partial<any> = {}) => {
  try {
    const response = await axios.get(`${API_URL}/memberships`, { params: filter });
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching memberships: ${error instanceof Error ? error.message : String(error)}`);
  }
};

// Utility to update a membership
export const updateMembership = async (id: number, updates: Partial<any>) => {
  try {
    const response = await axios.put(`${API_URL}/memberships/${id}`, updates);
    return response.data;
  } catch (error) {
    throw new Error(`Error updating membership: ${error instanceof Error ? error.message : String(error)}`);
  }
};

// Utility to delete a membership
export const deleteMembership = async (id: number) => {
  try {
    const response = await axios.delete(`${API_URL}/memberships/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`Error deleting membership: ${error instanceof Error ? error.message : String(error)}`);
  }
};
