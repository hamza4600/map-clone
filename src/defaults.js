// DEPENDENCIES

import Sprite from 'tools/Sprite';

// FUNCTIONS

export const FETCH = {
  blacklist: ['undefined', 'dummy', 'confirmation'],
  useCSV:    false
}

export const LOGOUT = {
  useFetch: false
}

// FORMS

export const APPEND = {
  clearButton: {
    use: 'x'
  }
}

export const CONTROL = {
  clearDisabled: true
}

export const FORM_GROUP = {
  cols: {
    inline: {
      xs: 'auto'
    },
    columns: {
      xs: 24,
      md: 12,
      xl: 8
    },
    default: {
      xs: 24
    }
  }
}

export const LABEL = {
  cols: {
    above: {
      xs: 24
    },
    before: {
      xs: 24,
      lg: 8
    },
    inline: {
      xs: 'auto'
    },
    columns: {
      xs: 24,
      xl: 8
    }
  }
}

export const PREPEND = {
}

export const RICH_TEXT = {
  height: 600,
  plugins: 'lists link code',
  toolbar: 'undo redo | bold italic underline | bullist numlist | link code',
}

export const UPLOAD = {
  accept: 'application/pdf',
  multiple: false,
  allowDelete: false,
  variant: 'light',
  fullWidth: true
}


// NUMBERS

export const DATE = {
  useOptions:       false,
  usePrecedingZero: true,
  yearLength:       2,
  fromPrepend:      'From:',
  toPrepend:        'To:'
}

export const DOLLARS = {
  useCents:      false,
  allowNegative: false
}


// COMPONENTS

export const ALERT = {
  variant: 'accent'
}

export const BUTTON = {
  variant:     'primary',
  spriteOrder: 2,
  spriteSize:  'sm',
  round:       true,
  // TYPES
  cancel: {
    variant: 'light',
    label:   'Cancel',
    sprite:  {
      use:   'arrow-left',
      order: 1
    }
  },
  add: {
    label:   'Add',
    icon:    'plus'
  },
  submit: {
    label:   'Submit',
    icon:    'arrow-right'
  },
  save: {
    variant: 'primary',
    label:   'Save',
    icon:    'save'
  },
  delete: {
    variant: 'danger',
    label:   'Delete',
    icon:    'trash'
  }
}

export const CALENDAR = {
  showOutsideMonth: false
}

export const CHECKLIST = {
  useCSV: true
}

export const DROPDOWN = {
  align:    'end',
  useArrow: false
}

export const LINK = {
  spriteOrder: 1
}

export const MODAL = {
  cancelButton: {},
  continueButton: {}
}

export const PLACEHOLDERS = {
  customSelect: 'Type or Select',
  input:        'Type Here',
  option:       'Option',
  select:       'Select',
  textarea:     'Type Here'
}

export const SPRITE = {
  as: Sprite,
  size: 'sm'
}

export const TOGGLE = {
  useGroup: false,
  actve: {
    variant: 'primary'
  },
  inactive: {
    variant: 'primary',
    outline: true
  }
}

export const YES_NO = {
  useNumeric: false,
  useToggle:  true
}
