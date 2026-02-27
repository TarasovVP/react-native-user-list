# React Native User List

A React Native app for browsing a list of users with offline caching. Data is fetched from [DummyJSON API](https://dummyjson.com/users), stored locally, and shown when the device is offline.

## Features

- **User list** — avatar, name, birth date, email, phone, gender
- **Offline mode** — on first launch, cached data is shown (if any), then refreshed from the API
- **No-network fallback** — on load error, saved data is shown with a warning
- **Pull-to-refresh** — refresh the list with a gesture
- **Platforms** — iOS, Android, Web

## Stack

- **React Native** 0.83, **TypeScript**
- **Zustand** — state (list, loading, errors)
- **WatermelonDB** — local DB on iOS/Android
- **LokiJS** — local storage for Web
- **Axios** — API requests
- **DummyJSON** — mock users API

## Project structure

```
src/
├── api/           # HTTP client and users API
├── db/            # WatermelonDB/LokiJS: schema, migrations, usersDB
├── di/            # DI container (AppContainer)
├── features/users/
│   ├── components/  # UserRow
│   ├── screens/     # UsersScreen
│   ├── store/       # createUserStore, useUserStore
│   └── types/       # User, userUtils
└── utils/         # constants (API_BASE_URL, USERS_ENDPOINT)
```

## Running the app

Requirements: Node.js >= 20 and a [React Native environment](https://reactnative.dev/docs/set-up-your-environment) set up.

### Metro

```sh
npm start
# or
yarn start
```

### Android

```sh
npm run android
# or
yarn android
```

### iOS

On first clone or after updating native dependencies:

```sh
bundle install
bundle exec pod install
```

Then:

```sh
npm run ios
# or
yarn ios
```

### Web

```sh
npm run web
# or
yarn web
```

Production build: `npm run build:web` / `yarn build:web`.

## Scripts

| Command           | Description                |
|------------------|----------------------------|
| `npm start`      | Start Metro                |
| `npm run android` | Build and run on Android   |
| `npm run ios`    | Build and run on iOS       |
| `npm run web`    | Run web version (dev)      |
| `npm run build:web` | Production build for Web |
| `npm run lint`   | ESLint                     |
| `npm test`       | Jest                       |

## API and cache

- **Data source**: `https://dummyjson.com/users`
- On launch: show cache first (if any), then request API and update cache
- On network error: show cache and message «Using cached data. Connection error.»
- Refresh list: pull-to-refresh or retry on the error screen

## Further reading

- [React Native docs](https://reactnative.dev/docs/getting-started)
- [Troubleshooting](https://reactnative.dev/docs/troubleshooting)
