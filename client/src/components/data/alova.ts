import { createAlova } from 'alova';
import adapterFetch from 'alova/fetch';
import reactHook from 'alova/react';

export const alovaInstance = createAlova({
  baseURL: 'https://datingwebserver.onrender.com',
  statesHook: reactHook,
  requestAdapter: adapterFetch(),
  responded: response => response.json()
});
