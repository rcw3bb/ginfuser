package xyz.ronella.gosu.ginfuser.annotation

uses java.lang.annotation.Retention
uses java.lang.annotation.Target

/**
 * Marks the field that must only have a constant value.
 *
 * @author Ron Webb
 * @since 2019-04-08
 */
@Target({METHOD})
@Retention(RUNTIME)
annotation StringConstantInfuser {

  /**
   * The constant string value.
   *
   * @return The string value.
   */
  function value() : String
}