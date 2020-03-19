package xyz.ronella.gosu.ginfuser

uses xyz.ronella.gosu.ginfuser.impl.CalculatedFieldInfuserImpl
uses xyz.ronella.gosu.ginfuser.impl.InfuseFieldInfuserImpl
uses xyz.ronella.gosu.ginfuser.impl.StringConstantInfuserImpl
uses xyz.ronella.gosu.ginfuser.impl.StringFieldInfuserImpl
uses xyz.ronella.gosu.ginfuser.impl.DateFieldInfuserImpl

/**
 * A utility class that actually infuse the source object to its bean object.
 *
 * @param <TYPE_DTO_BUILD> The actual type of the bean object.
 *
 * @author Ron Webb
 * @since 2019-04-08
 */
class Infuser<TYPE_BEAN> {

  private var _infusers : List<IInfuser>

  private var _parallel : boolean

  /**
   * The class that must be used to create an instance of Infuser.
   *
   * @param <TYPE_BEAN_BUILD> The actual type of the bean object.
   *
   * @author Ron Webb
   * @since 2019-04-08
   */
  public final static class Builder<TYPE_BEAN_BUILD> {

    private var infuser : Infuser<TYPE_BEAN_BUILD>

    private construct () {
      infuser = new Infuser<TYPE_BEAN_BUILD>()
    }

    /**
     * Actually exposed the built infuser instance.
     *
     * @return An instance of an Infuser.
     *
     * @author Ron Webb
     * @since 2019-04-08
     */
    public function build() : Infuser<TYPE_BEAN_BUILD> {
      return infuser
    }

    /**
     * Add an implementation of IInfuser can process a specific Infuser annotation.
     *
     * @param infuserObject An implementation of IInfuser.
     *
     * @return An instance of a Builder
     *
     * @author Ron Webb
     * @since 2019-04-08
     */
    public function addInfuser(infuserObject : IInfuser) : Builder<TYPE_BEAN_BUILD> {
      infuser._infusers.add(infuserObject)
      return this
    }

    /**
     * Add several implementations of IInfuser that each can process a specific Infuser annotation.
     *
     * @param infuserObjects A List of implementation of IInfuser.
     *
     * @return An instance of a Builder
     *
     * @author Ron Webb
     * @since 2019-04-08
     */
    public function addInfusers(infuserObjects : List<IInfuser>) : Builder<TYPE_BEAN_BUILD> {
      infuser._infusers.addAll(infuserObjects)
      return this
    }

    /**
     * Makes the fields processing in parallel.
     *
     * @return An instance of a Builder
     *
     * @author Ron Webb
     * @since 2019-04-08
     */
    public function async() : Builder<TYPE_BEAN_BUILD> {
      infuser._parallel = true
      return this
    }

    /**
     * Process the fields processing one at a time.
     *
     * @return An instance of a Builder
     *
     * @author Ron Webb
     * @since 2019-04-08
     */
    public function sync() : Builder<TYPE_BEAN_BUILD> {
      infuser._parallel = false
      return this
    }

  }

  /**
   * Expose a Builder object.
   *
   * @param <TYPE_DTO_BUILD>
   *
   * @return An instance of a Builder
   *
   * @author Ron Webb
   * @since 2019-04-08
   */
  public reified static function getBuilder<TYPE_DTO_BUILD>() : Builder<TYPE_DTO_BUILD> {
    return new Builder<TYPE_DTO_BUILD>()
  }

  private construct() {
    _infusers = {
        new InfuseFieldInfuserImpl(),
        new StringConstantInfuserImpl(),
        new StringFieldInfuserImpl(),
        new CalculatedFieldInfuserImpl(),
        new DateFieldInfuserImpl()
    }
  }

  /**
   * Do the actual infusion of the sourceObject to its corresponding beanObject.
   *
   * @param sourceObject The instance of the object to be infused to bean object.
   * @param beanObject The instance of bean object to receive the infusion.
   *
   * @return An infused sourceObject and beanObject.
   *
   * @author Ron Webb
   * @since 2019-04-08
   */
  public function infuse(sourceObject : Object, beanObject : TYPE_BEAN) : TYPE_BEAN {
    var propsInfo = (typeof beanObject).TypeInfo.Properties
    propsInfo.forEach(\___propInfo -> {
      (_parallel ? _infusers.parallelStream() : _infusers.stream()).forEach(\_1_infuser -> {
        var optional = _1_infuser.createInfuser(___propInfo)
        optional.ifPresent(\_2_infuser -> {
          _1_infuser.infuse(Collections.unmodifiableList(_infusers), optional, ___propInfo, sourceObject, beanObject)
        })
      })
   })

    return beanObject
  }

}