# Release Guide

EOS packages are versioned and published through Changesets on GitHub Actions.
Local npm publishing is not part of the release workflow.

## Add a release note

After making a publishable package change, run:

```bash
pnpm changeset
```

Select the affected package and the appropriate release type:

- `patch`: bug fixes and backwards-compatible corrections
- `minor`: backwards-compatible features
- `major`: breaking changes

Commit the generated `.changeset/*.md` file with the change.

## Automated release flow

1. Push a changeset to `main`.
2. `.github/workflows/release.yml` creates or updates a release pull request.
3. Review the generated package versions and `CHANGELOG.md`.
4. Merge the release pull request.
5. The workflow builds the packages and publishes them to npm with Changesets.

The Changesets config declares `@eosjs/utils` and `@eosjs/ui` as a linked release group. Always review the generated release pull request before merging.

## Local checks

Run these before pushing:

```bash
pnpm format:check
pnpm build
```

Do not run `npm publish` or `pnpm publish` locally. Configure the repository's `NPM_TOKEN` secret before the first automated publish.
