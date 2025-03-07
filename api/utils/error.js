export const errorHandler = (statusCode,message) => {
    const error = new Error();
    error.statusCode = statusCode;
    error.message = message;
    console.error(`Error ${statusCode}: ${message}`);
    return error;
} 