export interface RegisterRequest {
  nombre: string;
  email: string;
  password: string;
  role: string; // "user" fijo desde el front
}

export interface RegisterResponse {
  id: number;
  nombre: string;
  email: string;
  role: string;
  createdAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
}
