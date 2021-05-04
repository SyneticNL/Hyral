# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.0.0-prerelease.1](https://github.com/SyneticNL/Hyral/compare/v2.0.0-prerelease.0...v2.0.0-prerelease.1) (2021-05-04)

**Note:** Version bump only for package hyral





# [2.0.0-prerelease.0](https://github.com/SyneticNL/Hyral/compare/v1.6.0...v2.0.0-prerelease.0) (2021-05-04)


### Bug Fixes

* **vue:** fixed reactivity in store module ([cf7d76a](https://github.com/SyneticNL/Hyral/commit/cf7d76a47f9fc9a085db666e7e46d4198fb7e0b9))
* **vue:** removed initCollection from collection mixin ([473f337](https://github.com/SyneticNL/Hyral/commit/473f3372e32997801cdeeda66c37a019b33c5d1c))
* tsconfig.json's had wrong build includes ([417013d](https://github.com/SyneticNL/Hyral/commit/417013d259d1d50ec520ac0686481440bbe7cda9))


### Features

* **nux-dru:** added DrupalPlugin ([d49032f](https://github.com/SyneticNL/Hyral/commit/d49032fdb998b83acda7c22d7c36b67f48ab615f))
* **nux-dru:** added menu parser ([c94325a](https://github.com/SyneticNL/Hyral/commit/c94325ae375560c16382a21218758fc82ad23b07))
* **nux-dru:** removed menu dispatch from plugin ([e59f161](https://github.com/SyneticNL/Hyral/commit/e59f161b463bfb04514e24783ba30ca20bd8a634))
* complete rework of Hyral ([e8a6e48](https://github.com/SyneticNL/Hyral/commit/e8a6e485f1ec09bd4c8ed6b401cbaed9425ae304))





## [1.6.1](https://github.com/SyneticNL/Hyral/compare/v1.6.0...v1.6.1) (2021-04-21)


### Features

* **core:** security updates ([c60c250](https://github.com/SyneticNL/Hyral/commit/c60c250e2627dbd8f7c81580c9f4ea3ca8dcbf0c))





# [1.6.0](https://github.com/SyneticNL/Hyral/compare/v1.5.0...v1.6.0) (2021-01-15)


### Features

* **core:** security updates ([d9c61ec](https://github.com/SyneticNL/Hyral/commit/d9c61ec7222ee9318970f66beeb4de9e6290c217))





# [1.5.0](https://github.com/SyneticNL/Hyral/compare/v1.4.0...v1.5.0) (2019-10-10)


### Bug Fixes

* **json-api:** applied reset method in responseNormaliser ([b2a93d6](https://github.com/SyneticNL/Hyral/commit/b2a93d6))


### Features

* **core:** added reset for state stack and test coverage ([72d4a79](https://github.com/SyneticNL/Hyral/commit/72d4a79))





# [1.4.0](https://github.com/SyneticNL/Hyral/compare/v1.3.0...v1.4.0) (2019-09-25)


### Bug Fixes

* **vue:** collection mixin cannot be called from other computed property ([8ba1822](https://github.com/SyneticNL/Hyral/commit/8ba1822))

### Features

* **json-api:** add support for deep related resources ([2fc2e04](https://github.com/SyneticNL/Hyral/commit/2fc2e04))
* **vue:** add documentation on how to catch errors with mixins ([820fb43](https://github.com/SyneticNL/Hyral/commit/820fb43))



# [1.3.0](https://github.com/SyneticNL/Hyral/compare/v1.2.0...v1.3.0) (2019-09-17)


### Features

* **core:** allow responseType to be defined by the responseNormalizer ([6e72ab5](https://github.com/SyneticNL/Hyral/commit/6e72ab5))





# [1.2.0](https://github.com/SyneticNL/Hyral/compare/v1.1.1...v1.2.0) (2019-08-30)


### Bug Fixes

* **core:** fromState returns incorrect relationship types for resources ([4193e49](https://github.com/SyneticNL/Hyral/commit/4193e49))
* **vue:** vue created() does not check if mixin should run ([85d59ab](https://github.com/SyneticNL/Hyral/commit/85d59ab))
* **vue:** vue created() does not check if mixin should run ([1c46520](https://github.com/SyneticNL/Hyral/commit/1c46520))
* **vue:** vue mixin resets collection if created() is called 2+ times ([a57285f](https://github.com/SyneticNL/Hyral/commit/a57285f))


### Features

* **core:** add support for ParameterBag in Repository.findById [#82](https://github.com/SyneticNL/Hyral/issues/82) ([9b2e79e](https://github.com/SyneticNL/Hyral/commit/9b2e79e))
* **core:** delete support in persistCascade for 1-to-1 relations [#42](https://github.com/SyneticNL/Hyral/issues/42) ([03e0281](https://github.com/SyneticNL/Hyral/commit/03e0281))
* **core:** delete support in persistCascade for 1-to-1 relations [#42](https://github.com/SyneticNL/Hyral/issues/42) ([e9aca6f](https://github.com/SyneticNL/Hyral/commit/e9aca6f))
* **vue:** add support for ParameterBag in createStoreModule [#82](https://github.com/SyneticNL/Hyral/issues/82) ([e4f7750](https://github.com/SyneticNL/Hyral/commit/e4f7750))
* **vue:** add support for ParameterBag in resource mixin [#82](https://github.com/SyneticNL/Hyral/issues/82) ([fc0477b](https://github.com/SyneticNL/Hyral/commit/fc0477b))
* **vue:** add support for ParameterBag in resource mixin [#82](https://github.com/SyneticNL/Hyral/issues/82) ([5381dcc](https://github.com/SyneticNL/Hyral/commit/5381dcc))





## [1.1.1](https://github.com/SyneticNL/Hyral/compare/v1.1.0...v1.1.1) (2019-08-02)


### Bug Fixes

* **vue:** collection state only stores non-complex items [#92](https://github.com/SyneticNL/Hyral/issues/92) ([1532d83](https://github.com/SyneticNL/Hyral/commit/1532d83))
* **vue:** collection state only stores non-complex items [#92](https://github.com/SyneticNL/Hyral/issues/92) ([4bfbeda](https://github.com/SyneticNL/Hyral/commit/4bfbeda))
* **vue:** collection state only stores non-complex items [#92](https://github.com/SyneticNL/Hyral/issues/92) ([b61f110](https://github.com/SyneticNL/Hyral/commit/b61f110))
* **vue:** collection vue mixin reactivity on computed value fixed [#93](https://github.com/SyneticNL/Hyral/issues/93) ([7e001f5](https://github.com/SyneticNL/Hyral/commit/7e001f5))
* **vue:** collection vue mixin reactivity on computed value fixed [#93](https://github.com/SyneticNL/Hyral/issues/93) ([06f767f](https://github.com/SyneticNL/Hyral/commit/06f767f))


### Features

* configured lerna & git commit for conventional commit ([d9396fc](https://github.com/SyneticNL/Hyral/commit/d9396fc))
