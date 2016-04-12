export interface ResponseStrategy {
    /**
     * support
     */
    support(code: number): boolean;

    apply(response: IResponse, action: any, dispatch: any): Promise<any>;
}