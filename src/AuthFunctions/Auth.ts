import axios from 'axios';

interface LoginResponse {
  success: boolean;
  error: boolean;
  data: {
    message: string;
    storeAuth: {
      _id: string;
      email: string;
      __v: number;
    };
  };
  errorMessage: string | null;
}

const API_URL = 'http://localhost:8100/api/v1/stores/auth/logIn';

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  const response = await axios.post<LoginResponse>(
    API_URL,
    { email, password },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data;
};
