import { index, route, type RouteConfig } from '@react-router/dev/routes';

export default [
  route(':lang?/skills.md', 'llms/skills.ts'),
  route('~demos/:demoId', 'routes/demo-preview.tsx'),
  route(':lang?/docs/*', 'routes/docs.tsx'),
  route(':lang?', 'routes/home.tsx'),
  route('api/search', 'routes/search.ts'),
  route('*', 'routes/not-found.tsx'),

  // LLM integration:
  route(':lang?/llms.txt', 'llms/index.ts'),
  route(':lang?/llms-full.txt', 'llms/full.ts'),
  route(':lang?/llms.mdx/docs/*', 'llms/mdx.ts'),

] satisfies RouteConfig;
