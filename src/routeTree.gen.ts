/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as IndexImport } from './routes/index'
import { Route as UpdatePasswordIndexImport } from './routes/update-password/index'
import { Route as SignUpIndexImport } from './routes/sign-up/index'
import { Route as SignInIndexImport } from './routes/sign-in/index'
import { Route as ResetPasswordIndexImport } from './routes/reset-password/index'
import { Route as PortfolioIndexImport } from './routes/portfolio/index'
import { Route as AddAssetIndexImport } from './routes/add-asset/index'
import { Route as AboutIndexImport } from './routes/about/index'

// Create/Update Routes

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const UpdatePasswordIndexRoute = UpdatePasswordIndexImport.update({
  id: '/update-password/',
  path: '/update-password/',
  getParentRoute: () => rootRoute,
} as any)

const SignUpIndexRoute = SignUpIndexImport.update({
  id: '/sign-up/',
  path: '/sign-up/',
  getParentRoute: () => rootRoute,
} as any)

const SignInIndexRoute = SignInIndexImport.update({
  id: '/sign-in/',
  path: '/sign-in/',
  getParentRoute: () => rootRoute,
} as any)

const ResetPasswordIndexRoute = ResetPasswordIndexImport.update({
  id: '/reset-password/',
  path: '/reset-password/',
  getParentRoute: () => rootRoute,
} as any)

const PortfolioIndexRoute = PortfolioIndexImport.update({
  id: '/portfolio/',
  path: '/portfolio/',
  getParentRoute: () => rootRoute,
} as any)

const AddAssetIndexRoute = AddAssetIndexImport.update({
  id: '/add-asset/',
  path: '/add-asset/',
  getParentRoute: () => rootRoute,
} as any)

const AboutIndexRoute = AboutIndexImport.update({
  id: '/about/',
  path: '/about/',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/about/': {
      id: '/about/'
      path: '/about'
      fullPath: '/about'
      preLoaderRoute: typeof AboutIndexImport
      parentRoute: typeof rootRoute
    }
    '/add-asset/': {
      id: '/add-asset/'
      path: '/add-asset'
      fullPath: '/add-asset'
      preLoaderRoute: typeof AddAssetIndexImport
      parentRoute: typeof rootRoute
    }
    '/portfolio/': {
      id: '/portfolio/'
      path: '/portfolio'
      fullPath: '/portfolio'
      preLoaderRoute: typeof PortfolioIndexImport
      parentRoute: typeof rootRoute
    }
    '/reset-password/': {
      id: '/reset-password/'
      path: '/reset-password'
      fullPath: '/reset-password'
      preLoaderRoute: typeof ResetPasswordIndexImport
      parentRoute: typeof rootRoute
    }
    '/sign-in/': {
      id: '/sign-in/'
      path: '/sign-in'
      fullPath: '/sign-in'
      preLoaderRoute: typeof SignInIndexImport
      parentRoute: typeof rootRoute
    }
    '/sign-up/': {
      id: '/sign-up/'
      path: '/sign-up'
      fullPath: '/sign-up'
      preLoaderRoute: typeof SignUpIndexImport
      parentRoute: typeof rootRoute
    }
    '/update-password/': {
      id: '/update-password/'
      path: '/update-password'
      fullPath: '/update-password'
      preLoaderRoute: typeof UpdatePasswordIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/about': typeof AboutIndexRoute
  '/add-asset': typeof AddAssetIndexRoute
  '/portfolio': typeof PortfolioIndexRoute
  '/reset-password': typeof ResetPasswordIndexRoute
  '/sign-in': typeof SignInIndexRoute
  '/sign-up': typeof SignUpIndexRoute
  '/update-password': typeof UpdatePasswordIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/about': typeof AboutIndexRoute
  '/add-asset': typeof AddAssetIndexRoute
  '/portfolio': typeof PortfolioIndexRoute
  '/reset-password': typeof ResetPasswordIndexRoute
  '/sign-in': typeof SignInIndexRoute
  '/sign-up': typeof SignUpIndexRoute
  '/update-password': typeof UpdatePasswordIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/about/': typeof AboutIndexRoute
  '/add-asset/': typeof AddAssetIndexRoute
  '/portfolio/': typeof PortfolioIndexRoute
  '/reset-password/': typeof ResetPasswordIndexRoute
  '/sign-in/': typeof SignInIndexRoute
  '/sign-up/': typeof SignUpIndexRoute
  '/update-password/': typeof UpdatePasswordIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/about'
    | '/add-asset'
    | '/portfolio'
    | '/reset-password'
    | '/sign-in'
    | '/sign-up'
    | '/update-password'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/about'
    | '/add-asset'
    | '/portfolio'
    | '/reset-password'
    | '/sign-in'
    | '/sign-up'
    | '/update-password'
  id:
    | '__root__'
    | '/'
    | '/about/'
    | '/add-asset/'
    | '/portfolio/'
    | '/reset-password/'
    | '/sign-in/'
    | '/sign-up/'
    | '/update-password/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AboutIndexRoute: typeof AboutIndexRoute
  AddAssetIndexRoute: typeof AddAssetIndexRoute
  PortfolioIndexRoute: typeof PortfolioIndexRoute
  ResetPasswordIndexRoute: typeof ResetPasswordIndexRoute
  SignInIndexRoute: typeof SignInIndexRoute
  SignUpIndexRoute: typeof SignUpIndexRoute
  UpdatePasswordIndexRoute: typeof UpdatePasswordIndexRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AboutIndexRoute: AboutIndexRoute,
  AddAssetIndexRoute: AddAssetIndexRoute,
  PortfolioIndexRoute: PortfolioIndexRoute,
  ResetPasswordIndexRoute: ResetPasswordIndexRoute,
  SignInIndexRoute: SignInIndexRoute,
  SignUpIndexRoute: SignUpIndexRoute,
  UpdatePasswordIndexRoute: UpdatePasswordIndexRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/about/",
        "/add-asset/",
        "/portfolio/",
        "/reset-password/",
        "/sign-in/",
        "/sign-up/",
        "/update-password/"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/about/": {
      "filePath": "about/index.tsx"
    },
    "/add-asset/": {
      "filePath": "add-asset/index.tsx"
    },
    "/portfolio/": {
      "filePath": "portfolio/index.tsx"
    },
    "/reset-password/": {
      "filePath": "reset-password/index.tsx"
    },
    "/sign-in/": {
      "filePath": "sign-in/index.tsx"
    },
    "/sign-up/": {
      "filePath": "sign-up/index.tsx"
    },
    "/update-password/": {
      "filePath": "update-password/index.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
