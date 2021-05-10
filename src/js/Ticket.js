import templateEngine from './TemplateEngine';
import eventBus from './EventBus';

export default class Ticket {
  constructor({ id, name, description, status, created }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.status = status;
    this.created = created;
  }

  render() {
    const sourceDate = new Date(this.created);
    const date = `${sourceDate.toLocaleDateString()} ${sourceDate
      .toLocaleTimeString()
      .slice(0, 5)}`;
    return templateEngine.generate({
      type: 'div',
      attr: {
        class: ['ticket'],
        'data-id': this.id,
      },
      content: [
        {
          type: 'div',
          attr: {
            class: ['ticket__body'],
          },
          content: [
            {
              type: 'div',
              attr: {
                class: ['ticket__status'],
              },
              listener: {
                type: 'click',
                cb: (event) => this.changeStatus(event),
              },
              content: {
                type: 'span',
                attr: {
                  class: this.status ? ['done'] : [],
                },
                content: '',
              },
            },
            {
              type: 'div',
              attr: {
                class: ['ticket__name'],
              },
              listener: {
                type: 'click',
                cb: this.showDescription,
              },
              content: this.name,
            },
            {
              type: 'div',
              attr: {
                class: ['ticket__created'],
              },
              content: date,
            },
            {
              type: 'div',
              attr: {
                class: ['ticket__edit'],
              },
              listener: {
                type: 'click',
                cb: (event) => this.editTicket(event),
              },
              content: {
                type: 'span',
                attr: {
                  class: ['ticket__edit-img'],
                },
                content: '',
              },
            },
            {
              type: 'div',
              attr: {
                class: ['ticket__delete'],
              },
              listener: {
                type: 'click',
                cb: (event) => this.deleteTicket(event),
              },
              content: {
                type: 'span',
                attr: {
                  class: ['ticket__delete-img'],
                },
                content: '',
              },
            },
          ],
        },
        {
          type: 'div',
          attr: {
            class: ['ticket__description', 'hidden'],
          },
          content: this.description,
        },
      ],
    });
  }

  showDescription(event) {
    const parentElement = event.target.closest('.ticket');
    const descElement = parentElement.querySelector('.ticket__description');
    descElement.classList.toggle('hidden');
  }

  changeStatus(event) {
    const parentElement = event.target.closest('.ticket');
    const { id } = parentElement.dataset;
    eventBus.emit('changeStatus', id);
  }

  editTicket(event) {
    const parentElement = event.target.closest('.ticket');
    const { id } = parentElement.dataset;
    eventBus.emit('edit', id);
  }

  deleteTicket(event) {
    const parentElement = event.target.closest('.ticket');
    const { id } = parentElement.dataset;
    eventBus.emit('delete', id);
  }
}
