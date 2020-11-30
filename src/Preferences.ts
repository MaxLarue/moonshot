import Cookies from "js-cookie"

export enum Keyboard {
  AZERTY = "AZERTY",
  QWERTY = "QWERTY"
}

export const KEYBOARD_COOKIE = "KEYBOARD_COOKIE"

let keyboardGlobal: Keyboard | null = null

export default class Preferences {
  get keyboard(): Keyboard {
    if (!keyboardGlobal) {
      const fromCookies = Cookies.get(KEYBOARD_COOKIE) === Keyboard.AZERTY ? Keyboard.AZERTY : Keyboard.QWERTY
      keyboardGlobal = fromCookies
      return fromCookies
    }
    return keyboardGlobal
  }
  set keyboard(to: Keyboard) {
    Cookies.set(KEYBOARD_COOKIE, to)
    keyboardGlobal = to
  }
  public getOtherKeyboard(from: Keyboard): Keyboard {
    return this.keyboard === Keyboard.AZERTY ? Keyboard.QWERTY : Keyboard.AZERTY
  }
}