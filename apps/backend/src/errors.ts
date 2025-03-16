export class ApiError extends Error {
    statusCode: number

    constructor(message: string, statusCode: number) {
        super(message)
        this.statusCode = statusCode
    }
}

export class NotFoundError extends ApiError {
    constructor(message = 'Not Found') {
        super(message, 404)
    }
}

export class ValidationError extends ApiError {
    constructor(message = 'Validation Error') {
        super(message, 400)
    }
}

export class UnauthorizedError extends ApiError {
    constructor(message = 'Unauthorized') {
        super(message, 401)
    }
}

export class InternalServerError extends ApiError {
    constructor(message = 'Internal server error') {
        super(message, 500)
    }
}
