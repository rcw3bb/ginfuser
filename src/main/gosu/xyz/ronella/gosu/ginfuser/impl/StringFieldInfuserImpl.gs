package xyz.ronella.gosu.ginfuser.impl

uses gw.lang.reflect.IPropertyInfo
uses xyz.ronella.gosu.ginfuser.IInfuser
uses xyz.ronella.gosu.ginfuser.annotation.StringFieldInfuser

/**
 * An implementation for processing StringFieldInfuser annotation.
 * Use this if the field can be mapped directly as string.
 *
 * @author Ron Webb
 * @since 2019-04-08
 */
class StringFieldInfuserImpl extends AbstractInfuser {

  override property get InfuserName() : String {
    return "xyz.ronella.gosu.ginfuser.annotation.StringFieldInfuser"
  }

  override function assignmentLogic(infusers : List<IInfuser>, infuserObject : Optional, propertyInfo : IPropertyInfo, sourceObject : Object, beanObject : Object) : Object {
    if (infuserObject typeis Optional<StringFieldInfuser>) {
      return eval(getFieldValueCommand(getSourceType(beanObject, infuserObject.get()?.sourceType()), infuserObject.get()?.sourceField(), infuserObject.get()?.defaultValue()))
    }
    return null
  }

}