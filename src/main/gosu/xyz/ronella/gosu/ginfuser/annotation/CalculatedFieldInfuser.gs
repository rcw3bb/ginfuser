package xyz.ronella.gosu.ginfuser.annotation

uses java.lang.annotation.Retention
uses java.lang.annotation.Target

/**
 * Marks the field that must be calculated from the sourceObject instance.
 *
 * @author Ron Webb
 * @since 2019-04-08
 */
@Target({METHOD})
@Retention(RUNTIME)
annotation CalculatedFieldInfuser {

  /**
   * The expected sourceType of the sourceObject.
   *
   * @return The FQCN of the sourceObject.
   *
   * @author Ron Webb
   * @since 2019-04-08
   */
  function sourceType() : String = ""

  /**
   * The name of the method that will do the calculation of the field from the sourceObject.
   *
   * The parameter of the method if supportClass is empty is (sourceObject: Object)
   * otherwise it will be (sourceObject: Object, beanObject : Object)
   *
   * @return The name of the method.
   *
   * @author Ron Webb
   * @since 2019-04-08
   */
  function calculateMethod() : String

  /**
   * The FQCN of the expected return type of the calculateMethod.
   *
   * @return The FQCN of the method return type.
   *
   * @author Ron Webb
   * @since 2019-04-08
   */
  function calculateMethodReturnType() : String

  /**
   * The FQCN the class that holds the calculateMethod.
   *
   * If this is empty the calculateMethod must be implemented in the beanObject.
   * See the parameter information on the calculateMethod description.
   *
   * @return The FQCN of the class that holds the calculateMethod.
   *
   * @author Ron Webb
   * @since 2019-04-08
   */
  function supportClass() : String = ""
}