import { ZANInvalidEndpointUrl } from '@/lib/errors/ZANInvalidEndpointUrl';

export const praseInfoFromEndpoint = (
  endpoint: string,
  endpointConfig?: {
    wss?: boolean;
  },
) => {
  let paths: string[];
  let origin: string;
  let wss = !!endpointConfig?.wss;

  try {
    const url = new URL(endpoint);
    paths = url.pathname.split('/');
    origin = url.origin;
    wss = url.protocol === 'wss:';
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new ZANInvalidEndpointUrl(endpoint);
  }

  const bias = wss ? 1 : 0;

  const chain = paths.at(3 + bias);
  const network = paths.at(4 + bias);
  const api = paths.at(5 + bias);
  const originDomain = wss ? 'wss://api.zan.top' : 'https://api.zan.top';

  if (origin !== originDomain || !api || !chain || !network) {
    throw new ZANInvalidEndpointUrl(endpoint);
  }

  return {
    chain,
    network,
    api,
    wss,
  };
};

export const transformEndpointToAdvanced = (endpoint: string) => {
  return endpoint.replace('/node/', '/data/');
};

export const transformEndpointToWss = (endpoint: string) => {
  return endpoint.replace(
    'https://api.zan.top/node/',
    'wss://api.zan.top/node/ws/',
  );
};
