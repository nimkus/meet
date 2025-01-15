import '@testing-library/jest-dom';
import { configure } from '@testing-library/react';

const MESSAGES_TO_IGNORE = [
  'An update to App inside a test was not wrapped in act(...)',
  'When testing, code that causes React state updates should be wrapped into act(...):',
  'The above error occurred',
];

const originalError = console.error.bind(console.error);

console.error = (...args) => {
  const ignoreMessage = MESSAGES_TO_IGNORE.some((message) => args[0]?.includes(message));
  if (!ignoreMessage) {
    originalError(...args);
  }
};

configure({ asyncUtilTimeout: 3000 });
jest.setTimeout(30000);
