import Entity from './Entity';
import ILifecycleAware from './ILifecycleAware'
import ITagged from './ITagged';

export default interface IComponent extends ILifecycleAware, ITagged {
  readonly entity: Entity
}