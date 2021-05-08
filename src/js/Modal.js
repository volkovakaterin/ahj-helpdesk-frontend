import templateEngine from './TemplateEngine';

export default class Modal {
  constructor(container, api) {
    if (!(container instanceof HTMLElement)) {
      throw new Error('Передайте HTML элемент');
    }
    this.container = container;
    this.api = api;
    this.submitSubscribes = [];
  }

  render() {
    return templateEngine.generate({
      type: 'div',
      attr: {
        class: ['modal'],
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
              content: {
                type: 'form',
                attr: {
                  class: ['modal__form'],
                  name: 'modal-form',
                },
                content: [
                  {
                    type: 'div',
                    attr: {
                      class: ['form__group'],
                    },
                    content: [
                      {
                        type: 'label',
                        attr: {
                          class: ['form__label'],
                          for: 'short-description',
                        },
                        content: 'Short description',
                      },
                      {
                        type: 'input',
                        attr: {
                          class: ['form__input'],
                          id: 'short-description',
                          name: 'name',
                          placeholder: 'Please enter a short description...',
                        },
                        content: '',
                      },
                    ],
                  },
                  {
                    type: 'div',
                    attr: {
                      class: ['form__group'],
                    },
                    content: [
                      {
                        type: 'label',
                        attr: {
                          class: ['form__label'],
                          for: 'short-description',
                        },
                        content: 'Detailed description',
                      },
                      {
                        type: 'textarea',
                        attr: {
                          class: ['form__textarea'],
                          id: 'detailed-description',
                          name: 'description',
                          placeholder: 'Please enter a detailed description...',
                        },
                        content: '',
                      },
                    ],
                  },
                ],
              },
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

  subscribe(cb) {
    this.submitSubscribes.push(cb);
  }

  submit() {
    const { formElement } = this;
    const data = {
      name: formElement.elements.name.value,
      description: formElement.elements.description.value,
    };
    this.modalElement.querySelector('.modal__header').textContent = '';
    this.clearForm();
    this.close();
    this.submitSubscribes.forEach((cb) => cb.call(null, data));
  }

  close() {
    this.clearForm();
    this.modalElement.classList.remove('active');
  }

  showModal(type, data) {
    const modalTitle = this.modalElement.querySelector('.modal__header');
    if (type === 'create') {
      modalTitle.textContent = 'Register new ticket';
      this.modalElement.classList.add('active');
    }
    if (type === 'edit') {
      const { formElement } = this;
      formElement.elements.name.value = data.name;
      formElement.elements.description.value = data.description || 'No information';
      modalTitle.textContent = 'Edit ticket';
      this.modalElement.classList.add('active');
    }
  }

  get modalElement() {
    return this.container.querySelector('.modal');
  }

  get formElement() {
    return this.modalElement.querySelector('form');
  }

  clearForm() {
    const { formElement } = this;
    formElement.elements.name.value = '';
    formElement.elements.description.value = '';
  }

  //
  // get modalBackGroundElement() {
  //   return this.container.querySelector('.modal-background');
  // }
  //
  // get modalText() {
  //   return this.container.querySelector('.modal-text').textContent;
  // }
  //
  // set modalText(value) {
  //   this.container.querySelector('.modal-text').textContent = value;
  // }
  //
  // removeModal() {
  //   this.modalContainerElement.classList.remove('active');
  // }
}
