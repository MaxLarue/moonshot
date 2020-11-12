import { ObservableFsm } from 'gameutils'
import { Transitions } from 'gameutils/dist/Fsm/AbstractFsm';


export enum PlayerStates {
  IDLE = "idle",
  RUNNING = "running", 
  IN_AIR = "in air"
}

export default class PlayerStateMachine extends ObservableFsm<PlayerStates> {
  get initialState(): PlayerStates {
    return PlayerStates.IN_AIR
  }
  get transitions(): Transitions<PlayerStates> {
    return [
      {from: PlayerStates.IDLE, to: PlayerStates.IN_AIR},
      {from: PlayerStates.RUNNING, to: PlayerStates.IN_AIR},
      {from: PlayerStates.RUNNING, to: PlayerStates.IDLE},
      {from: PlayerStates.IDLE, to: PlayerStates.RUNNING},
      {from: PlayerStates.IN_AIR, to: PlayerStates.IDLE},
      {from: PlayerStates.IN_AIR, to: PlayerStates.RUNNING},
      {from: PlayerStates.RUNNING, to: PlayerStates.IDLE}
    ]
  }

}