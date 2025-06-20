### Steps to get started

2. Install Latest Version of [Node.js](https://nodejs.org/)
3. To install pnpm (faster alternative of npm) \
    ```npm install -g pnpm``` \
4. To Install dependencies \
    ```pnpm i``` \
5. To start development server \
    ```pnpm dev``` 
6. To make production build \
    ```pnpm run build``` \
7. To start production build \
    ```pnpm start``` \
8. To execute written test cases \
    ```pnpm run test```


### Project Structure

```
│   ├── public
│   │   └── icons
├── src
│   ├── app
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── common
│   │   ├── components
│   │   ├── hooks
│   │   ├── lib
|   |   |   └── redux
│   │   ├── hooks
│   │   ├── theme
│   │   ├── utils
|   |       └── constants
│   └── middleware.ts
├── .env.example
├── eslint.config.mjs
├── jest.config.ts
├── next-env.d.ts (will only appear after running dev or build commands)
├── next.config.ts
├── package.json
├── README.md
├── tsconfig.json
└── pnpm-lock.yaml
```
