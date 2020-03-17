package xyz.ronella.gosu.ginfuser

uses gw.test.TestClass
uses xyz.ronella.gosu.ginfuser.business.SampleClass
uses xyz.ronella.gosu.ginfuser.dto.SampleDTO

class StringFieldInfuserTest extends TestClass {

  public function testStringFieldValue() {
    var sampleClass = new SampleClass()
    sampleClass.Field1 = "Field1"
    var sampleDTO = Infuser.getBuilder<SampleDTO>().async().build().infuse(sampleClass, new SampleDTO())
    assertEquals("Field1", sampleDTO.Column1)
  }

  public function testStringFieldDefault() {
    var sampleClass = new SampleClass()
    var sampleDTO = Infuser.getBuilder<SampleDTO>().async().build().infuse(sampleClass, new SampleDTO())
    assertEquals("Default1", sampleDTO.Column1)
  }

  public function testStringFieldNull() {
    var sampleClass = new SampleClass()
    var sampleDTO = Infuser.getBuilder<SampleDTO>().async().build().infuse(sampleClass, new SampleDTO())
    assertNull(sampleDTO.Column2)
  }


}