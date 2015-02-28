
'use strict'

let _events

class Emitter {
  constructor() {
    _events = new Map()
  }

  emit(type, ...args) {
    if (_events.has(type)) {
      _events.get(type).forEach(fn => fn.apply(null, args))
      return true
    }

    return false
  }

  on(type, listener) {
    if (typeof type === 'string' && typeof listener === 'function') {
      if (!_events.has(type)) {
        _events.set(type, new Map())
      }
      let ticket = Symbol(type)
      _events.get(type).set(ticket, listener)
      return ticket
    }

    return false
  }

  off(type) {
    if (_events.has(type)) {
      _events.delete(type)
      return true
    }

    return false
  }

  update(ticket, listener) {
    if (typeof ticket !== 'symbol' || typeof listener !== 'function') {
      return false
    }

    let type = ticket.toString().slice(7, -1)

    if (_events.has(type) && _events.get(type).has(ticket)) {
      _events.get(type).set(ticket, listener)
      return true
    }

    return false
  }

  remove(ticket) {
    if (typeof ticket !== 'symbol') {
      return false
    }

    let type = ticket.toString().slice(7, -1)

    if (_events.has(type) && _events.get(type).has(ticket)) {
      _events.get(type).delete(ticket)
      return true
    }

    return false
  }

  once(type, listener) {
    let ticket = this.on(type, function() { return })
    let self = this

    this.update(ticket, function(...args) {
      self.remove(ticket)
      listener.apply(null, args)
    })

    return ticket
  }

}

export default Emitter
