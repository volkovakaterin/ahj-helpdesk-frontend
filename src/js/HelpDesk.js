import Ticket from './Ticket';
import templateEngine from './TemplateEngine';
import { helpDeskAppTemplate, emptyContainer } from './template';
import TicketAPI from './api/TicketAPI';
import ModalWithForm from './ModalWithForm';
import ModalDelete from './ModalDelete';

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

    this.modalWithForm = new ModalWithForm(this.container);
    this.modalWithForm.bindToDOM();
    this.modalWithForm.subscribe(this.obSubmit.bind(this));

    this.modalDelete = new ModalDelete(this.container);
    this.modalDelete.bindToDOM();
    this.modalDelete.subscribe(this.deleteTicket.bind(this));

    this.api.list(this.renderTickets.bind(this));
  }

  bindToDOM() {
    this.container.appendChild(templateEngine.generate(helpDeskAppTemplate));
  }

  registerEvents() {
    const addButtonElement = this.container.querySelector('.ticket__add');
    addButtonElement.addEventListener('click', () => this.modalWithForm.showModal('create'));
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
      newTicket.subscribe('delete', this.showModalDelete.bind(this));
      newTicket.subscribe('changeStatus', this.changeStatus.bind(this));

      this.ticketContainer.appendChild(newTicket.render());
    });
  }

  async obSubmit(data, type) {
    if (type === 'create') {
      await this.api.create(data, (response) => {
        this.renderTickets(response);
      });
      return;
    }
    if (type === 'edit') {
      const { id } = this.currentEditObject;
      await this.api.update(id, data, (response) => {
        this.ticketContainer.textContent = '';
        this.renderTickets(response);
      });
      this.currentEditObject = null;
    }
  }

  async editTicket(id) {
    this.currentEditObject = await this.api.get(id);
    this.modalWithForm.showModal('edit', this.currentEditObject);
  }

  async changeStatus(id) {
    this.currentEditObject = await this.api.get(id);
    this.currentEditObject.status = !this.currentEditObject.status;
    await this.api.update(id, this.currentEditObject, (response) => {
      this.ticketContainer.textContent = '';
      this.renderTickets(response);
    });
    this.currentEditObject = null;
  }

  async deleteTicket() {
    await this.api.delete(this.currentEditObject.id, (response) => {
      this.ticketContainer.textContent = '';
      this.renderTickets(response);
    });
    this.currentEditObject = null;
  }

  async showModalDelete(id) {
    this.currentEditObject = await this.api.get(id);
    this.modalDelete.showModal();
  }
}
