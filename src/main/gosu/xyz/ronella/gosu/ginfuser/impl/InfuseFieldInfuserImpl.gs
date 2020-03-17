package xyz.ronella.gosu.ginfuser.impl

uses gw.lang.reflect.IPropertyInfo
uses xyz.ronella.gosu.ginfuser.IInfuser
uses xyz.ronella.gosu.ginfuser.annotation.InfuseFieldInfuser

/**
 * An implementation for processing InfuseFieldInfuser annotation.
 * Use this if the field requires to also be Infused.
 *
 * @author Ron Webb
 * @since 2019-04-08
 */
class InfuseFieldInfuserImpl extends AbstractInfuser {

  override property get InfuserName() : String {
    return "xyz.ronella.gosu.ginfuser.annotation.InfuseFieldInfuser"
  }

  override function assignmentLogic(infusers : List<IInfuser>, infuserObject : Optional<Object>, propertyInfo : IPropertyInfo, sourceObject : Object, beanObject : Object) : Object {
    if (infuserObject typeis Optional<InfuseFieldInfuser>) {
      var propertyTypeName = propertyInfo.FeatureType.Name
      var propertyValueCommand = getFieldValueCommand(getSourceType(beanObject, infuserObject.get()?.sourceType()), infuserObject.get()?.sourceField())
      var sourcePropertyInstance = eval("${propertyValueCommand} as ${infuserObject.get()?.sourceFieldType()}")
      if (sourcePropertyInstance!=null) {
        var command = "xyz.ronella.gosu.ginfuser.Infuser.getBuilder<${propertyTypeName}>().addInfusers(infusers).build().infuse(sourcePropertyInstance, new ${propertyTypeName}())"
        return eval(command)
      }
    }
    return null
  }
}