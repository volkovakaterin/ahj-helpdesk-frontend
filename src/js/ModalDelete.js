import templateEngine from './TemplateEngine';
import eventBus from './EventBus';

export default class ModalDelete {
  constructor(container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error('Передайте HTML элемент');
    }
    this.container = container;
  }

  render() {
    return templateEngine.generate({
      type: 'div',
      attr: {
        class: ['modal__delete'],
      },
      content: [
        {
          type: 'div',
          attr: {
            class: ['modal__background'],
          },
          content: '',
        },
        {
          type: 'div',
          attr: {
            class: ['modal__content'],
          },
          content: [
            {
              type: 'div',
              attr: {
                class: ['modal__header'],
              },
              content: '',
            },
            {
              type: 'div',
              attr: {
                class: ['modal__body'],
              },
              content: 'Are you sure you want to delete this ticket? This action is irreversible.',
            },
            {
              type: 'div',
              attr: {
                class: ['modal__footer'],
              },
              content: [
                {
                  type: 'div',
                  attr: {
                    class: ['modal__close'],
                  },
                  listener: {
                    type: 'click',
                    cb: (event) => this.close(event),
                  },
                  content: 'Close',
                },
                {
                  type: 'div',
                  attr: {
                    class: ['modal__ok'],
                  },
                  listener: {
                    type: 'click',
                    cb: () => this.submit(),
                  },
                  content: 'Ok',
                },
              ],
            },
          ],
        },
      ],
    });
  }

  bindToDOM() {
    this.container.appendChild(this.render());
  }

  submit() {
    eventBus.emit('deleteTicket');
    this.modalElement.classList.remove('active');
  }

  close() {
    this.modalElement.classList.remove('active');
  }

  showModal() {
    const modalTitle = this.modalElement.querySelector('.modal__header');
    modalTitle.textContent = 'Warning!';
    this.modalElement.classList.add('active');
  }

  get modalElement() {
    return this.container.querySelector('.modal__delete');
  }
}
