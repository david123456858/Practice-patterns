import type { User } from "@/types/classes/user";

export interface ApiResponse {
  message: User[];
}

const API_BASE_URL = "https://lq3p60dt-3000.use2.devtunnels.ms/"

// Función para crear un nuevo usuario
export const createUser = async (userData: {
  cc: string;
  name: string;
  email: string;
  suscriptionId: string;
}): Promise<User> => {
  try {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('Failed to create user');
  }
};

// Mapeo de tipos de suscripción a IDs
export const subscriptionMapping = {
  "ANNUAL": "1",
  "MONTH": "2", 
  "SEMIANNUAL": "3"
};

// Mapeo inverso para mostrar en la UI
export const subscriptionOptions = [
  { id: "1", label: "ANNUAL", displayName: "Annual Subscription" },
  { id: "2", label: "MONTH", displayName: "Monthly Subscription" },
  { id: "3", label: "SEMIANNUAL", displayName: "Semi-Annual Subscription" }
];

// Función para obtener todos los usuarios
export const getUsers = async (): Promise<User[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}api/v1/user`);
    
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    
    const data: ApiResponse = await response.json();
    return data.message || []; // Aseguramos que siempre retorne un array
  } catch (error) {
    console.error('Error fetching users:', error);
    throw new Error('Failed to fetch users');
  }
};