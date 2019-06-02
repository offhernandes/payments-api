const validator = (path, item) => {
  const paths = path.split('.')
  path = paths.shift()

  if (item.hasOwnProperty(path)) {
    if (paths.length) {
      return validator(paths.join('.'), item[path])
    }

    return item[path]
  }
}

module.exports = validator
