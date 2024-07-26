# React Query Builder Inspired by Mixpanel

This [Next.js]((https://nextjs.org/)) project enhances the [React Query Builder](https://react-querybuilder.js.org/) Package with custom styling using [ShadCN UI](https://ui.shadcn.com/), designed to replicate the layout and functionality of Mixpanel's query builder.


## Getting Started

Ensure Node.js version 18 or higher is installed as a prerequisite.

## Installation

```bash
npm install
```

Next, run the development server:

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

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Test Query

You can install the postgresql dockerize I created.

### Installation

Go to directory ```docker```. You must have Docker Desktop installed in your machine. You can download it [here](https://www.docker.com/products/docker-desktop/).

After you installed the Docker Desktop. Run the command below:

```bash
docker compose up -d
```

- Access the pgAdmin browser: http://localhost:5050/browser/
- You can log in using this credentials:
```Username: admin@email.com```
```Password: password```
- Create New Server: Complete Documentation for pgAdmin: https://www.pgadmin.org/docs/pgadmin4/8.9/server_dialog.html

Credentials for pgAdmin:

User: ```rqb```<br/>
Password: ```rqb```<br/>
Database: ```rqb```<br/>
Host name: ```rqb_data```<br/>

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
