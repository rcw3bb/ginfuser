package xyz.ronella.gosu.ginfuser.dto

uses xyz.ronella.gosu.ginfuser.annotation.CalculatedFieldInfuser
uses xyz.ronella.gosu.ginfuser.annotation.SourceTypeInfuser
uses xyz.ronella.gosu.ginfuser.annotation.StringConstantInfuser
uses xyz.ronella.gosu.ginfuser.annotation.StringFieldInfuser
uses xyz.ronella.gosu.ginfuser.annotation.DateFieldInfuser

/**
 * Just a sample DTO class for reference.
 *
 * @author Ron Webb
 * @since 2019-04-08
 */
@SourceTypeInfuser("xyz.ronella.gosu.ginfuser.business.SampleClass2")
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
      :supportClass = "xyz.ronella.gosu.ginfuser.dto.SampleSupport"
  )
  private var _names : List<String> as Names

  @DateFieldInfuser(:sourceField = "StartDate"
      , :defaultValue = "no-date"
  )
  private var _date : String as Date

  @StringConstantInfuser(:value =  "Constant2")
  private var _tmp : String as Dummy

}