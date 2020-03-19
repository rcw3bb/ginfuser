# GInfuser

A gosu implementation to map a domain class into a DTO *(data transfer object)*. This utilizes annotations to describe how the fields in the DTO must be populated.

## Default Annotations

| Annotation                                                   | Target   | Description                                                  |
| ------------------------------------------------------------ | -------- | ------------------------------------------------------------ |
| @**CalculatedFieldInfuser**(sourceType: String, calculateMethod: String, calculateMethodReturnType: String, supportClass: String) | Property | Describes that the value of the property will be calculated from a method *(i.e. **calculateMethod**)* of the **supportClass**. The return type of the method must be specified by **calculateMethodReturnType** parameter. The **sourceType** is optional. |
| @**DateFieldInfuser**(sourceType: String, sourceField: String, defaultValue: String) | Property | Describes that the **string value** of the property will be copied from a date property *(i.e. **sourceField**)* of the domain class *(i.e. **sourceType**)*. The string value and the **defaultValue** is in the format **YYYY-MM-DD**. |
| @**InfuseFieldInfuser**(sourceType: String, sourceField: String, sourceFieldType: String) | Property | Describes that the value of the property will be an output of another infusion based on the property *(i.e. **sourceField**)* of a particular type *(i.e. **sourceFieldType**)* of the domain class *(i.e. **sourceType**)*. |
| @**SourceTypeInfuser**(sourceType: String)                   | Class    | Describes the type of the class that the DTO depends on. The **sourceType**s of the other annotations are all optional. |
| @**StringConstantInfuser**(value : String)                   | Property | Describes that the string property in the DTO will have a specific value identified by the **value** parameter. |
| @**StringFieldInfuser**(sourceType: String, sourceField: String, defaultValue: String) | Property | Describes that the **string value** of the property will be copied from a string property *(i.e. **sourceField**)* of the domain class *(i.e. **sourceType**)*. |

## Infuser Class

The Infuser class is the one that interprets the description and perform the necessary actions for each property in the DTO. This class can only be created by an **Infuser.Builder** class. This class has the following methods:

#### Infuser Methods

| Method                                                       | Description                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| static **getBuilder**&lt;TYPE_DTO_BUILD&gt;() : Builder&lt;TYPE_DTO_BUILD&gt; | Returns an instance of **Infuser.Builder** class.            |
| **infuse**(sourceObject: Object, beanObject: TYPE_BEAN) : TYPE_BEAN | The actual method that infuse the **sourceObject** to the **beanObject**. |

## Infuser.Builder Class

The **only class that can create an instance of Infuser** and it can be created by invoking **Infuser.getBuilder()** method.

#### Builder Methods

| Method                                                       | Description                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| **addInfuser**(infuserObject : IInfuser) : Builder&lt;TYPE_BEAN_BUILD&gt; | Add a single implementation of IInfuser.                     |
| **addInfusers**(infuserObjects : List&lt;IInfuser&gt;) : Builder&lt;TYPE_BEAN_BUILD&gt; | Add a multiple implementation of IInfusers.                  |
| **async**() : Builder&lt;TYPE_BEAN_BUILD&gt;                 | The infuser method of the Infuser instance might run each property processing in parallel. |
| **build**() : Infuser&lt;TYPE_BEAN_BUILD&gt;                 | The method the return an instance of Infuser.                |
| **sync**() : Builder&lt;TYPE_BEAN_BUILD&gt;                  | The infuser method of the Infuser instance is running the property processing in synchronous. |

## [Custom IInfuser Implementation](CUSTOM_IMPL.md)
## Usage

#### As a Code Dependency to Your Gosu Project

Add the following **maven** dependency to your **gosu** project:

| Property    | Value            |
| ----------- | ---------------- |
| Group ID    | xyz.ronella.gosu |
| Artifact ID | ginfuser          |
| Version     | 1.0.0            |

#### Sample Usage

###### SampleClass Class

```gosu
class SampleClass {

  private var _field1 : String as Field1
  private var _field2 : String as Field2
  private var _names : List<String> as Nomenclatures = {}
  private var _date : Date as StartDate
  private var _enddate : Date as EndDate
  private var _sampleClass2 : SampleClass2 as SubClass

}
```

