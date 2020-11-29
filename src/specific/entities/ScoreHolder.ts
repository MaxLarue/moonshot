import * as C from "../../constants"
import { FListener, LiveData, LiveDataUpdateEvent, Vec2 } from 'gameutils';
import TextComponent from '~/common/components/TextComponent';
import BaseScene from '~/general/BaseScene';
import Entity from '~/general/Entity';


export default class ScoreHolder extends Entity {
  protected label: TextComponent
  protected scoreDisplay: TextComponent
  protected score: LiveData<number>

  constructor(scene: BaseScene, score: LiveData<number>) {
    super(scene, [], [])
    this.score = score
    this.label = new TextComponent(this, {
      text: "score",
      x: C.GAME_WIDTH - 100,
      y: 10,
      fixed: true,
    })
    this.scoreDisplay = new TextComponent(this, {
      text: this.score.get().toString(),
      x: this.scorePos.x,
      y: this.scorePos.y,
      fixed: true,
    })
    this.addComponent(this.label)
    this.addComponent(this.scoreDisplay)
    this.score.subscribe(new FListener((event) => {
      this.onScoreChange(event)
    }))
  }

  public get scorePos(): Vec2 {
    return new Vec2(
      C.GAME_WIDTH - 50,
      10
    )
  }

  public onScoreChange(event: LiveDataUpdateEvent<number>) {
    this.scoreDisplay.setText(event.next.toString())
  }

}