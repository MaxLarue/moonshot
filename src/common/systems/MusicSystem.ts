import * as C from "../constants"
import BaseSystem from '~/general/BaseSystem';


export default class MusicSystem extends BaseSystem {
  protected _backgroundMusic: any = null
  create() {
    super.create()
    this._backgroundMusic = this.scene.sound.add(C.MAIN_AUDIO_TRACK, {loop: true})
    this._backgroundMusic.play()
  }

  delete() {
    super.delete()
    this._backgroundMusic.stop()
    this._backgroundMusic.destroy()
  }
}