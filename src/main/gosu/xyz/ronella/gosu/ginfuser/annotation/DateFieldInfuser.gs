package xyz.ronella.gosu.ginfuser.annotation

uses java.lang.annotation.Retention
uses java.lang.annotation.Target

/**
 * Marks the field that must infuse a Date field from the sourceObject to beanObject.
 *
 * @author Ron Webb
 * @since 2019-04-08
 */
@Target({METHOD})
@Retention(RUNTIME)
annotation DateFieldInfuser {

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
   * The source field from the current sourceObject.
   *
   * @return The name of the source field.
   *
   * @author Ron Webb
   * @since 2019-04-08
   */
  function sourceField() : String

  /**
   * The default value if the sourceField from the sourceObject returns null if defined.
   *
   * @return The actual default value.
   *
   * @author Ron Webb
   * @since 2019-04-08
   */
  function defaultValue() : String = ""

}