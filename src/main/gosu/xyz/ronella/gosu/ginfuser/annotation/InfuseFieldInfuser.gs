package xyz.ronella.gosu.ginfuser.annotation

uses java.lang.annotation.Retention
uses java.lang.annotation.Target

/**
 * Marks the field that must do infusion at the field member level.
 *
 * @author Ron Webb
 * @since 2019-04-08
 */
@Target({METHOD})
@Retention(RUNTIME)
annotation InfuseFieldInfuser {

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
   * The actual type of the source field.
   *
   * @return The FQCN of the type of the source field.
   *
   * @author Ron Webb
   * @since 2019-04-08
   */
  function sourceFieldType() : String
}