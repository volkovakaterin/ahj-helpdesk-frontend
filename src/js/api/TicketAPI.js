import Entity from './Entity';
import createRequest from './createRequest';

export default class TicketAPI extends Entity {
  async list(callback) {
    const options = {
      method: 'GET',
      type: 'allTickets',
      callback,
    };
    return createRequest(options);
  }

  async get(id, callback) {
    const options = {
      method: 'GET',
      type: 'ticketById',
      id: `&id=${id}`,
      callback,
    };
    return createRequest(options);
  }

  async create(data, callback) {
    const options = {
      method: 'POST',
      type: 'createTicket',
      data,
      callback,
    };
    return createRequest(options);
  }

  async update(id, data, callback) {
    const options = {
      method: 'POST',
      type: 'updateById',
      id: `&id=${id}`,
      data,
      callback,
    };
    return createRequest(options);
  }

  async delete(id, callback) {
    const options = {
      method: 'GET',
      type: 'deleteById',
      id: `&id=${id}`,
      callback,
    };
    return createRequest(options);
  }
}
