const Code = {
  BadRequest: 'bad_request',
  Unauthorized: 'unauthorized',
  PaymentRequired: 'payment_required',
  Expired: 'expired',
  Unconfirmed: 'unconfirmed',
  Disabled: 'disabled',
  Forbidden: 'forbidden',
  NotFound: 'not_found',
  Conflict: 'conflict',
  TripInProgress: 'trip_in_progress',
  TooManyRequests: 'too_many_requests',
  InternalServer: 'internal_server',
  UnprocessableEntity: 'unprocessable_entity',
  DriverOutZone: 'driver_out_zone',
  DriverInvalidStatus: 'driver_invalid_status',
  FareEstimatedExpired: 'fare_estimated_expired',
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

class Authorization extends Base {
  constructor(code = Code.Unauthorized) {
    super(code);
  }
}

class PaymentRequired extends Base {
  constructor(code = Code.PaymentRequired) {
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

class TooManyRequests extends Base {
  constructor(code = Code.TooManyRequests) {
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

class InsufficientFunds extends Error {
  constructor() {
    super('Insufficient wallet funds');
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = {
  Code,
  BadRequest,
  Authorization,
  PaymentRequired,
  Forbidden,
  NotFound,
  Conflict,
  TooManyRequests,
  UnprocessableEntity,
  InternalServer,
  InsufficientFunds,
};
