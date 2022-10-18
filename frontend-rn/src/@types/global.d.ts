/// <reference types="node" />
/// <reference types="react" />
/// <reference types="react-native" />

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test';
    readonly PUBLIC_URL: string;
  }
}

declare module '*.avif' {
  const src: ImageSourcePropType;
  export default src;
}

declare module '*.bmp' {
  const src: ImageSourcePropType;
  export default src;
}

declare module '*.gif' {
  const src: ImageSourcePropType;
  export default src;
}

declare module '*.jpg' {
  const src: ImageSourcePropType;
  export default src;
}

declare module '*.jpeg' {
  const src: ImageSourcePropType;
  export default src;
}

declare module '*.png' {
  const src: ImageSourcePropType;
  export default src;
}

declare module '*.webp' {
  const src: ImageSourcePropType;
  export default src;
}

declare module '*.svg' {
  const src: ImageSourcePropType;
  export default src;
}
