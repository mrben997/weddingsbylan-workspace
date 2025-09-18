interface IModalRouteCloseEvent {}

export class MREvents {
  eventName = 'modal-route-close'

  subscribe = (func: (value: IModalRouteCloseEvent) => void) => {
    window.addEventListener(this.eventName, func)
  }

  unsubcribe = (func: (value: IModalRouteCloseEvent) => void) => {
    window.removeEventListener(this.eventName, func)
  }

  emit = (value: IModalRouteCloseEvent) => {
    const data = new CustomEvent(this.eventName, value)
    window.dispatchEvent(data)
  }
}
