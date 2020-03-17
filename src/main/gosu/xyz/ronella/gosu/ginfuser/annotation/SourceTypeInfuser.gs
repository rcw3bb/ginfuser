package xyz.ronella.gosu.ginfuser.annotation

uses java.lang.annotation.Retention
uses java.lang.annotation.Target

/**
 * Marks a bean class to have a single source type for all the implementation of field infuser if the their sourceType is empty.
 *
 * @author Ron Webb
 * @since 2019-04-08
 */
@Target({TYPE})
@Retention(RUNTIME)
annotation SourceTypeInfuser {

  /**
   * The expected sourceType of the sourceObject.
   *
   * @return The FQCN of the sourceObject.
   *
   * @author Ron Webb
   * @since 2019-04-08
   */
  function sourceType() : String
}