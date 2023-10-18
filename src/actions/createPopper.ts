import {createPopper} from "@popperjs/core";

const openPopovers: Set<HTMLElement> = new Set<HTMLElement>();

export const sveltePopper = (node: HTMLElement, {comp, props}) => {

  node.addEventListener('click', (e) => {
    if (openPopovers.has(node)) {
      return;
    }
    e.stopPropagation();

    openPopovers.add(node);

    const container = document.createElement('div');
    container.classList.add('popper');
    document.body.appendChild(container);
    const currentPopover = createPopper(node, container, {
      placement: 'bottom-end',
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [0, 10],
          },
        },
      ],
    });
    new comp({target: container, props});

    const destroyPopup = () => {
      currentPopover.destroy();
      openPopovers.delete(node);
      container.remove();
      document.removeEventListener('mousedown', handleClick);
    };
    const handleClick = (e: MouseEvent) => {
      if (container.contains(e.target as Node)) {
        return;
      }
      e.stopPropagation();
      destroyPopup();
    };
    document.addEventListener('mousedown', handleClick);
  });


};
