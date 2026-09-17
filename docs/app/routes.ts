import { index, route, type RouteConfig } from '@react-router/dev/routes';

export default [
  route(':lang?/docs/*', 'routes/docs.tsx'),
  route(':lang?', 'routes/home.tsx'),
  route('api/search', 'routes/search.ts'),
  route('*', 'routes/not-found.tsx'),

  // LLM integration:
  route('llms.txt', 'llms/index.ts'),
  route('llms-full.txt', 'llms/full.ts'),
  route('llms.mdx/docs/*', 'llms/mdx.ts'),

] satisfies RouteConfig;
