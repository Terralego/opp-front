import React from 'react';
import connect from 'react-ctx-connect';

export const context = React.createContext({});
export const connectViewpointProvider = connect(context);
