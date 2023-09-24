import React from 'react';

// GLOBAL VARIABLES
import { DATE, DOLLARS } from 'defaults.js';

// BOOTSTRAP COMPONENTS
import { Badge } from 'react-bootstrap';

// GLOBAL FUNCTIONS
import { formatPlural } from 'functions.js';


// LOCAL FUNCTIONS
const pluralFormat = (label, useZero, usePlural) => ({
  format: value => formatPlural(value, label),
  removeFormatting: formattedValue => formattedValue.replace(new RegExp(` ${label}(s)?`), ''),
  placeholder: `XX ${label}s`
})

// EXPORTS
export const NUMBER_FORMATS = {
  date: {
    format: DATE.yearLength === 2 ? '##/##/##' : '##/##/####',
    placeholder: DATE.yearLength === 2 ? 'mm/dd/yy' : 'mm/dd/yyyy',
    mask: DATE.yearLength === 2 ? ['m', 'm', 'd', 'd', 'y', 'y'] : ['m', 'm', 'd', 'd', 'y', 'y', 'y', 'y']
  },
  dateRange: {
    format: DATE.yearLength === 2 ? '##/##/##-##/##/##' : '##/##/####-##/##/####',
    placeholder: DATE.yearLength === 2 ? 'mm/dd/yy-mm/dd/yy' : 'mm/dd/yyyy-mm/dd/yyyy',
    mask: DATE.yearLength === 2 ? ['m', 'm', 'd', 'd', 'y', 'y', 'm', 'm', 'd', 'd', 'y', 'y'] : ['m', 'm', 'd', 'd', 'y', 'y', 'y', 'y', 'm', 'm', 'd', 'd', 'y', 'y', 'y', 'y']
  },
  days: pluralFormat('day'),
  dollars: {
    prefix: '$',
    thousandSeparator: true,
    decimalScale: DOLLARS.useCents ? 2 : 0,
    fixedDecimalScale: true,
    placeholder: '$X,XXX'
  },
  miles: {
    thousandSeparator: true,
    decimalScale: 0,
    placeholder: 'X,XXX'
  },
  percent: {
    suffix: '%',
    decimalScale: 2,
    allowNegative: false,
    placeholder: 'XX%'
  },
  tel: {
    format: '+1 (###) ###-####',
    placeholder: '+1 (XXX) XXX-XXXX',
    mask: 'X',
    useFormattedValue: true
  },
  year: {
    format: '####',
    placeholder: 'XXXX',
    mask: 'X'
  },

  // CUSTOM

  dollarsVariant: {
    prefix: '$',
    thousandSeparator: true,
    decimalScale: 2,
    fixedDecimalScale: true,
    placeholder: '$X,XXX',
    renderText: formattedValue => {
      const float = parseFloat(formattedValue.replace('$', ''));
      return <span className={float < 0 ? 'text-danger' : float > 0 ? 'text-success' : ''}>{formattedValue}</span>;
    },
  },
  dollarsAboveBelow: {
    prefix: '$',
    thousandSeparator: true,
    decimalScale: 2,
    fixedDecimalScale: true,
    placeholder: '$X,XXX',
    renderText: formattedValue => {
      const negative = formattedValue.indexOf('-') === 0;
      return `${formattedValue.replace('-', '')} ${negative ? 'Below' : 'Above'}`;
    },
  },
  percentAboveBelow: {
    suffix: '%',
    decimalScale: 2,
    placeholder: 'XX%',
    renderText: formattedValue => {
      const negative = formattedValue.indexOf('-') === 0;
      return `${formattedValue.replace('-', '')} ${negative ? 'Below' : 'Above'}`;
    },
  },
  pillAboveBelow: {
    prefix: '$',
    thousandSeparator: true,
    decimalScale: 2,
    fixedDecimalScale: true,
    placeholder: '$X,XXX',
    renderText: formattedValue => {
      const negative = formattedValue.indexOf('-') === 0;
      return <><Badge pill variant={negative ? 'accent' : 'primary'}>{negative ? 'Below' : 'Above'}</Badge> {formattedValue}</>;
    },
  },
}
