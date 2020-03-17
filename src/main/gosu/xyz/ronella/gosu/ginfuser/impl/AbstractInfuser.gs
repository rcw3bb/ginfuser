package xyz.ronella.gosu.ginfuser.impl

uses gw.lang.reflect.IPropertyInfo
uses xyz.ronella.gosu.ginfuser.IInfuser
uses xyz.ronella.gosu.ginfuser.annotation.SourceTypeInfuser

/**
 * A partial implementation of IInfuser.
 *
 * @author Ron Webb
 * @since 2019-04-08
 */
abstract class AbstractInfuser implements IInfuser {

  /**
   * The helper property to expose the annotation Infuser name as String.
   *
   * @return The name of the Infuser annotation.
   *
   * @author Ron Webb
   * @since 2019-04-08
   */
  abstract property get InfuserName() : String

  /**
   * Generate the command to get the value of a field from the sourceObject.
   *
   * @param sourceType The expected type that the sourceObject to extract values from.
   * @param fieldName The field from the sourceObject.
   * @param defaultValue The default value to be returned if the value is null from the sourceObject.
   *
   * @return The actual command to be evaluated.
   *
   * @author Ron Webb
   * @since 2019-04-08
   */
  protected function getFieldValueCommand(sourceType : String, fieldName : String, defaultValue : String = "") : Object {
    var _defaultValue = (defaultValue.size > 0 ? "\"${defaultValue}\"" : "null")
    return "(sourceObject typeis ${sourceType} ? sourceObject.${fieldName} : null) ?: ${_defaultValue}"
  }

  /**
   * The default implementation to create an instance of Infuser annotation wrapped in Optional.
   *
   * @param propertyInfo An instance of IPropertyInfo that is currently being processed.
   * @return An optional that holds the instance of Infuser annotation.
   *
   * @author Ron Webb
   * @since 2019-04-08
   */
  override function createInfuser(propertyInfo : IPropertyInfo) : Optional {
    return Optional.ofNullable(eval("propertyInfo.getAnnotation(${InfuserName})?.Instance"))
  }

  /**
   * Checks the validity of the sourceObject if it complies with the expected type.
   *
   * @param expectedType The expected type of the sourceObject.
   * @param sourceObject The sourceObject to be tested.
   *
   * @return Return true if the sourceObject is valid.
   *
   * @author Ron Webb
   * @since 2019-04-08
   */
  public function isSourceObjectValid(expectedType : String, sourceObject : Object) : boolean {
    var command = "sourceObject typeis ${expectedType}"
    return eval(command) as boolean
  }

  /**
   * Must hold the actual assignment logic.
   *
   * @param infusers An immutable list of IInfuser implementation which one of those can process the infuserObject.
   * @param infuserObject The actual instance of Infuser annotation wrapped in Optional object.
   * @param propertyInfo The instance of the property currently being processed.
   * @param sourceObject The source object to infuse to the beanObject.
   * @param beanObject The bean object that must be created based from the sourceObject.
   *
   * @return The value to the assigned to the curent beanObject property being processed.
   *
   * @author Ron Webb
   * @since 2019-04-08
   */
  abstract function assignmentLogic(infusers : List<IInfuser>, infuserObject : Optional, propertyInfo : IPropertyInfo, sourceObject : Object, beanObject : Object) : Object

  public function getSourceType(beanObject : Object, origSourceType : String) : String {
    var sourceType : String = origSourceType

    if (sourceType.size==0) {
      Optional.ofNullable((typeof beanObject).TypeInfo.getAnnotation(SourceTypeInfuser)).ifPresent(\___sourceTypeInfuserInfo -> {
        var sourceTypeInfuserInstance = ___sourceTypeInfuserInfo.Instance as SourceTypeInfuser
        sourceType = sourceTypeInfuserInstance.sourceType()
      })
    }
    return sourceType
  }

  /**
   * The default implementation for infusion.
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
  override function infuse(infusers : List<IInfuser>, infuserObject : Optional, propertyInfo : IPropertyInfo, sourceObject : Object, beanObject : Object) {
    var validation = "infuserObject typeis Optional<${InfuserName}> && isSourceObjectValid(getSourceType(beanObject, infuserObject.get().sourceType()), sourceObject)"
    if (null!=sourceObject && eval(validation) as boolean) {
      var valueToAssign = assignmentLogic(infusers, infuserObject, propertyInfo, sourceObject, beanObject)
      beanObject[propertyInfo?.getName()] = valueToAssign
    }
  }

}