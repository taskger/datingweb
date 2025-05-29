import { createAlova } from 'alova';
import adapterFetch from 'alova/fetch';
import reactHook from 'alova/react';

export const alovaInstance = createAlova({
  // baseURL: 'http://192.168.1.100:5000',
  baseURL: 'https://datingwebserver.onrender.com',
  statesHook: reactHook,
  requestAdapter: adapterFetch(),
  responded: response => response.json()
});
export const alovaOutApi = createAlova({
  baseURL: '',
  statesHook: reactHook,
  requestAdapter: adapterFetch(),
  responded: response => response.json()
});