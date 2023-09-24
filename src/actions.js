// SESSION

export const configurationActions = {
  setConfiguration: response => ({
    type: 'SET_CONFIGURATION',
    configuration: response
  }),
  clearConfiguration: response => ({
    type: 'CLEAR_CONFIGURATION',
    configuration: response
  })
}

export const sessionActions = {
  login: response => ({
    type: 'LOGIN_USER',
    ...response
  }),
  logout: payload => ({
    type: 'LOGOUT_USER',
    payload
  }),
  extendSession: response => ({
    type: 'EXTEND_SESSION',
    ...response
  }),
  setVerification: response => ({
    type: 'SET_VERIFICATION',
    verified: true
  }),
  setDealership: response => ({
    type: 'SET_DEALERSHIP',
    ...response
  })
}


// SETTINGS

export const preferencesActions = {
  update: (key, setting) => ({
    type: 'UPDATE_PREFERENCE',
    key,
    setting
  })
}


// INTERFACE

export const alertActions = {
  add: alerts => ({
    type: 'ADD_ALERTS',
    alerts: Array.isArray(alerts) ? alerts : [ alerts ]
  }),
  remove: alertID => ({
    type: 'REMOVE_ALERT',
    alertID
  }),
  clear: alerts => ({
    type: 'CLEAR_ALERTS',
    alerts: alerts
  })
}

export const modalActions = {
  add: modal => ({
    type: 'ADD_MODAL',
    modal
  }),
  remove: modalID => ({
    type: 'REMOVE_MODAL',
    modalID
  }),
  increment: () => ({
    type: 'INCREMENT_MODAL'
  }),
  clear: () => ({
    type: 'CLEAR_MODALS'
  })
}

export const setScreenSize = isMobile => ({
  type: 'SET_SCREEN_SIZE',
  isMobile
})

export const setMenuCollapse = collapse => ({
  type: 'SET_COLLAPSE',
  collapse
})

export const toggleSidebar = toggle => ({
  type: 'TOGGLE_SIDEBAR',
  toggle
})


// DATA

export const lookupActions = {
  init: key => ({
    type: 'INIT_LOOKUP',
    key
  }),
  load: (key, payload = []) => ({
    type: 'LOAD_LOOKUP',
    key,
    payload
  }),
  error: key => ({
    type: 'LOOKUP_ERROR',
    key
  }),
  flush: key => ({
    type: 'FLUSH_LOOKUP',
    key
  })
}

export const recordActions = {
  list: (response) => ({
    type: 'LIST_RECORDS',
    ...(Array.isArray(response) ? {
      total: response.length,
      list: response
    }: {
      total: response.total_records,
      list: response.result
    })
  }),
  load: record => ({
    type: 'LOAD_RECORD',
    record
  }),
  append: (data, key) => ({
    type: 'APPEND_RECORD',
    key,
    data
  }),
  flush: () => ({
    type: 'FLUSH_RECORDS'
  })
}

export const tableActions = {
  load: (key, payload = []) => ({
    type: 'LOAD_TABLE',
    key,
    payload
  }),
  error: () => ({
    type: 'TABLE_ERROR'
  })
}
