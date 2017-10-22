import { baseUrl } from './baseurl';

export function RestangularConfigFactory(RestangularProvider) {
    RestangularProvider.setBaseUrl(baseUrl);
}