package xyz.ronella.gosu.ginfuser

uses gw.test.TestClass
uses xyz.ronella.gosu.ginfuser.business.SampleClass
uses xyz.ronella.gosu.ginfuser.business.SampleClass2
uses xyz.ronella.gosu.ginfuser.dto.SampleDTO

class InfuseFieldInfuserTest extends TestClass {

  public function testInfuseFieldValue() {
    var sampleClass = new SampleClass()
    var sampleClass2 = new SampleClass2()
    sampleClass.SubClass = sampleClass2
    sampleClass2.Field1 = "SubClassTest"
    var sampleDTO = Infuser.getBuilder<SampleDTO>().async().build().infuse(sampleClass, new SampleDTO())
    assertEquals("SubClassTest", sampleDTO.ChildClass.Column1)
  }

  public function testInfuseFieldNull() {
    var sampleClass = new SampleClass()
    var sampleDTO = Infuser.getBuilder<SampleDTO>().async().build().infuse(sampleClass, new SampleDTO())
    assertNull(sampleDTO.ChildClass)
  }

}