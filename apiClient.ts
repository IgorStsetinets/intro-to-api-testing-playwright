import { APIRequestContext, APIResponse, } from '@playwright/test'
import { OrderDto } from './tests/dto/order-dto';
import { LoginDto } from './tests/dto/login-dto';

const BaseUrl = 'https://backend.tallinn-learning.ee'
const LoginEndPoint = '/login/student'
const OrdersEndPoint =  '/orders'

export class ApiClient {
  private token: string | null = null;

  constructor(private request: APIRequestContext) {}

  async login(): Promise<string> {
    const loginData = LoginDto.createLoginWithCorrectData();
    const response = await this.request.post(`${BaseUrl}${LoginEndPoint}`, {
      data: loginData,
    });
    const token = (await response.text()).trim();
    this.token = token;
    return token;
  }

  async createOrder(orderData: OrderDto): Promise<APIResponse> {
    if (!this.token) throw new Error('Please log in first');
    const response = await this.request.post(`${BaseUrl}${OrdersEndPoint}`, {
      headers: { Authorization: `Bearer ${this.token}` },
      data: orderData,
    });
    return response;
  }

  async getOrder(orderId: number): Promise<APIResponse> {
    if (!this.token) throw new Error('Please log in first');
    return await this.request.get(`${BaseUrl}${OrdersEndPoint}/${orderId}`, {
      headers: { Authorization: `Bearer ${this.token}` },
    });
  }

  async deleteOrder(orderId: number): Promise<APIResponse> {
    if (!this.token) throw new Error('Please log in first');
    return await this.request.delete(`${BaseUrl}${OrdersEndPoint}/${orderId}`, {
      headers: { Authorization: `Bearer ${this.token}` },
    });
  }
}
