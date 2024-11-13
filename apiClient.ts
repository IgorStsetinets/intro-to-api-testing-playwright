import { APIRequestContext, APIResponse, } from '@playwright/test'
import { OrderDto } from './tests/dto/order-dto';
import { LoginDto } from './tests/dto/login-dto';

export class ApiClient {
  private token: string | null = null;

  constructor(private request: APIRequestContext) {}

  async login(): Promise<string> {
    const loginData = LoginDto.createLoginWithCorrectData();
    const response = await this.request.post('https://backend.tallinn-learning.ee/login/student', {
      data: loginData,
    });
    const token = (await response.text()).trim();
    this.token = token;
    return token;
  }

  async createOrder(orderData: OrderDto): Promise<APIResponse> {
    if (!this.token) throw new Error('Please log in first');
    const response = await this.request.post('https://backend.tallinn-learning.ee/orders', {
      headers: { Authorization: `Bearer ${this.token}` },
      data: orderData,
    });
    return response;
  }

  async getOrder(orderId: number): Promise<APIResponse> {
    if (!this.token) throw new Error('Please log in first');
    return await this.request.get(`https://backend.tallinn-learning.ee/orders/${orderId}`, {
      headers: { Authorization: `Bearer ${this.token}` },
    });
  }

  async deleteOrder(orderId: number): Promise<APIResponse> {
    if (!this.token) throw new Error('Please log in first');
    return await this.request.delete(`https://backend.tallinn-learning.ee/orders/${orderId}`, {
      headers: { Authorization: `Bearer ${this.token}` },
    });
  }
}
