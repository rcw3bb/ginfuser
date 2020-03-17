package xyz.ronella.gosu.ginfuser

uses gw.test.TestClass
uses xyz.ronella.gosu.ginfuser.business.SampleClass
uses xyz.ronella.gosu.ginfuser.dto.SampleDTO
uses java.util.Date
uses gw.date.Month

class DateFieldInfuserTest extends TestClass {

  public function testDateFieldValue() {
    var sampleClass = new SampleClass()
    sampleClass.StartDate = Date.create(2020, Month.MARCH, 17, 0, 0, 0, 0)
    var sampleDTO = Infuser.getBuilder<SampleDTO>().async().build().infuse(sampleClass, new SampleDTO())
    assertEquals("2020-03-17", sampleDTO.Date)
  }

  public function testDateFieldDefault() {
    var sampleClass = new SampleClass()
    var sampleDTO = Infuser.getBuilder<SampleDTO>().async().build().infuse(sampleClass, new SampleDTO())
    assertEquals("2021-03-17", sampleDTO.Date2)
  }

  public function testDateFieldNull() {
    var sampleClass = new SampleClass()
    var sampleDTO = Infuser.getBuilder<SampleDTO>().async().build().infuse(sampleClass, new SampleDTO())
    assertNull(sampleDTO.Date)
  }

}