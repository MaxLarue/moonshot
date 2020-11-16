import { ObservableFsm } from 'gameutils';
import { Transitions } from 'gameutils/dist/Fsm/AbstractFsm';

export enum GrapleState {
  FLYING = "flying",
  HOOKED = "hooked"
}

export default class GrappleStateMachine extends ObservableFsm<GrapleState> {
  get initialState(): GrapleState {
    return GrapleState.FLYING
  }
  get transitions(): Transitions<GrapleState> {
    return [
      {from: GrapleState.FLYING, to: GrapleState.HOOKED},
    ]
  }

}