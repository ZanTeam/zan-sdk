export class ZANInvalidEndpointUrl extends Error {
  constructor(endpointUrl: string) {
    super(
      `Endpoint URL ${endpointUrl} is not in a valid ZAN endpoint format. Please provide a valid ZAN endpoint URL.`
    );
  }
}
