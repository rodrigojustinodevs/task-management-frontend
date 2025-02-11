import axios from 'axios';

export async function login(email: string, password: string) {
  try {
    const response = await axios.post('http://localhost:8004/api/login', {
      email,
      password,
    });

    localStorage.setItem('token', response.data.token); // Salva o token
    return response.data;
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    throw error;
  }
}