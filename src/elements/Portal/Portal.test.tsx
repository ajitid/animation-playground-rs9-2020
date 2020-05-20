import React from 'react';
import { render } from '@testing-library/react';

import Portal from './Portal';

describe('Portal', () => {
  beforeEach(() => {
    const portalContainer = document.createElement('div');
    portalContainer.id = 'portal';
    document.body.appendChild(portalContainer);
  });

  afterEach(() => {
    const portalContainer = document.querySelector('#portal');
    portalContainer?.remove();
  });

  test('shows content inside itself', () => {
    render(
      <div>
        <Portal elementId="portal">
          <div>portal content</div>
        </Portal>
      </div>
    );

    expect(document.body).toHaveTextContent('portal content');
  });

  test('removes its content when it is unmounted', () => {
    let { rerender } = render(
      <div>
        <Portal elementId="portal">
          <div>portal content</div>
        </Portal>
      </div>
    );

    rerender(<div />);

    expect(document.body).not.toHaveTextContent('portal content');
  });

  test('throws error if portal container cannot be found', () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});

    const portalContainer = document.querySelector('#portal');
    portalContainer?.remove();

    try {
      render(
        <div>
          <Portal elementId="portal">
            <div>portal content</div>
          </Portal>
        </div>
      );
      // expect().toThrow() doesn't works as such,
      // Needed to suppress console.error to hide error boundary msg
      // TODO implement and use error boundary instead
    } catch (e) {
      expect(e.message).toBe('Element with id `portal` does not exists in DOM.');
    }

    // @ts-ignore
    console.error.mockRestore();
  });
});
