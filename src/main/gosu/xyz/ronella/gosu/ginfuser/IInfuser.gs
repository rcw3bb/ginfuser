package xyz.ronella.gosu.ginfuser

uses gw.lang.reflect.IPropertyInfo

/**
 * The blueprint of creating an Infuser implementation.
 *
 * @author Ron Webb
 * @since 2019-04-08
 */
interface IInfuser {

  /**
   * Must have the implementation of how to retrieve the annotation infuser from the target bean object.
   *
   * @param propertyInfo An instance of IPropertyInfo.
   * @return An optional instance that holds an instance of Infuser.
   *
   * @author Ron Webb
   * @since 2019-04-08
   */
  function createInfuser(propertyInfo : IPropertyInfo) : Optional

  /**
   * Must have the logic to do the actual infusion of the sourceObject to beanObject.
   *
   *
   * @param infusers An immutable list of IInfuser implementation which one of those can process the infuserObject.
   * @param infuserObject The actual instance of Infuser annotation wrapped in Optional object.
   * @param propertyInfo The instance of the property currently being processed.
   * @param sourceObject The source object to infuse to the beanObject.
   * @param beanObject The bean object that must be created based from the sourceObject.
   *
   * @author Ron Webb
   * @since 2019-04-08
   */
  function infuse(infusers : List<IInfuser>, infuserObject : Optional, propertyInfo : IPropertyInfo, sourceObject : Object, beanObject : Object)

}