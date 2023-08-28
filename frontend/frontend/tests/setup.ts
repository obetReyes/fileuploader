import { expect, afterEach, vi } from 'vitest';
import { setupServer } from 'msw/node';
import { handlers } from './mocks/handlers';
import { cleanup  } from '@testing-library/react';
import matchers from '@testing-library/jest-dom/matchers';


// extends Vitest's expect method with methods from react-testing-library
expect.extend(matchers);


 Object.defineProperty(window.URL, 'createObjectURL', {
  value: vi.fn(),
});


Object.defineProperty(window.URL, 'revokeObjectURL', {
  value: vi.fn(),
});

afterEach(() => {
  cleanup();
});


export const server = setupServer(...handlers);
