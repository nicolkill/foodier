const Code = {
  Required: 'required',
  InvalidType: 'invalid_type',
  InvalidValue: 'invalid_value',
  TooShort: 'too_short',
  TooLong: 'too_long',
  TooEarly: 'too_early',
  TooLate: 'too_late',
  Duplicated: 'duplicated',
  NotFound: 'not_found',
  Pending: 'pending',
};

const Required = {
  presence: {
    allowEmpty: false,
    message: Code.Required,
  },
};

const Email = {
  email: {
    message: Code.InvalidValue,
  },
};

const Include = values => ({
  inclusion: {
    within: values,
    message: Code.InvalidValue,
  },
});

const Url = {
  url: {
    schemes: ['.+'],
    message: Code.InvalidValue,
  },
};

const HexColor = {
  hexColor: {
    message: Code.InvalidValue,
  },
};

const Type = {
  Boolean: {
    type: {
      type: 'boolean',
      message: Code.InvalidType,
    },
  },
  Integer: {
    type: {
      type: 'integer',
      message: Code.InvalidType,
    },
  },
  Number: {
    type: {
      type: 'number',
      message: Code.InvalidType,
    },
  },
  Object: {
    type: {
      type: 'object',
      message: Code.InvalidType,
    },
  },
  String: {
    type: {
      type: 'string',
      message: Code.InvalidType,
    },
  },
  ObjectId: {
    type: {
      type: 'objectId',
      message: Code.InvalidType,
    },
  },
  Date: {
    datetime: {
      dateOnly: true,
      message: Code.InvalidValue,
    },
  },
  DateTime: {
    datetime: {
      dateOnly: false,
      message: Code.InvalidValue,
    },
  },
  Array: {
    Boolean: {
      arrayType: {
        type: 'boolean',
        message: Code.InvalidType,
      },
    },
    Integer: {
      arrayType: {
        type: 'integer',
        message: Code.InvalidType,
      },
    },
    Number: {
      arrayType: {
        type: 'number',
        message: Code.InvalidType,
      },
    },
    Object: {
      arrayType: {
        type: 'object',
        message: Code.InvalidType,
      },
    },
    String: {
      arrayType: {
        type: 'string',
        message: Code.InvalidType,
      },
    },
    ObjectId: {
      arrayType: {
        type: 'objectId',
        message: Code.InvalidType,
      },
    },
  },
};

module.exports = {
  Code,
  Type,
  Required,
  Email,
  Include,
  Url,
  HexColor,
};
