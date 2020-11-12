export const PLAYER_SPRITESHEET = "player"
export const PLAYER_IDLE_ANIM = 'still'
export const PLAYER_JUMPING_ANIM = 'jumping'
export const PLAYER_RUNNING_ANIM = 'running'
export const PLAYER_DEFAULT_ANIM = PLAYER_JUMPING_ANIM
export const PLAYER_ANIMATIONS = [
  {key: PLAYER_IDLE_ANIM, frameNames: ['still'], spriteSheetKey: 'player'},
  {key: PLAYER_JUMPING_ANIM, frameNames: ['jumping'], spriteSheetKey: 'player'},
  {key: PLAYER_RUNNING_ANIM, frameNames: ['running-0', 'running-1'], spriteSheetKey: 'player', frameRate: 10, loop: true},
]