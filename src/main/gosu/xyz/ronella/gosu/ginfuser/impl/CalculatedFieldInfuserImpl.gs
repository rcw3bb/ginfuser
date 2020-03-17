package xyz.ronella.gosu.ginfuser.impl

uses gw.lang.reflect.IPropertyInfo
uses xyz.ronella.gosu.ginfuser.IInfuser
uses xyz.ronella.gosu.ginfuser.annotation.CalculatedFieldInfuser

/**
 * An implementation for processing CalculatedFieldInfuser annotation.
 * Use this if the field cannot be mapped directly and requires custom calculation.
 *
 * @author Ron Webb
 * @since 2019-04-08
 */
class CalculatedFieldInfuserImpl extends AbstractInfuser {

  override property get InfuserName() : String {
    return "xyz.ronella.gosu.ginfuser.annotation.CalculatedFieldInfuser"
  }

  override function assignmentLogic(infusers : List<IInfuser>, infuserObject : Optional<Object>, propertyInfo : IPropertyInfo, sourceObject : Object, beanObject : Object) : Object {
    if (infuserObject typeis Optional<CalculatedFieldInfuser>) {
      var supportClass = infuserObject.get().supportClass()
      var methodExecutor = (supportClass.size > 0 ? "new ${supportClass}()" : "beanObject")
      var methodParams = (supportClass.size > 0 ? "(sourceObject, beanObject)" : "(sourceObject)")
      var command = "(beanObject typeis ${(typeof beanObject).Name} ? ${methodExecutor}.${infuserObject.get().calculateMethod()}${methodParams} : null) as ${infuserObject.get().calculateMethodReturnType()}"
      return eval(command)
    }
    return null
  }
}