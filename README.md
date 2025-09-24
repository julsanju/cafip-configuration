# CAFIP Configuration

Sistema de configuración para CAFIP (Catálogo de Entidades) desarrollado con Angular 20.

## Descripción

Este proyecto es una aplicación Angular que proporciona funcionalidades de configuración para el sistema CAFIP. La aplicación está diseñada para funcionar tanto como una aplicación standalone como un microfrontend usando Single-SPA.

## Cómo Ejecutar

### Desarrollo Local

Para ejecutar la aplicación en modo desarrollo:

```bash
npm start
```

La aplicación estará disponible en `http://localhost:4200`

### Modo Single-SPA

Para ejecutar como microfrontend con Single-SPA:

```bash
npm run start:single-spa
```

### Servir con Single-SPA

Para construir y servir la aplicación como microfrontend:

```bash
npm run serve:single-spa
```

La aplicación estará disponible en `http://localhost:4201`

### Modo Watch con Single-SPA

Para desarrollo continuo con Single-SPA:

```bash
npm run serve:single-spa:watch
```

## Cómo Probar

Para ejecutar las pruebas unitarias:

```bash
npm test
```

Esto ejecutará las pruebas usando Karma y Jasmine.

## Construcción

### Construcción Estándar

```bash
npm run build
```

### Construcción para Single-SPA

```bash
npm run build:single-spa
```

## Tecnologías Utilizadas

- **Angular 20**: Framework principal
- **TypeScript**: Lenguaje de programación
- **Tailwind CSS**: Framework de estilos
- **Single-SPA**: Para arquitectura de microfrontends
- **Karma & Jasmine**: Para testing
- **Express**: Para SSR (Server-Side Rendering)

## Estructura del Proyecto

```
src/
├── app/
│   ├── core/           # Servicios y modelos centrales
│   ├── features/       # Módulos de funcionalidades
│   │   └── configurations/  # Módulo de configuraciones
│   └── shared/         # Componentes y utilidades compartidas
├── bootstrap.ts        # Punto de entrada principal
└── main.single-spa.ts  # Punto de entrada para Single-SPA
```

## Requisitos

- Node.js (versión 18 o superior)
- npm o yarn
- Angular CLI

## Instalación

```bash
npm install
```