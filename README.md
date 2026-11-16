# Mintly-backend

API REST de Mintly, aplicación para coleccionar cartas Pokémon. TFG de 2º DAM de Marco Álvarez y Curro Portillo.

## Tecnologías

Node.js + TypeScript + Express. Base de datos PostgreSQL en Supabase (a partir del H7).

## Instalación y arranque

```bash
npm install
cp .env.example .env
npm run dev
```

La API arranca en `http://localhost:3000`. Para comprobar que funciona: `http://localhost:3000/health` devuelve `{"ok":true}`.

| Script | Uso |
|---|---|
| `npm run dev` | Desarrollo, se reinicia al guardar |
| `npm run build` | Compila a `dist/` |
| `npm start` | Ejecuta la versión compilada |

## Base de datos

La base de datos es PostgreSQL en Supabase y se gestiona con Prisma. El esquema está en `prisma/schema.prisma` y las migraciones, en `prisma/migrations`.

Para crear todas las tablas en una base de datos vacía:

```bash
npx prisma migrate deploy
```

Para modificar el esquema durante el desarrollo, se cambia `schema.prisma` y se crea una migración nueva:

```bash
npx prisma migrate dev --name descripcion_del_cambio
```

La migración `0_init` se marcó como ya aplicada en Supabase, porque las tablas se crearon antes de usar migraciones.

## Versiones

| Herramienta | Versión |
|---|---|
| Node.js | 22.23.3 |
| npm | 10.9.9 |
| Express | 5.3.0 |
| TypeScript | 7.0.2 |
| tsx | 4.23.15 |
| nodemon | 3.1.14 |
| dotenv | 18.0.9 |
| helmet | 8.3.0 |
| cors | 2.8.6 |
| morgan | 1.12.1 |