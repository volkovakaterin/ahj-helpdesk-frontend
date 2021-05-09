export const helpDeskAppTemplate = {
  type: 'div',
  attr: {
    class: ['container'],
  },
  content: [
    {
      type: 'div',
      attr: {
        class: ['ticket__header'],
      },
      content: {
        type: 'h1',
        attr: {
          class: ['ticket__title'],
        },
        content: 'Help Desk',
      },
    },
    {
      type: 'div',
      attr: {
        class: ['ticket__add'],
      },
      content: 'Add ticket',
    },
    {
      type: 'div',
      attr: {
        class: ['ticket__container'],
      },
      content: '',
    },
  ],
};

export const emptyContainer = {
  type: 'div',
  attr: {
    class: ['ticket__empty'],
  },
  content: 'There are no tickets at the moment.',
};
