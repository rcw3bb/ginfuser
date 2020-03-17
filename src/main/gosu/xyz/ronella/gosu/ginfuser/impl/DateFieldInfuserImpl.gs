package xyz.ronella.gosu.ginfuser.impl

uses gw.lang.reflect.IPropertyInfo
uses java.text.SimpleDateFormat
uses xyz.ronella.gosu.ginfuser.IInfuser
uses xyz.ronella.gosu.ginfuser.annotation.DateFieldInfuser

class DateFieldInfuserImpl extends AbstractInfuser {

  override property get InfuserName() : String {
    return "xyz.ronella.gosu.ginfuser.annotation.DateFieldInfuser"
  }

  override function assignmentLogic(infusers : List<IInfuser>, infuserObject : Optional, propertyInfo : IPropertyInfo, sourceObject : Object, beanObject : Object) : Object {
    if (infuserObject typeis Optional<DateFieldInfuser>) {
      final var DATE_FORMAT = "yyyy-MM-dd"
      var defaultValue = infuserObject.get()?.defaultValue()
      var sourceValue = eval(getFieldValueCommand(getSourceType(beanObject, infuserObject.get()?.sourceType()), infuserObject.get()?.sourceField(), infuserObject.get()?.defaultValue()))
      if (sourceValue typeis String && sourceValue==defaultValue) {
        return defaultValue
      }
      else if (sourceValue typeis Date){
        return new SimpleDateFormat(DATE_FORMAT).format(sourceValue)
      }
    }
    return null
  }

  override function infuse(infusers: List<IInfuser>, infuserObject : Optional, propertyInfo : IPropertyInfo, sourceObject : Object, beanObject : Object) {
    if (null!=sourceObject && infuserObject typeis Optional<DateFieldInfuser>) {
      beanObject[propertyInfo?.getName()] = assignmentLogic(infusers, infuserObject, propertyInfo, sourceObject, beanObject)
    }
  }
}