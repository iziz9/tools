import 'jest-extended'

declare module '*.css' {
  const content: { [className: string]: string }
  export = content
}
