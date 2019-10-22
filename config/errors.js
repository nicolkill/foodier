const Code = {
  BadRequest: 'bad_request',
  Forbidden: 'forbidden',
  NotFound: 'not_found',
  Conflict: 'conflict',
  InternalServer: 'internal_server',
  UnprocessableEntity: 'unprocessable_entity',
};

class Base extends Error {
  constructor(code) {
    super();
    this.code = code;
    Error.captureStackTrace(this, this.constructor);
  }

  toJSON() {
    return {
      code: this.code,
    };
  }
}

class BadRequest extends Base {
  constructor(code = Code.BadRequest) {
    super(code);
  }
}

class Forbidden extends Base {
  constructor(code = Code.Forbidden) {
    super(code);
  }
}

class NotFound extends Base {
  constructor(code = Code.NotFound) {
    super(code);
  }
}

class Conflict extends Base {
  constructor(code = Code.Conflict) {
    super(code);
  }
}

class UnprocessableEntity extends Base {
  constructor(errors = []) {
    super(Code.UnprocessableEntity);
    this.errors = errors;
  }

  toJSON() {
    return {
      code: this.code,
      errors: this.errors,
    };
  }
}

class InternalServer extends Base {
  constructor(code = Code.InternalServer) {
    super(code);
  }
}

module.exports = {
  Code,
  BadRequest,
  Forbidden,
  NotFound,
  Conflict,
  UnprocessableEntity,
  InternalServer,
};
