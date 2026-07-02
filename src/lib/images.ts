/** Encode Arabic paths and spaces for reliable browser loading */
export function imageSrc(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path
  }

  const normalized = path.startsWith("/") ? path.slice(1) : path
  return `/${normalized.split("/").map(encodeURIComponent).join("/")}`
}
