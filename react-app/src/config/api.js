// API Configuration
const API_CONFIG = {
  BASE_URL: 'http://localhost:8080',
  ENDPOINTS: {
  
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    LOGOUT: '/api/auth/logout',
    
  
    PROFILE: '/api/user/profile',
    HISTORY: '/api/users/history',
    SEND: '/user/send',
  },
  
  
  TIMEOUT: 10000, // 10 seconds
  HEADERS: {
    'Content-Type': 'application/json',
  }
};


export const getApiUrl = (endpoint) => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};


export const apiRequest = async (endpoint, options = {}) => {
  const url = getApiUrl(endpoint);
  
  const defaultOptions = {
    headers: API_CONFIG.HEADERS,
    credentials: 'include',
    ...options,
  };

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);

    const response = await fetch(url, {
      ...defaultOptions,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    const contentType = response.headers.get('content-type');
    let data;
    
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    if (!response.ok) {
      throw {
        status: response.status,
        message: data.message || data || 'Request failed',
        data: data,
      };
    }

    return { ok: true, data, status: response.status };
  } catch (error) {

    if (error.name === 'AbortError') {
      throw {
        status: 408,
        message: 'Request timeout. Please check your connection.',
      };
    }

    if (error instanceof TypeError) {
      throw {
        status: 0,
        message: 'Network error. Cannot reach the server. Make sure your backend is running.',
      };
    }

    throw error;
  }
};

export default API_CONFIG;
