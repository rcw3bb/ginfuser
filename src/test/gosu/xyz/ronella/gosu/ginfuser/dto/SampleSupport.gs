package xyz.ronella.gosu.ginfuser.dto

uses xyz.ronella.gosu.ginfuser.business.SampleClass
uses xyz.ronella.gosu.ginfuser.business.SampleClass2

/**
 * Just a sample support class for reference for both SampleClass and SampleClass2.
 *
 * @author Ron Webb
 * @since 2019-04-08
 */
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