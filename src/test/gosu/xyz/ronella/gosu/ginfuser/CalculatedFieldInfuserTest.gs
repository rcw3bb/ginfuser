package xyz.ronella.gosu.ginfuser

uses gw.test.TestClass
uses xyz.ronella.gosu.ginfuser.business.SampleClass
uses xyz.ronella.gosu.ginfuser.dto.SampleDTO

class CalculatedFieldInfuserTest extends TestClass {

  public function testStringConstantValue() {
    var sampleClass = new SampleClass()
    sampleClass.Nomenclatures = {"One", "Two"}
    var sampleDTO = Infuser.getBuilder<SampleDTO>().async().build().infuse(sampleClass, new SampleDTO())
    assertListEquals(sampleClass.Nomenclatures, sampleDTO.Names)
  }


}