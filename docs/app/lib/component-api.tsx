import manifest from '../../../packages/components/custom-elements.json';
import { getLocaleConfig } from './i18n';

type ApiDeclaration = {
  name: string;
  tagName?: string;
  attributes?: Array<{ name: string; type?: { text?: string }; default?: string; description?: string }>;
  members?: Array<{ kind?: string; name: string; type?: { text?: string }; description?: string; privacy?: string }>;
  events?: Array<{ name: string; type?: { text?: string }; description?: string }>;
};

function findDeclaration(name: string) {
  const target = name.startsWith('Eos') ? name : `Eos${name}`;

  for (const module of manifest.modules) {
    const declaration = (module.declarations as unknown as ApiDeclaration[] | undefined)?.find(
      (item) => item.name === target || item.tagName === name,
    );

    if (declaration) return declaration;
  }

  return undefined;
}

function Type({ value }: { value?: string }) {
  return <code>{value || '—'}</code>;
}

export function ComponentApi({ name, locale = 'en' }: { name: string; locale?: string }) {
  const labels = getLocaleConfig(locale).api;
  const declaration = findDeclaration(name);

  if (!declaration) {
    return <p>{labels.unavailable}</p>;
  }

  const attributes = declaration.attributes ?? [];
  const methods = (declaration.members ?? []).filter(
    (member) => member.kind === 'method' && member.privacy !== 'private',
  );
  const events = declaration.events ?? [];

  return (
    <div className="eos-generated-api">
      <p>
        {labels.generatedFrom} <code>custom-elements.json</code> {labels.forComponent}{' '}
        <code>{declaration.tagName ?? name}</code>.
      </p>
      {attributes.length > 0 && (
        <>
          <h4>{labels.attributes}</h4>
          <table>
            <thead><tr><th>{labels.name}</th><th>{labels.type}</th><th>{labels.defaultValue}</th><th>{labels.description}</th></tr></thead>
            <tbody>{attributes.map((attribute) => (
              <tr key={attribute.name}>
                <td><code>{attribute.name}</code></td>
                <td><Type value={attribute.type?.text} /></td>
                <td><Type value={attribute.default} /></td>
                <td>{attribute.description || '—'}</td>
              </tr>
            ))}</tbody>
          </table>
        </>
      )}
      {events.length > 0 && (
        <>
          <h4>{labels.events}</h4>
          <table>
            <thead><tr><th>{labels.name}</th><th>{labels.type}</th><th>{labels.description}</th></tr></thead>
            <tbody>{events.map((event) => (
              <tr key={event.name}>
                <td><code>{event.name}</code></td>
                <td><Type value={event.type?.text} /></td>
                <td>{event.description || '—'}</td>
              </tr>
            ))}</tbody>
          </table>
        </>
      )}
      {methods.length > 0 && (
        <>
          <h4>{labels.methods}</h4>
          <table>
            <thead><tr><th>{labels.name}</th><th>{labels.signature}</th><th>{labels.description}</th></tr></thead>
            <tbody>{methods.map((method) => (
              <tr key={method.name}>
                <td><code>{method.name}</code></td>
                <td><Type value={method.type?.text} /></td>
                <td>{method.description || '—'}</td>
              </tr>
            ))}</tbody>
          </table>
        </>
      )}
    </div>
  );
}
