declare module "*.go" {
  interface GoWrapper {
    [TKey: string]: <TParams = any, TReturn = any>(
      ...params: TParams[]
    ) => Promise<TReturn>;
  }

  var _: GoWrapper;
  export default _;
}
