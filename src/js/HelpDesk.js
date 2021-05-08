import Ticket from './Ticket';
import templateEngine from './TemplateEngine';
import { helpDeskAppTemplate, emptyContainer } from './template';
import TicketAPI from './api/TicketAPI';
import Modal from './Modal';

export default class HelpDesk {
  constructor(container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error('This is not HTML element!');
    }
    this.container = container;
    this.api = new TicketAPI();
  }

  init() {
    this.bindToDOM();
    this.registerEvents();
    // ====MODAL====
    this.modal = new Modal(this.container, this.api);
    this.modal.bindToDOM();
    this.modal.subscribe(this.obSubmit.bind(this));
    // ===RENDER TICKET===
    this.api.list(this.renderTickets.bind(this));
  }

  bindToDOM() {
    this.container.appendChild(templateEngine.generate(helpDeskAppTemplate));
  }

  registerEvents() {
    const addButtonElement = this.container.querySelector('.ticket__add');
    addButtonElement.addEventListener('click', () => this.modal.showModal('create'));
  }

  get ticketContainer() {
    return this.container.querySelector('.ticket__container');
  }

  renderTickets(data = []) {
    if (data.length === 0) {
      this.ticketContainer.appendChild(templateEngine.generate(emptyContainer));
      return;
    }
    data.forEach((ticket) => {
      const newTicket = new Ticket(ticket);
      newTicket.subscribe('edit', this.editTicket.bind(this));
      newTicket.subscribe('delete', this.deleteTicket.bind(this));

      this.ticketContainer.appendChild(newTicket.render());
    });
  }

  async obSubmit(data) {
    const { id } = this.currentEditObject;
    await this.api.update(id, data, (response) => {
      this.ticketContainer.textContent = '';
      this.renderTickets(response);
    });
  }

  async editTicket(id) {
    this.currentEditObject = await this.api.get(id);
    this.modal.showModal('edit', this.currentEditObject);
  }

  deleteTicket(id) {
    console.log(id);
  }
}
