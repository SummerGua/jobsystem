export function makeSqlResTime(time) {
  return time.replace('T', ' ').split('.')[0]
}