import type { GlobalProvider } from '@ladle/react';
import React from 'react';

import '@stream-io/stream-chat-css/dist/v2/css/index.css';
import './styles.css';
export const Provider: GlobalProvider = ({ children }) => <>{children}</>;
