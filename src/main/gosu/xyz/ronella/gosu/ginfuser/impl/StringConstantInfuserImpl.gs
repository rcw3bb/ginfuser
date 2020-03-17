package xyz.ronella.gosu.ginfuser.impl

uses gw.lang.reflect.IPropertyInfo
uses xyz.ronella.gosu.ginfuser.IInfuser
uses xyz.ronella.gosu.ginfuser.annotation.StringConstantInfuser

/**
 * An implementation for processing StringConstantInfuser annotation.
 * Use this if the field only have a constant value.
 *
 * @author Ron Webb
 * @since 2019-04-08
 */
class StringConstantInfuserImpl extends AbstractInfuser {

  override property get InfuserName() : String {
    return "xyz.ronella.gosu.ginfuser.annotation.StringConstantInfuser"
  }

  override function assignmentLogic(infusers : List<IInfuser>, infuserObject : Optional<Object>, propertyInfo : IPropertyInfo, sourceObject : Object, beanObject : Object) : Object {
    return null
  }

  override function infuse(infusers: List<IInfuser>, infuserObject : Optional, propertyInfo : IPropertyInfo, sourceObject : Object, beanObject : Object) {
    if (null!=sourceObject && infuserObject typeis Optional<StringConstantInfuser>) {
      beanObject[propertyInfo?.getName()] = infuserObject.get().value()
    }
  }
}