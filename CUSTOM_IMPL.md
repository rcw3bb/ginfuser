# Custom IInfuser Implementation

*Why do we need a custom IInfuser?* Normally, the default annotations provided doesn't suffice with your requirement. Example, you have a special class that you wanted to have specific descriptor to handle the retrieval of the value of the property from it. 

## 1. Create a New Annotation

A new annotation that will describe how the property value should be extracted must be created. The simplest way to do this is to base the new annotation from **StringFieldInfuser** annotation that is defined as follows:

```gosu
@Target({METHOD})
@Retention(RUNTIME)
annotation StringFieldInfuser {
  /**
   * The expected sourceType of the sourceObject.
   *
   * @return The FQCN of the sourceObject.
   */
  function sourceType() : String = ""

  /**
   * The source field from the current sourceObject.
   *
   * @return The name of the source field.
   */
  function sourceField() : String

  /**
   * The default value if the sourceField from the sourceObject returns null if defined.
   *
   * @return The actual default value.
   */
  function defaultValue() : String = ""
}
```

*Note: Be mindful of the **javadoc** of each function of the preceding annotation definition.*

## 2. Create the Annotation Processor

A new annotation must have logic that knows how to process it. The easy way to implement the processor is to based it on **StringFieldInfuserImpl** class which is the processor of **StringFieldInfuser**. It is defined as follows:

```gosu
class StringFieldInfuserImpl extends AbstractInfuser {

  override property get InfuserName() : String {
    return "StringFieldInfuser"
  }

  override function assignmentLogic(infusers : List<IInfuser>, infuserObject : Optional, propertyInfo : IPropertyInfo, sourceObject : Object, beanObject : Object) : Object {
    if (infuserObject typeis Optional<StringFieldInfuser>) {
      return eval(getFieldValueCommand(getSourceType(beanObject, infuserObject.get()?.sourceType()), infuserObject.get()?.sourceField(), infuserObject.get()?.defaultValue()))
    }
    return null
  }

}
```

It is recommended to extend the **AbstractInfuser class** than to implement directly the **IInfuser interface**. Using the class, you only need to implement **two items**, The **InfuserName property** and the **assignmentLogic method**.

#### The InfuserName Property

Implement this property to return the fully qualified class name (FQCN) of the newly created annotation. This is how you associate the processor and the annotation.

#### The assignmentLogic Method

Implement this method retrieve the value of the field from the sourceObject. **This method must return the value of the property to be assigned to the corresponding DTO property.**

The parameters that are available for you to work with are:

| Parameter | Type           | Description |
| --------- | -------------- | ----------- |
| infusers  | List&lt;IInfuser&gt; | Gives you access to the registered infusers. |
| infuserObject | Optional | This gives you the instance of the annotations that were attached to the property that is currently being processed. |
| propertyInfo | IPropertyInfo | This gives you access to the property that is currently being processed. |
| sourceObject | Object | This is the domain object that holds the actual values of the properties to be retrieved from. |
| beanObject | Object | This is the DTO where the properties are currently being processed. |

## 3. Using the Newly Created IInfuser Implementation

To use the newly created **IInfuser** implementation. Use either of the following methods of the **Builder class** which ever is appropriate before calling its **build method**:

* **addInfuser method**

* **addInfusers method**

  See [README](README.md) for the description of each methods.

The Infuser instance that was built by the Builder is now aware of the new IInfuser implementation.