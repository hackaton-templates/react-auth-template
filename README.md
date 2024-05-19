# react-auth-template

Шаблон приложения на NextJS с встроенной авторизацией

⚠ Приложение требует API-сервер, см. необходимую схему в `openapi.yaml` или [онлайн-просмотр](https://petstore.swagger.io/?url=https://raw.githubusercontent.com/hackaton-templates/react-auth-template/main/openapi.yaml)

## Использованные библиотеки:

- [TailwindCSS](https://tailwindcss.com/) - UI-фреймворк
- [@shancn/ui](https://ui.shadcn.com/) - UI-компоненты
- [@mdi/react](https://pictogrammers.com/library/mdi/) - Набор иконок Material Design
- [zod](https://zod.dev/) - Валидатор форм
- [axios](https://axios-http.com/docs/intro) - для работы с API, удобные перехватчики
- cookies-next - немного упрощает работу с cookie на Next

## Getting Started

First, setup environment variables (see `.env.example`):

```
NEXT_PUBLIC_API_URL=
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
