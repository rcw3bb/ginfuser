package xyz.ronella.gosu.ginfuser

uses gw.test.TestClass
uses xyz.ronella.gosu.ginfuser.business.SampleClass
uses xyz.ronella.gosu.ginfuser.dto.SampleDTO

class StringConstantInfuserTest extends TestClass {

  public function testStringConstantValue() {
    var sampleClass = new SampleClass()
    var sampleDTO = Infuser.getBuilder<SampleDTO>().async().build().infuse(sampleClass, new SampleDTO())
    assertEquals("Constant", sampleDTO.Dummy)
  }

}