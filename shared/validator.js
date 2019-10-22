const moment = require('moment');
const mongoose = require('mongoose');
const validate = require('validate.js');
const errors = require('./errors');

validate.extend(validate.validators.datetime, {
  parse: value => +moment.utc(value),
  format: (value, options) => {
    const format = options.dateOnly ? 'YYYY-MM-DD' : 'YYYY-MM-DD hh:mm:ss';
    return moment.utc(value).format(format);
  },
});

const validateFn = validate.validate;

validate.validate = (args, rules) => {
  const newRules = { ...rules };
  Object.keys(newRules).forEach((key) => {
    newRules[key] = rules[key].reduce((ruleGroup, rule) => ({ ...ruleGroup, ...rule }), {});
  });
  const validationErrors = validateFn(args, newRules, {
    fullMessages: false,
    prettify: () => '',
  });
  if (!validate.isEmpty(validationErrors)) {
    throw new errors.UnprocessableEntity(
      Object.keys(validationErrors).map(field => ({
        field,
        codes: validationErrors[field],
      })),
    );
  }
};

validate.validators.objectId = (value, options) => {
  if (!validate.isDefined(value)) return null;
  return !mongoose.Types.ObjectId.isValid(value) ? options.message : null;
};

validate.validators.objectIds = (values, options) => {
  if (!validate.isDefined(values)) return null;
  if (!validate.isArray(values)) return options.message;
  return !values.every(value => mongoose.Types.ObjectId.isValid(value)) ? options.message : null;
};

validate.validators.hexColor = (value, options) => {
  if (!validate.isDefined(value)) return null;
  return !/^#([0-9a-f]{3}){1,2}$/i.test(value) ? options.message : null;
};

const isLocation = (value, options) => {
  if (!validate.isObject(value)) {
    return false;
  }
  if (!value.latitude || !value.longitude
    || !validate.isNumber(value.latitude) || !validate.isNumber(value.longitude)) {
    return false;
  }
  if (value.latitude > 90 || value.latitude < -90
    || value.longitude > 180 || value.longitude < -180) {
    return false;
  }
  if (validate.isDefined(options.bearing) && !validate.isNumber(value.bearing)) {
    return false;
  }
  if (options.hasTime
    && (validate.isEmpty(value.createdAt)
      || validate.single(value.createdAt, { datetime: { dateOnly: false } }))) {
    return false;
  }
  if (options.hasAddress
    && (validate.isEmpty(value.address) || !validate.isString(value.address))) {
    return false;
  }

  return validate.isEmpty(value.reference) || validate.isString(value.reference);
};

validate.validators.type = (value, options) => {
  if (validate.isEmpty(value)) return null;

  let isValid = false;
  switch (options.type) {
    case 'boolean':
      isValid = validate.isBoolean(value);
      break;
    case 'integer':
      isValid = validate.isInteger(value);
      break;
    case 'number':
      isValid = validate.isNumber(value);
      break;
    case 'object':
      isValid = validate.isObject(value);
      break;
    case 'string':
      isValid = validate.isString(value);
      break;
    case 'array':
      isValid = validate.isArray(value);
      break;
    case 'objectId':
      isValid = mongoose.Types.ObjectId.isValid(value);
      break;
    case 'location':
      isValid = isLocation(value, options);
      break;
    default:
      throw new Error('Invalid type.');
  }
  return !isValid ? options.message : null;
};

validate.validators.arrayType = (values, options) => {
  if (!validate.isDefined(values)) return null;
  if (!validate.isArray(values)) return options.message;
  return !values.every(value => !validate.validators.type(value, options)) ? options.message : null;
};

module.exports = validate;
