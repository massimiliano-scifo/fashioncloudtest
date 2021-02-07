export class HttpError extends Error {
    statusCode : string;
    errorMessage : string;
    code : string;

    constructor(message, statusCode, errorCode?, errorMessage?) {
        super(message); // Add a "message" property
        this.statusCode = statusCode;
        this.errorMessage = errorMessage ? errorMessage : message;
        this.code = errorCode ? errorCode : null; // Adds a "code" property
    }
}