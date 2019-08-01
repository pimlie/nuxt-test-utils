import klaw from 'klaw'

export function list (dir, predicate, options = {}) {
  const items = []

  return new Promise((resolve) => {
    klaw(dir, options)
      .on('data', (item) => {
        if (!predicate) {
          items.push(item)
          return
        }

        if (predicate(item)) {
          items.push(item)
        }
      })
      .on('end', () => resolve(items))
  })
}

export function filterNewOrChanged (item, previousItems = []) {
  const foundItem = previousItems.find(prevItem => item.path === prevItem.path)
  return foundItem === undefined || item.stats.mtimeMs !== foundItem.stats.mtimeMs
}
