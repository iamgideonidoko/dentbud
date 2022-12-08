declare module 'google-it' {
  type GoogleItArg = {
    query: string;
    options?: { proxy: string };
    limit?: number;
    includeSites?: string;
    excludeSites?: string;
    'no-display'?: boolean;
  };
  export default function googleIt(arg: GoogleItArg): Promise<object>;
}
