import axios from 'axios';

export default class Api {
  private api: any;

  constructor() {
    this.api = axios.create({
      timeout: 1000,
      headers: {
        Accept: 'application/json',
      },
    });
  }

  public async getCurrency(): Promise<any> {
    return await this.api.get('http://api.nbp.pl/api/exchangerates/tables/a');
  }
}
