import Entity from '~/general/Entity';
import BodyComponent from './BodyComponent';
import ZoneDetector from './ZoneDetector';


export default abstract class ZoneTrigger extends ZoneDetector {
  protected entities: Set<Entity> = new Set()

  public abstract onEntityEnter(entity: Entity)
  public abstract onEntityLeave(entity: Entity)

  public onObjectIsIn(body: BodyComponent) {
    this.entities.add(body.entity)
  }

  public update(time: number, delta: number) {
    const previousEntities = new Set([...Array.from(this.entities)])
    this.entities = new Set()
    super.update(time, delta)
    const entitiesWhichEntered = Array.from(this.entities).filter(e => !previousEntities.has(e))
    const entitiesWhichLeft = Array.from(previousEntities).filter(e => !this.entities.has(e))
    entitiesWhichLeft.map(e => this.onEntityLeave(e))
    entitiesWhichEntered.map(e => this.onEntityEnter(e))
  }

}