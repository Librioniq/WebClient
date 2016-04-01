export const headers = (header: any) => {
    return ({}, res, next) => {
        res.header(header);

        next();
    };
};

export default headers;