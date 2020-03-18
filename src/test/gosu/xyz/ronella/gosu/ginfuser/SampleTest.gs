package xyz.ronella.gosu.ginfuser

uses gw.test.TestClass
uses xyz.ronella.gosu.ginfuser.business.SampleClass
uses xyz.ronella.gosu.ginfuser.business.SampleClass2
uses xyz.ronella.gosu.ginfuser.dto.SampleDTO
uses gw.date.Month

class SampleTest extends TestClass {

  public function testSample() {
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
  }

}