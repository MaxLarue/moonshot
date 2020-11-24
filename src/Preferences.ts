import Cookies from "js-cookie"

export enum Keyboard {
  AZERTY = "AZERTY",
  QWERTY = "QWERTY"
}

export const KEYBOARD_COOKIE = "KEYBOARD_COOKIE"

export default class Preferences {
  get keyboard(): Keyboard {
    return Cookies.get(KEYBOARD_COOKIE) === Keyboard.AZERTY ? Keyboard.AZERTY : Keyboard.QWERTY
  }
  set keyboard(to: Keyboard) {
    Cookies.set(KEYBOARD_COOKIE, to)
  }
  public getOtherKeyboard(from: Keyboard): Keyboard {
    return this.keyboard === Keyboard.AZERTY ? Keyboard.QWERTY : Keyboard.AZERTY
  }
}