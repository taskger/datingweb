import { createAlova } from 'alova';
import adapterFetch from 'alova/fetch';
import reactHook from 'alova/react';

export const alovaInstance = createAlova({
  baseURL: 'https://datingweb-eta.vercel.app',
  statesHook: reactHook,
  requestAdapter: adapterFetch(),
  responded: response => response.json()
});
