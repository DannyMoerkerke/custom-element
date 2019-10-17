
# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2019-11-17
### Changed
- show and hide methods can now take an optional array of child 
elements to show or hide

### Fixed
- style method renamed to 'css' since it collides with style property
- css method can now take an array of child elements to style

### Added
- addTemplate method to add contents of internal template to element
- rollup config for multiple module formats

## [0.0.3] - 2019-09-12
### Added
Added several convenience methods:
- show
- hide
- select
- selectAll
- multiSelect
- style
- addTemplate

## [0.0.2] - 2019-08-19
### Fixed
Updated mocha to fix security vulnerability

## [0.0.1] - 2019-08-19
Initial release
