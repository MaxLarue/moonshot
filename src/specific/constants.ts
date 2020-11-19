export const PLAYER_SPRITESHEET = "player"
export const PLAYER_IDLE_ANIM = 'still'
export const PLAYER_JUMPING_ANIM = 'jumping'
export const PLAYER_RUNNING_ANIM = 'running'
export const PLAYER_CLIMBING_ANIM = "climbing"
export const PLAYER_CLIMBING_IDLE = "climbing-idle"
export const PLAYER_SLIDING_ANIM = "anim"
export const PLAYER_DEFAULT_ANIM = PLAYER_JUMPING_ANIM
export const PLAYER_ANIMATIONS = [
  {key: PLAYER_IDLE_ANIM, frameNames: ['still'], spriteSheetKey: 'player'},
  {key: PLAYER_JUMPING_ANIM, frameNames: ['jumping'], spriteSheetKey: 'player'},
  {key: PLAYER_RUNNING_ANIM, frameNames: ['running-0', 'running-1'], spriteSheetKey: 'player', frameRate: 10, loop: true},
  {key: PLAYER_CLIMBING_ANIM, frameNames: ['climbin-1', 'climbin-2'], spriteSheetKey: 'player', frameRate: 5, loop: true},
  {key: PLAYER_CLIMBING_IDLE, frameNames: ['climbin-idle'], spriteSheetKey: 'player', frameRate: 10, loop: true},
  {key: PLAYER_SLIDING_ANIM, frameNames: ['sliding'], spriteSheetKey: 'player', frameRate: 10, loop: true},
]
export const PLAYER_PHYSIC_LAYER = "PLAYER_PHYSIC_LAYER"
export const GRAPPLE_PHYSIC_LAYER = "GRAPPLE_PHYSIC_LAYER"
export const UI_PHYSIC_LAYER = "UI_PHYSIC_LAYER"
export const PHYSIC_LAYERS = [PLAYER_PHYSIC_LAYER, GRAPPLE_PHYSIC_LAYER, UI_PHYSIC_LAYER]
export const SLIDING_BASE_SPEED = 3
export const SLIDING_ACCELERATION_FACTOR = 3
export const SLIDING_MAX_SPEED = 40
export const GRAPPLE_UNHOOKED_ANIM = "not-hooked"
export const GRAPPLE_HOOKED_ANIM = "hooked"
export const GRAPPLE_ANIMATIONS = [
  {key: GRAPPLE_UNHOOKED_ANIM, frameNames: ['not-hooked'], spriteSheetKey: 'grapple'},
  {key: GRAPPLE_HOOKED_ANIM, frameNames: ['hooked'], spriteSheetKey: 'grapple'},
]
export const BUTTON_DEFAULT_ANIMATION = "button"
export const BUTTON_HOVER_ANIMATION = "hover"
export const BUTTON_ANIMATIONS = [
  {key: BUTTON_DEFAULT_ANIMATION, frameNames: ['button'], spriteSheetKey: 'button'},
  {key: BUTTON_HOVER_ANIMATION, frameNames: ['hover'], spriteSheetKey: 'button'},
]
export const POLE_SYSTEM_NAME = "pole-system"
export const TILEMAP_SIZE = {x: 1000, y: 30}
