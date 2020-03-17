package xyz.ronella.gosu.ginfuser.dto

uses xyz.ronella.gosu.ginfuser.annotation.CalculatedFieldInfuser
uses xyz.ronella.gosu.ginfuser.annotation.SourceTypeInfuser
uses xyz.ronella.gosu.ginfuser.annotation.InfuseFieldInfuser
uses xyz.ronella.gosu.ginfuser.annotation.StringConstantInfuser
uses xyz.ronella.gosu.ginfuser.annotation.StringFieldInfuser
uses xyz.ronella.gosu.ginfuser.annotation.DateFieldInfuser

/**
 * Just a sample DTO class for reference.
 *
 * @author Ron Webb
 * @since 2019-04-08
 */
@SourceTypeInfuser("xyz.ronella.gosu.ginfuser.business.SampleClass")
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