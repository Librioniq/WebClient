export class RequestConverter {
    public static convert(obj: any) {
        if (obj instanceof FormData || obj instanceof Blob) {
            return JSON.stringify(obj);
        } else {
            return obj;
        }
    }
}

export default RequestConverter;