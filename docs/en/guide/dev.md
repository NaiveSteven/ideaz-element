# Development Guide

## Develop

Install dependencies

`pnpm i`

Run project

`pnpm docs:dev`

Build documentation

`pnpm docs:build`

Build components

`pnpm build`

## pnpm

If you want to install a dependency package for pkg1, such as axios, you can perform the following operation:

`pnpm add axios --filter pkg1`

Execute scripts under pkg1

`pnpm build --filter pkg1`

Execute build command under all packages

`pnpm build --filter "./packages/**"`

Reference pkg2 in pkg1

`pnpm install pkg2 -r --filter pkg2`
