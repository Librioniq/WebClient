export const headers = (header: any) => {
    return (req, res, next) => {
        res.header(header);

        next();
    };
};

export default headers;