###### SampleClass2 Class

```gosu
class SampleClass2 {

  private var _field1 : String as Field1
  private var _field2 : String as Field2
  private var _names : List<String> as Nomenclatures = {}
  private var _date : Date as StartDate

}
```

###### SampleDTO Class

```gosu
@SourceTypeInfuser("SampleClass")
final class SampleDTO {

  @StringFieldInfuser(:sourceField = "Field1", :defaultValue = "Default1")
  private var _col1 : String as Column1

  @StringFieldInfuser(:sourceField = "Field2")
  private var _col2 : String as Column2

  @CalculatedFieldInfuser(
      :calculateMethod = "generateNames", :calculateMethodReturnType = "java.util.List<String>",
      :supportClass = "xyz.ronella.gosu.ginfuser.dto.SampleSupport"
  )
  private var _names : List<String> as Names

  @DateFieldInfuser(:sourceField = "StartDate")
  private var _date : String as Date

  @DateFieldInfuser(:sourceField = "EndDate", :defaultValue = "2021-03-17")
  private var _date2 : String as Date2

  @StringConstantInfuser(:value =  "Constant")
  private var _tmp : String as Dummy

  @InfuseFieldInfuser(:sourceField = "SubClass",
    :sourceFieldType = "xyz.ronella.gosu.ginfuser.business.SampleClass2"
  )
  private var _childClass : SampleDTO2 as ChildClass

}
```

###### SampleDTO2 Class

```gosu
@SourceTypeInfuser("SampleClass2")
class SampleDTO2 {

  @StringFieldInfuser(:sourceField = "Field1",
      :defaultValue = "no-value"
  )
  private var _col1 : String as Column1

  @StringFieldInfuser(:sourceField = "Field2"
      , :defaultValue = "no-value"
  )
  private var _col2 : String as Column2

  @CalculatedFieldInfuser(
      :calculateMethod = "generateNames2",
      :calculateMethodReturnType = "java.util.List<String>",
      :supportClass = "SampleSupport"
  )
  private var _names : List<String> as Names

  @DateFieldInfuser(:sourceField = "StartDate"
      , :defaultValue = "no-date"
  )
  private var _date : String as Date

  @StringConstantInfuser(:value =  "Constant2")
  private var _tmp : String as Dummy

}
```

###### SampleSupport Class

```gosu
class SampleSupport {

  public function generateNames(sourceObject : Object, beanObject : Object) : List<String> {
    var tests : List<String> = {}
    if (sourceObject typeis SampleClass) {
      tests.addAll(sourceObject.Nomenclatures)
    }
    return tests
  }

  public function generateNames2(sourceObject : Object, beanObject : Object) : List<String> {
    var tests : List<String> = {}
    if (sourceObject typeis SampleClass2) {
      tests.addAll(sourceObject.Nomenclatures)
    }
    return tests
  }
}
```

###### Infusing the SampleClass to SampleDTO

```gosu
var sampleClass = new SampleClass()
var sampleClass2 = new SampleClass2()

sampleClass.SubClass = sampleClass2
sampleClass.Field1 = "Field1"
sampleClass.StartDate = Date.create(2020, Month.MARCH, 17, 0, 0, 0, 0)
sampleClass.Nomenclatures = {"One", "Two"}

sampleClass2.Field1 = "SubClassTest"

var sampleDTO = Infuser.getBuilder<SampleDTO>().async().build().infuse(sampleClass, new SampleDTO())

print("sampleDTO.Column1: ${sampleDTO.Column1}")
print("sampleDTO.Date: ${sampleDTO.Date}")
print("sampleDTO.Names: ${sampleDTO.Names}")
print("sampleDTO.ChildClass.Column1: ${sampleDTO.ChildClass.Column1}")
```

***The output will be as described in the SampleDTO class***

```gosu
sampleDTO.Column1: Field1
sampleDTO.Date: 2020-03-17
sampleDTO.Names: [One, Two]
sampleDTO.ChildClass.Column1: SubClassTest
```

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## [Build](BUILD.md)

## [Changelog](CHANGELOG.md)

## Author

* Ronaldo Webb
