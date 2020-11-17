import { ObservableFsm } from 'gameutils'
import { Transitions } from 'gameutils/dist/Fsm/AbstractFsm';


export enum PlayerStates {
  IDLE = "idle",
  RUNNING = "running", 
  IN_AIR = "in air",
  CLIMBING = "climbing",
  CLIMBING_IDLE = "climbing_idle",
  SLIDING = "sliding",
  GRAPPLING = "grappling"
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
      {from: PlayerStates.RUNNING, to: PlayerStates.CLIMBING},
      {from: PlayerStates.RUNNING, to: PlayerStates.CLIMBING_IDLE},
      {from: PlayerStates.IDLE, to: PlayerStates.RUNNING},
      {from: PlayerStates.IN_AIR, to: PlayerStates.IDLE},
      {from: PlayerStates.IN_AIR, to: PlayerStates.RUNNING},
      {from: PlayerStates.IN_AIR, to: PlayerStates.CLIMBING},
      {from: PlayerStates.IN_AIR, to: PlayerStates.CLIMBING_IDLE},
      {from: PlayerStates.RUNNING, to: PlayerStates.IDLE},
      {from: PlayerStates.IDLE, to: PlayerStates.CLIMBING},
      {from: PlayerStates.IDLE, to: PlayerStates.CLIMBING_IDLE},
      {from: PlayerStates.CLIMBING, to: PlayerStates.IDLE},
      {from: PlayerStates.CLIMBING, to: PlayerStates.IN_AIR},
      {from: PlayerStates.CLIMBING, to: PlayerStates.CLIMBING_IDLE},
      {from: PlayerStates.CLIMBING_IDLE, to: PlayerStates.IDLE},
      {from: PlayerStates.CLIMBING_IDLE, to: PlayerStates.IN_AIR},
      {from: PlayerStates.CLIMBING_IDLE, to: PlayerStates.CLIMBING},
      {from: PlayerStates.SLIDING, to: PlayerStates.IN_AIR},
      {from: PlayerStates.IN_AIR, to: PlayerStates.SLIDING},
      {from: PlayerStates.RUNNING, to: PlayerStates.GRAPPLING},
      {from: PlayerStates.IDLE, to: PlayerStates.GRAPPLING},
      {from: PlayerStates.IN_AIR, to: PlayerStates.GRAPPLING},
      {from: PlayerStates.CLIMBING, to: PlayerStates.GRAPPLING},
      {from: PlayerStates.GRAPPLING, to: PlayerStates.RUNNING},
      {from: PlayerStates.GRAPPLING, to: PlayerStates.IDLE},
      {from: PlayerStates.GRAPPLING, to: PlayerStates.CLIMBING},
    ]
  }

}